import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import useScrollReveal from '../../hooks/useScrollReveal';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const { ref, controls } = useScrollReveal();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    setFormStatus('submitting');
    
    setTimeout(() => {
      // Simulate successful form submission
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after a delay
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }, 1500);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  const formInputVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: i => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4
      }
    }),
    focus: {
      scale: 1.02,
      transition: { type: 'spring', stiffness: 300 }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4,
        type: 'spring',
        stiffness: 200
      }
    },
    hover: {
      scale: 1.05,
      transition: { type: 'spring', stiffness: 400 }
    },
    tap: {
      scale: 0.95
    },
    submitting: {
      scale: [1, 1.05, 1],
      transition: {
        repeat: Infinity,
        duration: 1
      }
    },
    success: {
      backgroundColor: '#10B981',
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="contact" style={{ padding: '5rem 0' }}>
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h2 
            variants={itemVariants} 
            style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              textAlign: 'center', 
              marginBottom: '1rem' 
            }}
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants} 
            style={{
              textAlign: 'center',
              marginBottom: '3rem',
              maxWidth: '42rem',
              margin: '0 auto 3rem'
            }}
          >
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out. 
            I'm always open to new ideas and collaborations.
          </motion.p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2.5rem' 
          }}>
            <motion.div variants={itemVariants}>
              <div style={{
                background: 'rgba(30, 41, 59, 0.7)',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(75, 85, 99, 0.5)'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Contact Information</h3>
                
                <motion.div 
                  variants={itemVariants}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    <FiMail size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Email</h4>
                    <p href="mailto:harshrajjaiswal16012003@gmail.com" style={{ color: 'var(--color-text-secondary)' }}>harshrajjaiswal16012003@gmail.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    <FiPhone size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Phone</h4>
                    <p style={{ color: 'var(--color-text-secondary)' }}>+91 7754938393</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    <FiMapPin size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Location</h4>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Gurugram, India</p>
                  </div>
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'rgba(30, 41, 59, 0.5)'
                  }}
                >
                  <p style={{ fontSize: '0.875rem', fontStyle: 'italic' }}>
                    I'm currently available for freelance work and open to discussing new opportunities.
                  </p>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div style={{
                background: 'rgba(30, 41, 59, 0.7)',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(75, 85, 99, 0.5)'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Send Me a Message</h3>
                
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label 
                      htmlFor="name" 
                      style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem', 
                        fontSize: '0.875rem' 
                      }}
                    >
                      Name
                    </label>
                    <motion.input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      custom={0}
                      variants={formInputVariants}
                      whileFocus="focus"
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(75, 85, 99, 0.5)',
                        borderRadius: '0.5rem',
                        color: 'var(--color-text-primary)',
                        transition: 'all 0.15s ease',
                        fontFamily: 'var(--font-primary)'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label 
                      htmlFor="email" 
                      style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem', 
                        fontSize: '0.875rem' 
                      }}
                    >
                      Email
                    </label>
                    <motion.input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      custom={1}
                      variants={formInputVariants}
                      whileFocus="focus"
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(75, 85, 99, 0.5)',
                        borderRadius: '0.5rem',
                        color: 'var(--color-text-primary)',
                        transition: 'all 0.15s ease',
                        fontFamily: 'var(--font-primary)'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label 
                      htmlFor="subject" 
                      style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem', 
                        fontSize: '0.875rem' 
                      }}
                    >
                      Subject
                    </label>
                    <motion.input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      custom={2}
                      variants={formInputVariants}
                      whileFocus="focus"
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(75, 85, 99, 0.5)',
                        borderRadius: '0.5rem',
                        color: 'var(--color-text-primary)',
                        transition: 'all 0.15s ease',
                        fontFamily: 'var(--font-primary)'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '2rem' }}>
                    <label 
                      htmlFor="message" 
                      style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem', 
                        fontSize: '0.875rem' 
                      }}
                    >
                      Message
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      custom={3}
                      variants={formInputVariants}
                      whileFocus="focus"
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(75, 85, 99, 0.5)',
                        borderRadius: '0.5rem',
                        color: 'var(--color-text-primary)',
                        transition: 'all 0.15s ease',
                        fontFamily: 'var(--font-primary)',
                        resize: 'vertical',
                        minHeight: '150px'
                      }}
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    animate={formStatus || 'visible'}
                    disabled={formStatus === 'submitting'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '1rem',
                      backgroundColor: formStatus === 'success' ? '#10B981' : 'var(--color-primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: '500',
                      cursor: formStatus === 'submitting' ? 'wait' : 'pointer'
                    }}
                  >
                    {formStatus === 'submitting' ? (
                      'Sending...'
                    ) : formStatus === 'success' ? (
                      'Message Sent!'
                    ) : (
                      <>
                        <FiSend />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 