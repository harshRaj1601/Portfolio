import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import harsh from '../../assets/harsh.jpg';
import './HeroImage.css';

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
              Machine Learning & AI Enthusiast | Python Developer
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
                href="https://github.com/harshRaj1601" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                aria-label="GitHub"
              >
                <FiGithub size={24} />
              </motion.a>
              
              <motion.a 
                href="https://linkedin.com/in/harshRaj1601" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={24} />
              </motion.a>
              
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
            style={{ textAlign: 'center' }}
          >            <div 
              className="hero-image-container"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.classList.add('hover-active');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove('hover-active');
                e.currentTarget.style.setProperty('--mouse-x', '50%');
                e.currentTarget.style.setProperty('--mouse-y', '50%');
              }}
              style={{ 
                width: '350px', 
                height: '350px', 
                margin: '0 auto',
                backgroundColor: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(99, 102, 241, 0.3)',
                boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(99, 102, 241, 0.1)'
              }}>
              <img 
                src={harsh} 
                alt="Harsh Jaiswal" 
                className="hero-image"
                style={{
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transform: 'scale(2.5)',
                  transformOrigin: '46% 7%',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home; 