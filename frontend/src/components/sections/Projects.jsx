import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiX, FiChevronLeft, FiChevronRight, FiFilter, FiSearch } from 'react-icons/fi';
import useScrollReveal from '../../hooks/useScrollReveal';
import projects from '../../data/projects';

// ProjectCard Component
const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      variants={{
        hidden: { y: 50, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100
          }
        }
      }}
      whileHover={{ 
        y: -10,
        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.15)',
        transition: { 
          type: 'spring', 
          stiffness: 300 
        }
      }}
      style={{ 
        height: '100%', 
        cursor: 'pointer',
        borderRadius: '1rem',
        overflow: 'hidden',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
        transformStyle: 'preserve-3d',
        transform: 'perspective(1000px)',
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(75, 85, 99, 0.5)'
      }}
      onClick={onClick}
    >
      <div style={{ 
        height: '200px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <motion.img 
          src={project.image} 
          alt={project.title}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          padding: '1.5rem 1rem 0.5rem',
          transition: 'all 0.3s ease'
        }}>
          <motion.h3 
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
            style={{ 
              fontSize: '1.25rem', 
              fontWeight: '700', 
              color: 'white',
              marginBottom: '0.25rem'
            }}
          >
            {project.title}
          </motion.h3>
        </div>
      </div>
      <div style={{ 
        padding: '1.5rem',
      }}>
        <p style={{ 
          fontSize: '0.875rem', 
          color: 'var(--color-text-secondary)', 
          marginBottom: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minHeight: '2.5rem'
        }}>{project.description}</p>
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginTop: '1rem',
          marginBottom: '1rem'
        }}>
          {project.tags.slice(0, 3).map((tag, i) => (
            <span 
              key={i}
              style={{ 
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                background: 'rgba(99, 102, 241, 0.1)',
                color: 'var(--color-primary)',
                border: '1px solid var(--color-primary)',
                transition: 'all 0.2s ease'
              }}
            >{tag}</span>
          ))}
          {project.tags.length > 3 && (
            <span style={{ 
              fontSize: '0.75rem',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              background: 'rgba(99, 102, 241, 0.1)',
              color: 'var(--color-primary)',
              border: '1px solid var(--color-primary)'
            }}>+{project.tags.length - 3}</span>
          )}
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          style={{ 
            marginTop: '1rem',
            fontSize: '0.875rem',
            color: 'white',
            textAlign: 'center',
            background: 'var(--gradient-primary)',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            fontWeight: '500',
            boxShadow: '0 3px 8px rgba(99, 102, 241, 0.2)'
          }}
        >
          View Details
        </motion.div>
      </div>
    </motion.div>
  );
};

// Image Gallery Component for Modal
const ImageGallery = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <div style={{ 
      borderRadius: '1rem',
      overflow: 'hidden',
      height: '100%',
      width: '100%',
      position: 'relative',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(99, 102, 241, 0.2)'
    }}>
      <AnimatePresence mode="wait">
        <motion.img 
          key={currentIndex}
          src={images[currentIndex]} 
          alt={`${title} - Image ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </AnimatePresence>
      
      {images.length > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1, background: 'rgba(0, 0, 0, 0.7)' }}
            whileTap={{ scale: 0.95 }}
            onClick={prevImage}
            style={{
              position: 'absolute',
              top: '50%',
              left: '1rem',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              zIndex: 5,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
            }}
            aria-label="Previous image"
          >
            <FiChevronLeft size={24} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1, background: 'rgba(0, 0, 0, 0.7)' }}
            whileTap={{ scale: 0.95 }}
            onClick={nextImage}
            style={{
              position: 'absolute',
              top: '50%',
              right: '1rem',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              zIndex: 5,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
            }}
            aria-label="Next image"
          >
            <FiChevronRight size={24} />
          </motion.button>
          
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.75rem',
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
            backdropFilter: 'blur(4px)'
          }}>
            {images.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentIndex(index)}
                style={{
                  width: '0.75rem',
                  height: '0.75rem',
                  borderRadius: '50%',
                  background: index === currentIndex ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.5)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.2s ease',
                  boxShadow: index === currentIndex ? '0 0 5px var(--color-primary)' : 'none'
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
          
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            backdropFilter: 'blur(4px)'
          }}>
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

// ProjectModal Component
const ProjectModal = ({ project, onClose }) => {
  const modalRef = useRef(null);
  
  // Get an array of project images (use the main image if no gallery provided)
  const projectImages = project.gallery ? [project.image, ...project.gallery] : [project.image];

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    // Add event listener for keyboard navigation
    document.addEventListener('keydown', handleKeyDown);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Focus on the modal for accessibility
    if (modalRef.current) {
      modalRef.current.focus();
    }
    
    return () => {
      // Clean up
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown]);
  
  if (!project) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: {
            duration: 0.3
          }
        }}
        exit={{ 
          opacity: 0,
          transition: {
            duration: 0.2
          }
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem'
        }}
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut'
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.8,
            transition: {
              duration: 0.2,
              ease: 'easeIn'
            }
          }}
          style={{
            width: '100%',
            maxWidth: '1000px',
            height: 'auto',
            maxHeight: '85vh',
            background: 'rgba(30, 41, 59, 0.97)',
            backdropFilter: 'blur(16px)',
            borderRadius: '1rem',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            padding: '2rem',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={e => e.stopPropagation()}
          tabIndex={0}
        >
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              zIndex: 10
            }}
            aria-label="Close modal"
          >
            <FiX />
          </motion.button>
          
          <div style={{ 
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: '800',
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem'
            }}>
              {project.title}
            </h2>
          </div>
          
          <div className="project-content" style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            overflowY: 'auto',
            maxHeight: 'calc(85vh - 8rem)',
            padding: '0.5rem'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div style={{
                height: 'clamp(220px, 25vh, 350px)'
              }}>
                <ImageGallery 
                  images={projectImages}
                  title={project.title}
                />
              </div>
              
              <div style={{ 
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <motion.a 
                  whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(99, 102, 241, 0.4)' }}
                  href={project.demoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.25rem',
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    borderRadius: '0.5rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    fontSize: '0.95rem'
                  }}
                >
                  <FiExternalLink />
                  <span>Live Demo</span>
                </motion.a>
                
                <motion.a 
                  whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(75, 85, 99, 0.2)' }}
                  href={project.codeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.25rem',
                    background: 'transparent',
                    color: 'var(--color-primary)',
                    borderRadius: '0.5rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    border: '1px solid var(--color-primary)',
                    transition: 'all 0.3s ease',
                    fontSize: '0.95rem'
                  }}
                >
                  <FiGithub />
                  <span>View Code</span>
                </motion.a>
              </div>
              
              <div>
                <h4 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  marginBottom: '0.75rem',
                  color: 'var(--color-primary)',
                  textAlign: 'center'
                }}>
                  Technologies Used
                </h4>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  justifyContent: 'center'
                }}>
                  {project.tags.map((tag, i) => (
                    <motion.span 
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      style={{ 
                        fontSize: '0.875rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.25rem',
                        background: 'rgba(99, 102, 241, 0.1)',
                        color: 'var(--color-primary)',
                        border: '1px solid var(--color-primary)'
                      }}
                    >{tag}</motion.span>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div style={{ 
                fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                lineHeight: '1.7',
                color: 'var(--color-text-primary)'
              }}>
                {project.longDescription || project.description}
              </div>
              
              {/* Optional Features List */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h4 style={{ 
                    fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)',
                    fontWeight: '600', 
                    marginBottom: '1rem',
                    color: 'var(--color-primary)'
                  }}>
                    Key Features
                  </h4>
                  <ul style={{ 
                    paddingLeft: '1.5rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '0.75rem'
                  }}>
                    {project.features.map((feature, i) => (
                      <li key={i} style={{ 
                        position: 'relative',
                        paddingLeft: '0.5rem',
                        fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                        lineHeight: '1.5',
                        listStyleType: 'none',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem'
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'var(--gradient-primary)',
                          marginTop: '0.5rem',
                          flexShrink: 0,
                          boxShadow: '0 0 5px rgba(99, 102, 241, 0.5)'
                        }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Optional Additional Links */}
              {project.additionalLinks && project.additionalLinks.length > 0 && (
                <div>
                  <h4 style={{ 
                    fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)',
                    fontWeight: '600', 
                    marginBottom: '1rem',
                    color: 'var(--color-primary)'
                  }}>
                    Additional Resources
                  </h4>
                  <ul style={{ 
                    paddingLeft: '1.5rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '0.75rem'
                  }}>
                    {project.additionalLinks.map((link, i) => (
                      <li key={i}>
                        <motion.a 
                          whileHover={{ 
                            color: 'var(--color-secondary)',
                            x: 3
                          }}
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ 
                            color: 'var(--color-primary)',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.95rem'
                          }}
                        >
                          {link.title}
                          <FiExternalLink size={14} />
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Filter Tag Component
const FilterTag = ({ tag, isActive, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(tag)}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '2rem',
        background: isActive ? 'var(--gradient-primary)' : 'rgba(75, 85, 99, 0.2)',
        color: isActive ? 'white' : 'var(--color-text-primary)',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
    >
      {tag}
    </motion.button>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTags, setActiveTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { ref, controls } = useScrollReveal();
  
  // Get unique tags from all projects
  const allTags = [...new Set(projects.flatMap(project => project.tags))].sort();
  
  // Filter projects based on activeTags and search query
  const filteredProjects = projects.filter(project => {
    // If no filters are active, show all projects
    if (activeTags.length === 0 && !searchQuery) {
      return true;
    }
    
    // Tag filters
    if (activeTags.length > 0) {
      const hasAllTags = activeTags.every(tag => 
        project.tags.includes(tag)
      );
      if (!hasAllTags) return false;
    }
    
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const inTitle = project.title.toLowerCase().includes(query);
      const inDescription = project.description.toLowerCase().includes(query);
      const inTags = project.tags.some(tag => tag.toLowerCase().includes(query));
      
      if (!inTitle && !inDescription && !inTags) {
        return false;
      }
    }
    
    return true;
  });
  
  // Toggle tag selection
  const toggleTag = (tag) => {
    setActiveTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setActiveTags([]);
    setSearchQuery('');
    setShowFilters(false);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter button click
  const handleFilterClick = () => {
    setShowFilters(prev => !prev);
  };

  // Handle all projects click
  const handleAllProjectsClick = () => {
    clearFilters();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
        damping: 12,
        stiffness: 100
      }
    }
  };

  const filterVariants = {
    active: {
      color: 'var(--color-primary)',
      borderBottom: '2px solid var(--color-primary)',
      y: 0
    },
    inactive: {
      color: 'var(--color-text-primary)',
      borderBottom: '2px solid transparent',
      y: 0
    },
    hover: {
      y: -2
    }
  };

  return (
    <section id="projects" style={{ padding: '5rem 0' }}>
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
            My <span className="gradient-text">Projects</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants} 
            style={{ 
              textAlign: 'center', 
              marginBottom: '2rem', 
              maxWidth: '42rem', 
              margin: '0 auto 2rem' 
            }}
          >
            Here are some of my recent projects. Each project reflects my passion for creating innovative, 
            functional, and efficient solutions in Python and machine learning.
          </motion.p>
          
          <motion.div 
            variants={itemVariants} 
            style={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem' 
            }}
          >
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              borderBottom: '1px solid rgba(75, 85, 99, 0.5)',
              paddingBottom: '0.5rem',
              marginRight: '1rem'
            }}>
              <motion.button
                onClick={handleAllProjectsClick}
                style={{ 
                  paddingBottom: '0.5rem', 
                  paddingLeft: '0.5rem', 
                  paddingRight: '0.5rem', 
                  fontWeight: '500',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-primary)'
                }}
                variants={filterVariants}
                animate="active"
                whileHover="hover"
              >
                All Projects
              </motion.button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFilterClick}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                background: showFilters ? 'var(--gradient-primary)' : 'rgba(75, 85, 99, 0.2)',
                color: showFilters ? 'white' : 'var(--color-text-primary)',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FiFilter size={16} />
              <span>Filter</span>
            </motion.button>
            
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '300px'
            }}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search projects..."
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem 0.5rem 2.5rem',
                  borderRadius: '2rem',
                  background: 'rgba(75, 85, 99, 0.2)',
                  color: 'var(--color-text-primary)',
                  border: 'none',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
              <FiSearch 
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-secondary)',
                  pointerEvents: 'none'
                }}
              />
            </div>
          </motion.div>
          
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  overflow: 'hidden',
                  marginBottom: '2rem'
                }}
              >
                <div style={{ 
                  background: 'rgba(30, 41, 59, 0.5)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  border: '1px solid rgba(75, 85, 99, 0.5)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <h3 style={{ fontWeight: '600' }}>Filter by Technologies</h3>
                    {activeTags.length > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={clearFilters}
                        style={{
                          fontSize: '0.875rem',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '0.25rem',
                          background: 'rgba(239, 68, 68, 0.1)',
                          color: 'rgb(239, 68, 68)',
                          border: '1px solid rgb(239, 68, 68)',
                          cursor: 'pointer'
                        }}
                      >
                        Clear Filters
                      </motion.button>
                    )}
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {allTags.map(tag => (
                      <FilterTag 
                        key={tag}
                        tag={tag}
                        isActive={activeTags.includes(tag)}
                        onClick={toggleTag}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {filteredProjects.length === 0 ? (
            <motion.div
              variants={itemVariants}
              style={{
                textAlign: 'center',
                padding: '3rem',
                background: 'rgba(30, 41, 59, 0.5)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(75, 85, 99, 0.5)',
                marginBottom: '2rem'
              }}
            >
              <h3 style={{ marginBottom: '1rem', fontWeight: '600' }}>No matching projects found</h3>
              <p>Try adjusting your filters or search query</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Clear Filters
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              variants={containerVariants}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                gap: '2rem',
                marginBottom: '2rem'
              }}
            >
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>
          )}
          
          {(activeTags.length > 0 || searchQuery) && filteredProjects.length > 0 && (
            <motion.div
              variants={itemVariants}
              style={{
                textAlign: 'center',
                marginBottom: '2rem'
              }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  background: 'rgba(75, 85, 99, 0.2)',
                  color: 'var(--color-text-primary)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects; 