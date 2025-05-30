import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const Home = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100
      }
    }
  };
  
  const socialVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1,
        staggerChildren: 0.2
      }
    }
  };
  
  const iconVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100
      }
    },
    hover: {
      y: -5,
      scale: 1.1,
      transition: { type: 'spring', stiffness: 400 }
    }
  };

  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h4 style={{ marginBottom: '1rem' }}>Hello, I'm</h4>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
                Harsh Jaiswal
              </h1>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
                Python Developer & Machine Learning Specialist
              </h2>
            </motion.div>
            
            <motion.p 
              style={{ marginBottom: '2rem', maxWidth: '500px' }}
              variants={itemVariants}
            >
              Experienced Python programmer specializing in AI/ML solutions and data science. Skilled in developing machine learning models, automation tools, and computer vision applications with a strong background in problem-solving.
            </motion.p>
            
            <motion.div
              style={{ display: 'flex', gap: '1rem' }}
              variants={itemVariants}
            >
              <a href="#contact" className="btn btn-primary">
                Contact Me
              </a>
              <a href="#projects" className="btn btn-secondary">
                View Projects
              </a>
            </motion.div>
            
            <motion.div 
              className="social-links"
              variants={socialVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.a 
                href="https://github.com/harshraj1601" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                aria-label="GitHub"
              >
                <FiGithub size={24} />
              </motion.a>
              
              <motion.a 
                href="https://linkedin.com/in/harshraj1601" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={24} />
              </motion.a>
              
              <motion.a 
                href="https://twitter.com/harshrajjaiswal" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                aria-label="Twitter"
              >
                <FiTwitter size={24} />
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ 
              width: '350px', 
              height: '350px', 
              margin: '0 auto',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: 'rgba(30, 41, 59, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(75, 85, 99, 0.5)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" 
                alt="Developer" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home; 