import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import ThemeContext from '../../context/ThemeContext';
import logoImage from '../../assets/logow.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const navigationLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/resume", label: "Resume" },
    { path: "/contact", label: "Contact" }
  ];

  return (
    <header style={{ 
      boxShadow: scrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
      padding: scrolled ? '0.75rem 0' : '1.5rem 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={logoImage} 
              alt="Harsh Jaiswal Logo" 
              style={{ 
                height: '40px', 
                width: 'auto',
                filter: theme === 'dark' ? 'brightness(1)' : 'brightness(0.8)'
              }} 
            />
          </motion.div>
        </Link>
        
        <nav style={{ display: mobileMenuOpen ? 'none' : 'block' }}>
          <ul style={{ display: 'flex', gap: '2rem' }}>
            {navigationLinks.map((link, i) => (
              <motion.li
                key={link.path}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Link 
                  to={link.path} 
                  style={{ 
                    position: 'relative',
                    padding: '0.5rem 0.25rem',
                    fontSize: '1.125rem',
                    color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text-primary)',
                    fontWeight: location.pathname === link.path ? '500' : '400'
                  }}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.span
                      layoutId="navIndicator"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        background: 'var(--gradient-primary)'
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          style={{ 
            display: 'none', 
            background: 'none', 
            border: 'none',
            color: 'var(--color-text-primary)',
            cursor: 'pointer',
            fontSize: '1.5rem',
            '@media (maxWidth: 768px)': {
              display: 'block'
            }
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        
        {/* Mobile menu */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: 'var(--color-background)',
          zIndex: 100,
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          display: 'none',
          '@media (maxWidth: 768px)': {
            display: 'block'
          }
        }}>
          <div style={{ padding: '2.5rem' }}>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {navigationLinks.map((link, i) => (
                <motion.li 
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ fontSize: '1.5rem', fontWeight: '500' }}
                >
                  <Link 
                    to={link.path}
                    style={{ 
                      color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text-primary)'
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 