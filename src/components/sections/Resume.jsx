import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight, FiBriefcase, FiBook, FiCode } from 'react-icons/fi';
import useScrollReveal from '../../hooks/useScrollReveal';

const Resume = () => {
  const [activeTab, setActiveTab] = useState('experience');
  const { ref, controls } = useScrollReveal();
  
  // Technical skills data
  const technicalSkills = [
    {
      category: "Programming & Frameworks",
      skills: ["Python", "Java", "Flask", "HTML", "CSS", "JavaScript", "Git"]
    },
    {
      category: "AI & Machine Learning",
      skills: ["Scikit-learn", "TensorFlow", "PyTorch", "Deep Learning", "Neural Networks", "Computer Vision", "NLP"]
    },
    {
      category: "Data Science",
      skills: ["Pandas", "NumPy", "Data Visualization", "Plotly", "Statistical Analysis", "Predictive Modeling"]
    },
    {
      category: "Soft Skills",
      skills: ["Problem Solving", "Analytical Thinking", "Continuous Learning", "Teamwork", "Communication", "Git"]
    }
  ];
  
  // Harsh Jaiswal's experience data
  const experiences = [
    {
      id: 1,
      role: "Machine Learning Intern",
      company: "Digipodium",
      duration: "January 2025 - May 2025",
      description: [
        "Automated repetitive tasks and processes using Python scripts, improving operational efficiency.",
        "Developed machine learning models and algorithms for predictive analytics.",
        "Built deep learning architectures from scratch and trained models on labeled datasets for image recognition tasks.",
        "Integrated trained models into web applications using Flask framework.",
        "Assisted Students of B.Tech, BCA and MCA for their Final Year Major Project."
      ],
      skills: ["Python", "Machine Learning", "Deep Learning", "Flask", "Automation", "Computer Vision"]
    }
  ];
  
  // Harsh Jaiswal's education data
  const education = [
    {
      id: 1,
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "University of Lucknow",
      duration: "2021 - 2024",
      description: "Completed Bachelor of Computer Applications with a focus on programming, data structures, and software development. Gained strong foundation in computer science fundamentals and practical application development.",
      courses: ["Data Structures & Algorithms", "Programming Languages", "Database Management", "Software Engineering"]
    },
    {
      id: 2,
      degree: "Data Science - Machine Learning",
      institution: "Digipodium, Lucknow",
      duration: "2024",
      description: "Specialized training in data science and machine learning techniques, focusing on practical implementation and real-world applications.",
      courses: ["Machine Learning Algorithms", "Data Analysis", "Predictive Modeling", "Python for Data Science"]
    },
    {
      id: 3,
      degree: "Artificial Intelligence",
      institution: "Samsung Innovation Campus",
      duration: "2023",
      description: "Comprehensive training program in artificial intelligence fundamentals and applications, provided by Samsung's educational initiative.",
      courses: ["AI Fundamentals", "Neural Networks", "Computer Vision", "AI Applications"]
    }
  ];
  
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const timelineItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: i => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  const TabIndicator = ({ layoutId }) => (
    <motion.div 
      layoutId={layoutId}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '0.5rem',
        background: 'var(--gradient-primary)',
        zIndex: -1
      }}
    />
  );

  return (
    <section id="resume" style={{ padding: '5rem 0' }}>
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
            My <span className="gradient-text">Resume</span>
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
            My professional journey, experience, and education. Download my full resume for more details
            about my skills and qualifications.
          </motion.p>
          
          <motion.div 
            variants={itemVariants} 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginBottom: '3rem' 
            }}
          >
            <a 
              href="/src/assets/harshrajjaiswal16012003.pdf" 
              download
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--gradient-primary)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: '500',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }}
            >
              <FiDownload />
              <span>Download Resume</span>
            </a>
          </motion.div>
          
          <motion.div variants={itemVariants} style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <div style={{ 
                display: 'inline-flex', 
                padding: '0.25rem', 
                borderRadius: '0.5rem', 
                backgroundColor: 'rgba(30, 41, 59, 0.5)', 
                position: 'relative' 
              }}>
                <motion.button
                  onClick={() => setActiveTab('experience')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: '500',
                    transition: 'all 0.15s ease',
                    border: 'none',
                    background: 'transparent',
                    position: 'relative',
                    zIndex: 1,
                    color: activeTab === 'experience' ? 'white' : 'var(--color-text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiBriefcase />
                    <span>Experience</span>
                  </span>
                  {activeTab === 'experience' && (
                    <TabIndicator layoutId="tabIndicator" />
                  )}
                </motion.button>
                
                <motion.button
                  onClick={() => setActiveTab('education')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: '500',
                    transition: 'all 0.15s ease',
                    border: 'none',
                    background: 'transparent',
                    position: 'relative',
                    zIndex: 1,
                    color: activeTab === 'education' ? 'white' : 'var(--color-text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiBook />
                    <span>Education & Certification</span>
                  </span>
                  {activeTab === 'education' && (
                    <TabIndicator layoutId="tabIndicator" />
                  )}
                </motion.button>
                
                <motion.button
                  onClick={() => setActiveTab('skills')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: '500',
                    transition: 'all 0.15s ease',
                    border: 'none',
                    background: 'transparent',
                    position: 'relative',
                    zIndex: 1,
                    color: activeTab === 'skills' ? 'white' : 'var(--color-text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiCode />
                    <span>Skills</span>
                  </span>
                  {activeTab === 'skills' && (
                    <TabIndicator layoutId="tabIndicator" />
                  )}
                </motion.button>
              </div>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(30, 41, 59, 0.7)',
              backdropFilter: 'blur(12px)',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              border: '1px solid rgba(75, 85, 99, 0.5)'
            }}>
              {activeTab === 'experience' && (
                <motion.div
                  variants={timelineVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ maxWidth: '48rem', margin: '0 auto' }}
                >
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      custom={index}
                      variants={timelineItemVariants}
                      style={{
                        position: 'relative',
                        paddingLeft: '2rem',
                        paddingBottom: '2rem',
                        '::before': {
                          content: "''",
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: '2px',
                          background: 'rgba(75, 85, 99, 0.5)'
                        },
                        '::after': {
                          content: "''",
                          position: 'absolute',
                          left: '-6px',
                          top: '8px',
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: 'var(--gradient-primary)',
                          border: '2px solid var(--color-background)'
                        }
                      }}
                    >
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{exp.role}</h3>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.5rem',
                          fontSize: '0.875rem',
                          color: 'var(--color-text-secondary)',
                          marginBottom: '0.5rem'
                        }}>
                          <span>{exp.company}</span>
                          <span>•</span>
                          <span>{exp.duration}</span>
                        </div>
                        <ul style={{ 
                          marginBottom: '0.75rem',
                          paddingLeft: '1.5rem',
                          listStyleType: 'disc'
                        }}>
                          {exp.description.map((point, i) => (
                            <li key={i} style={{ marginBottom: '0.5rem' }}>{point}</li>
                          ))}
                        </ul>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {exp.skills.map((skill, i) => (
                            <span 
                              key={i} 
                              style={{
                                fontSize: '0.75rem',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                background: 'rgba(99, 102, 241, 0.1)',
                                color: 'var(--color-primary)',
                                border: '1px solid var(--color-primary)'
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              {activeTab === 'education' && (
                <motion.div
                  variants={timelineVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ maxWidth: '48rem', margin: '0 auto' }}
                >
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      custom={index}
                      variants={timelineItemVariants}
                      style={{
                        position: 'relative',
                        paddingLeft: '2rem',
                        paddingBottom: '2rem',
                        '::before': {
                          content: "''",
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: '2px',
                          background: 'rgba(75, 85, 99, 0.5)'
                        },
                        '::after': {
                          content: "''",
                          position: 'absolute',
                          left: '-6px',
                          top: '8px',
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: 'var(--gradient-primary)',
                          border: '2px solid var(--color-background)'
                        }
                      }}
                    >
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{edu.degree}</h3>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.5rem',
                          fontSize: '0.875rem',
                          color: 'var(--color-text-secondary)',
                          marginBottom: '0.5rem'
                        }}>
                          <span>{edu.institution}</span>
                          <span>•</span>
                          <span>{edu.duration}</span>
                        </div>
                        <p style={{ marginBottom: '0.75rem' }}>{edu.description}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {edu.courses.map((course, i) => (
                            <span 
                              key={i} 
                              style={{
                                fontSize: '0.75rem',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                background: 'rgba(236, 72, 153, 0.1)',
                                color: 'var(--color-secondary)',
                                border: '1px solid var(--color-secondary)'
                              }}
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              {activeTab === 'skills' && (
                <motion.div
                  variants={timelineVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ maxWidth: '48rem', margin: '0 auto' }}
                >
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '2rem' 
                  }}>
                    {technicalSkills.map((skillCategory, index) => (
                      <motion.div 
                        key={index}
                        custom={index}
                        variants={timelineItemVariants}
                        style={{
                          background: 'rgba(30, 41, 59, 0.5)',
                          padding: '1.5rem',
                          borderRadius: '0.75rem',
                          border: '1px solid rgba(75, 85, 99, 0.5)'
                        }}
                      >
                        <h3 style={{ 
                          fontSize: '1.25rem', 
                          fontWeight: '600',
                          marginBottom: '1rem',
                          color: 'var(--color-primary)'
                        }}>
                          {skillCategory.category}
                        </h3>
                        <div style={{ 
                          display: 'flex', 
                          flexWrap: 'wrap', 
                          gap: '0.5rem' 
                        }}>
                          {skillCategory.skills.map((skill, i) => (
                            <span 
                              key={i} 
                              style={{
                                fontSize: '0.75rem',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                background: index % 2 === 0 ? 'rgba(99, 102, 241, 0.1)' : 'rgba(236, 72, 153, 0.1)',
                                color: index % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)',
                                border: `1px solid ${index % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)'}`,
                                display: 'inline-flex',
                                alignItems: 'center'
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
            <a href="#contact" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '500',
              color: 'var(--color-primary)'
            }}>
              <span>Get in touch</span>
              <FiArrowRight />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume; 