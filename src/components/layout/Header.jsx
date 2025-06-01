import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import ThemeContext from '../../context/ThemeContext';
import logoImage from '../../assets/logow.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
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

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
      padding: scrolled ? '0.75rem 0' : '1.5rem 0',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'var(--color-background)',
      zIndex: 1000,
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '0 1rem'
      }}>
        <Link to="/" style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1001
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
        
        <nav style={{ 
          display: isMobile ? 'none' : 'block'
        }}>
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
        
        <button 
          style={{ 
            display: isMobile ? 'block' : 'none',
            background: 'none', 
            border: 'none',
            color: 'var(--color-text-primary)',
            cursor: 'pointer',
            fontSize: '1.5rem',
            zIndex: 1001,
            padding: '0.5rem'
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              backgroundColor: 'var(--color-background)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{ padding: '2.5rem' }}>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'center' }}>
                {navigationLinks.map((link, i) => (
                  <motion.li 
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{ fontSize: '1.5rem', fontWeight: '500' }}
                  >
                    <Link 
                      to={link.path}
                      style={{ 
                        color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text-primary)',
                        padding: '0.5rem 1rem',
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;