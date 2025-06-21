from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_mail import Mail, Message
import os
from datetime import datetime
from dotenv import load_dotenv
import requests

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

def send_email(subject, body, is_html=False):
    """Helper function to send emails using Flask-Mail"""
    try:
        app.logger.info(f"Attempting to send email with subject: {subject}")
        app.logger.info(f"Mail server: {app.config['MAIL_SERVER']}")
        app.logger.info(f"Mail port: {app.config['MAIL_PORT']}")
        app.logger.info(f"Mail username: {app.config['MAIL_USERNAME']}")
        
        msg = Message(
            subject,
            sender=app.config['MAIL_USERNAME'],
            recipients=[RECIPIENT_EMAIL]
        )
        
        if is_html:
            msg.html = body
        else:
            msg.body = body
        
        mail.send(msg)
        app.logger.info("Email sent successfully")
        return True
        
    except Exception as e:
        app.logger.error(f"Error sending email: {str(e)}")
        app.logger.error(f"Mail config: SERVER={app.config['MAIL_SERVER']}, PORT={app.config['MAIL_PORT']}, USERNAME={app.config['MAIL_USERNAME']}")
        return False

def get_ip_details(ip):
    """Get detailed information about an IP address"""
    try:
        response = requests.get(f'http://ip-api.com/json/{ip}')
        if response.status_code == 200:
            data = response.json()
            if data['status'] == 'success':
                return {
                    'ip': ip,
                    'city': data.get('city', 'Unknown'),
                    'region': data.get('regionName', 'Unknown'),
                    'country': data.get('country', 'Unknown'),
                    'isp': data.get('isp', 'Unknown'),
                    'timezone': data.get('timezone', 'Unknown'),
                    'lat': data.get('lat', 0),
                    'lon': data.get('lon', 0),
                    'map_url': f"https://maps.googleapis.com/maps/api/staticmap?center={data.get('lat', 0)},{data.get('lon', 0)}&zoom=12&size=400x200&markers=color:red%7C{data.get('lat', 0)},{data.get('lon', 0)}&key={os.getenv('GOOGLE_MAPS_API_KEY', '')}"
                }
    except Exception as e:
        app.logger.error(f"Error getting IP details: {str(e)}")
    return None

def format_visitor_info(request):
    """Helper function to format visitor information"""
    try:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        ip = request.headers.get('X-Forwarded-For', '').split(',')[0] or request.remote_addr or 'Unknown'
        user_agent = request.headers.get('User-Agent', 'Unknown')
        referrer = request.headers.get('Referer', 'Direct visit')
        
        ip_details = get_ip_details(ip)
        if ip_details:
            return {
                'timestamp': timestamp,
                'ip_info': ip_details,
                'user_agent': user_agent,
                'referrer': referrer
            }
        
        return {
            'timestamp': timestamp,
            'ip': ip,
            'user_agent': user_agent,
            'referrer': referrer
        }
    except Exception as e:
        app.logger.error(f"Error formatting visitor info: {str(e)}")
        return {
            'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            'error': 'Could not collect complete visitor information'
        }

def get_visit_email_template(visitor_info):
    """Generate HTML template for visit notification emails"""
    has_ip_details = 'ip_info' in visitor_info
    ip_info = visitor_info.get('ip_info', {})
    
    ip_details_html = ""
    if has_ip_details:
        ip_details_html = f"""
            <div class="info-section">
                <h3>Location Details</h3>
                <table class="details-table">
                    <tr>
                        <td><strong>City:</strong></td>
                        <td>{ip_info['city']}</td>
                    </tr>
                    <tr>
                        <td><strong>Region:</strong></td>
                        <td>{ip_info['region']}</td>
                    </tr>
                    <tr>
                        <td><strong>Country:</strong></td>
                        <td>{ip_info['country']}</td>
                    </tr>
                    <tr>
                        <td><strong>ISP:</strong></td>
                        <td>{ip_info['isp']}</td>
                    </tr>
                    <tr>
                        <td><strong>Timezone:</strong></td>
                        <td>{ip_info['timezone']}</td>
                    </tr>
                    <tr>
                        <td><strong>IP Address:</strong></td>
                        <td>{ip_info['ip']}</td>
                    </tr>
                </table>
            </div>
            <div class="map-section">
                <h3>Visitor Location</h3>
                <img src="{ip_info['map_url']}" alt="Visitor location map" style="width: 100%; max-width: 400px; height: auto; border-radius: 5px;">
            </div>
        """

    return f'''
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }}
            .content {{ background-color: #f8f9fa; padding: 20px; border-radius: 0 0 5px 5px; }}
            .footer {{ text-align: center; margin-top: 20px; font-size: 12px; color: #666; }}
            .info-block {{ background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #2563eb; }}
            .info-section {{ margin: 20px 0; }}
            .details-table {{ width: 100%; border-collapse: collapse; margin: 10px 0; }}
            .details-table td {{ padding: 8px; border-bottom: 1px solid #eee; }}
            .details-table td:first-child {{ width: 120px; color: #666; }}
            .map-section {{ margin: 20px 0; text-align: center; }}
            h3 {{ color: #2563eb; margin-bottom: 10px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>🌟 New Portfolio Visit!</h2>
            </div>
            <div class="content">
                <p>Someone just visited your portfolio website!</p>
                <div class="info-section">
                    <h3>Visit Details</h3>
                    <table class="details-table">
                        <tr>
                            <td><strong>Time:</strong></td>
                            <td>{visitor_info['timestamp']}</td>
                        </tr>
                        <tr>
                            <td><strong>Referrer:</strong></td>
                            <td>{visitor_info['referrer']}</td>
                        </tr>
                        <tr>
                            <td><strong>Browser:</strong></td>
                            <td>{visitor_info['user_agent']}</td>
                        </tr>
                    </table>
                </div>
                {ip_details_html}
            </div>
            <div class="footer">
                <p>This is an automated notification from your Portfolio Website</p>
            </div>
        </div>
    </body>
    </html>
    '''

def get_resume_download_template(visitor_info):
    """Generate HTML template for resume download notification emails"""
    return f'''
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }}
            .content {{ background-color: #f8f9fa; padding: 20px; border-radius: 0 0 5px 5px; }}
            .footer {{ text-align: center; margin-top: 20px; font-size: 12px; color: #666; }}
            .info-block {{ background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #2563eb; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>📄 Resume Download Alert!</h2>
            </div>
            <div class="content">
                <p>Someone just downloaded your resume!</p>
                <div class="info-block">
                    {visitor_info.replace(chr(10), '<br>')}
                </div>
            </div>
            <div class="footer">
                <p>This is an automated notification from your Portfolio Website</p>
            </div>
        </div>
    </body>
    </html>
    '''

def get_contact_message_template(name, email, subject, message, visitor_info):
    """Generate HTML template for contact form messages"""
    return f'''
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }}
            .content {{ background-color: #f8f9fa; padding: 20px; border-radius: 0 0 5px 5px; }}
            .footer {{ text-align: center; margin-top: 20px; font-size: 12px; color: #666; }}
            .info-block {{ background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #2563eb; }}
            .message-block {{ background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px; white-space: pre-wrap; }}
            .sender-info {{ margin-bottom: 20px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>📨 New Contact Message</h2>
            </div>
            <div class="content">
                <div class="sender-info">
                    <strong>From:</strong> {name} ({email})<br>
                    <strong>Subject:</strong> {subject}
                </div>
                <strong>Message:</strong>
                <div class="message-block">
                    {message}
                </div>
                <strong>Visitor Details:</strong>
                <div class="info-block">
                    {visitor_info.replace(chr(10), '<br>')}
                </div>
            </div>
            <div class="footer">
                <p>This is an automated notification from your Portfolio Website</p>
            </div>
        </div>
    </body>
    </html>
    '''

@app.route('/api/track-visit', methods=['POST'])
def track_visit():
    """Endpoint to track portfolio visits"""
    try:
        visitor_info = format_visitor_info(request)
        email_html = get_visit_email_template(visitor_info)
        email_sent = send_email(
            "Portfolio Visit Alert",
            email_html,
            is_html=True
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
        email_html = get_resume_download_template(visitor_info)
        email_sent = send_email(
            "Resume Download Alert",
            email_html,
            is_html=True
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
        email_html = get_contact_message_template(name, email, subject, message, visitor_info)
        email_sent = send_email(
            f"Portfolio Contact: {subject}",
            email_html,
            is_html=True
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
