from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_mail import Mail, Message
import os
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Mail configuration
app.config['MAIL_SERVER'] = os.getenv('SMTP_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('SMTP_PORT'))
app.config['MAIL_USERNAME'] = os.getenv('SENDER_EMAIL')
app.config['MAIL_PASSWORD'] = os.getenv('APP_PASSWORD')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)
CORS(app, 
     resources={r"/api/*": {
         "origins": "*",  # Allow all origins in development
         "methods": ["GET", "POST", "OPTIONS"],
         "allow_headers": ["Content-Type"],
         "supports_credentials": True
     }},
     expose_headers=["Content-Type", "X-CSRFToken"],
     supports_credentials=True)

# Enable debug mode
app.debug = False

# Using app.config for email settings, define recipient
RECIPIENT_EMAIL = "harshrajjaiswal16012003@gmail.com"


@app.route('/')
def index():
    """Simple index route to verify server is running"""
    return render_template('index.html', title='Portfolio API')

def send_email(subject, body):
    """Helper function to send emails using Flask-Mail"""
    try:
        app.logger.info(f"Attempting to send email with subject: {subject}")
        app.logger.info(f"Mail server: {app.config['MAIL_SERVER']}")
        app.logger.info(f"Mail port: {app.config['MAIL_PORT']}")
        app.logger.info(f"Mail username: {app.config['MAIL_USERNAME']}")
        
        msg = Message(
            subject,
            sender=app.config['MAIL_USERNAME'],
            recipients=[RECIPIENT_EMAIL],
            body=body
        )
        
        mail.send(msg)
        app.logger.info("Email sent successfully")
        return True
        
    except Exception as e:
        app.logger.error(f"Error sending email: {str(e)}")
        app.logger.error(f"Mail config: SERVER={app.config['MAIL_SERVER']}, PORT={app.config['MAIL_PORT']}, USERNAME={app.config['MAIL_USERNAME']}")
        return False

def format_visitor_info(request):
    """Helper function to format visitor information"""
    try:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        ip = request.remote_addr or 'Unknown'
        user_agent = request.headers.get('User-Agent', 'Unknown')
        referrer = request.headers.get('Referer', 'Direct visit')
        x_forwarded_for = request.headers.get('X-Forwarded-For')
        
        # Try to get the real IP if behind a proxy
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        
        return f"""
Timestamp: {timestamp}
IP Address: {ip}
User Agent: {user_agent}
Referrer: {referrer}
"""
    except Exception as e:
        app.logger.error(f"Error formatting visitor info: {str(e)}")
        return f"""
Timestamp: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
Error: Could not collect complete visitor information
"""

@app.route('/api/track-visit', methods=['POST'])
def track_visit():
    """Endpoint to track portfolio visits"""
    try:
        visitor_info = format_visitor_info(request)
        email_sent = send_email(
            "Portfolio Visit Alert",
            f"Someone visited your portfolio!\n\nVisitor Details:\n{visitor_info}"
        )
        
        return jsonify({
            'success': email_sent,
            'message': 'Visit tracked successfully' if email_sent else 'Failed to send notification'
        })
    except Exception as e:
        app.logger.error(f"Error tracking visit: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Failed to track visit'
        }), 500

@app.route('/api/track-resume-download', methods=['POST', 'OPTIONS'])
def track_resume_download():
    """Endpoint to track resume downloads"""
    try:
        visitor_info = format_visitor_info(request)
        email_sent = send_email(
            "Resume Download Alert",
            f"Someone downloaded your resume!\n\nVisitor Details:\n{visitor_info}"
        )
        
        return jsonify({
            'success': email_sent,
            'message': 'Resume download tracked successfully'
        })
    except Exception as e:
        app.logger.error(f"Error tracking resume download: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Failed to track resume download'
        }), 500

@app.route('/api/send-message', methods=['POST', 'OPTIONS'])
def send_message():
    """Endpoint to handle contact form submissions"""
    try:
        if not request.is_json:
            return jsonify({
                'success': False,
                'message': 'Request must be JSON'
            }), 400

        data = request.json
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'message': f'Missing required field: {field}'
                }), 400

        name = data['name']
        email = data['email']
        subject = data['subject']
        message = data['message']
        
        visitor_info = format_visitor_info(request)
        email_body = f"""New message from your portfolio contact form!

From: {name} ({email})
Subject: {subject}

Message:
{message}

Visitor Details:
{visitor_info}"""

        email_sent = send_email(
            f"Portfolio Contact: {subject}",
            email_body
        )
        
        if email_sent:
            return jsonify({
                'success': True,
                'message': 'Message sent successfully'
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to send message'
            }), 500
            
    except Exception as e:
        app.logger.error(f"Error sending message: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Failed to send message'
        }), 500

@app.before_request
def debug_cors():
    app.logger.info(f"Request Headers: {dict(request.headers)}")
    app.logger.info(f"Request Method: {request.method}")
    app.logger.info(f"Request Origin: {request.headers.get('Origin')}")

if __name__ == '__main__':
    app.run(port=5000, host='0.0.0.0')
