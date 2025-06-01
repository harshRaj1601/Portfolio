import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';
import logoImage from '../../assets/logow.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useContext(ThemeContext);
  
  // Animation variants
  const socialLinkVariants = {
    hover: { 
      y: -5,
      scale: 1.1,
      transition: { type: 'spring', stiffness: 300 }
    }
  };

  return (
    <footer style={{ 
      padding: '2.5rem 0', 
      marginTop: '5rem',
      backgroundColor: 'rgba(30, 41, 59, 0.7)',
      backdropFilter: 'blur(10px)',
      borderRadius: '0.75rem'
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem'
        }}>
          <div>
            <div style={{ 
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <img 
                src={logoImage} 
                alt="Harsh Jaiswal Logo" 
                style={{ 
                  height: '40px', 
                  width: 'auto',
                  filter: theme === 'dark' ? 'brightness(1)' : 'brightness(0.8)'
                }} 
              />
            </div>
            <p style={{ fontSize: '0.875rem' }}>
              A modern developer portfolio showcasing my skills, projects, and experience.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#" style={{ fontSize: '0.875rem' }}>Home</a></li>
              <li><a href="#about" style={{ fontSize: '0.875rem' }}>About</a></li>
              <li><a href="#projects" style={{ fontSize: '0.875rem' }}>Projects</a></li>
              <li><a href="#resume" style={{ fontSize: '0.875rem' }}>Resume</a></li>
              <li><a href="#contact" style={{ fontSize: '0.875rem' }}>Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Connect</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <motion.a 
                href="https://github.com/harshRaj1601" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={socialLinkVariants}
                whileHover="hover"
                aria-label="GitHub"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <FiGithub size={20} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/harshRaj1601" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={socialLinkVariants}
                whileHover="hover"
                aria-label="LinkedIn"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <FiLinkedin size={20} />
              </motion.a>
              <motion.a 
                href="mailto:harshrajjaiswal16012003@gmail.com"
                variants={socialLinkVariants}
                whileHover="hover"
                aria-label="Email"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <FiMail size={20} />
              </motion.a>
            </div>
          </div>
        </div>
        
        <div style={{ 
          marginTop: '2.5rem', 
          paddingTop: '1.25rem', 
          borderTop: '1px solid rgba(75, 85, 99, 0.5)', 
          textAlign: 'center', 
          fontSize: '0.875rem' 
        }}>
          <p>© {currentYear} Harsh Jaiswal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 