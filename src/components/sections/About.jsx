import { motion } from 'framer-motion';
import { FiCode, FiLayout, FiServer, FiTool, FiBarChart2, FiDatabase } from 'react-icons/fi';
import useScrollReveal from '../../hooks/useScrollReveal';

const About = () => {
  const { ref: aboutRef, controls: aboutControls } = useScrollReveal();
  const { ref: skillsRef, controls: skillsControls } = useScrollReveal();
  
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };
  
  const skills = [
    {
      icon: <FiCode size={32} />,
      title: "Programming & Frameworks",
      description: "Building efficient and optimized solutions using Python and Java with a focus on automation and performance.",
      items: ["Python", "Java", "Git & Version Control", "Problem Solving", "Automation"]
    },
    {
      icon: <FiDatabase size={32} />,
      title: "AI & Machine Learning",
      description: "Developing and implementing advanced AI and machine learning models for predictive analytics and automation.",
      items: ["TensorFlow", "PyTorch", "Scikit-learn", "Deep Learning", "Neural Networks", "Computer Vision", "Natural Language Processing"]
    },
    {
      icon: <FiBarChart2 size={32} />,
      title: "Data Science",
      description: "Analyzing and interpreting complex data sets to extract meaningful insights and drive decision-making.",
      items: ["Pandas", "NumPy", "Data Visualization", "Plotly", "Statistical Analysis", "Predictive Modeling"]
    },
    {
      icon: <FiLayout size={32} />,
      title: "Web Development",
      description: "Creating functional and responsive web applications with modern technologies.",
      items: ["HTML5", "CSS3", "JavaScript", "Flask", "Responsive Design", "API Integration"]
    }
  ];

  return (
    <section id="about" style={{ padding: '5rem 0' }}>
      <div className="container">
        <motion.div
          ref={aboutRef}
          variants={sectionVariants}
          initial="hidden"
          animate={aboutControls}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <motion.h2 
            variants={textVariants} 
            style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2.5rem', 
            alignItems: 'center' 
          }}>
            <motion.div 
              variants={textVariants} 
              style={{ order: 2, '@media (min-width: 768px)': { order: 1 } }}
            >
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Who am I?</h3>
              <motion.p variants={textVariants} style={{ marginBottom: '1rem' }}>
                Hi! I'm Harsh Jaiswal, a Python programmer and machine learning specialist from Gurugram. I have a strong 
                foundation in developing AI/ML solutions and automation tools with a focus on solving complex problems efficiently.
              </motion.p>
              <motion.p variants={textVariants} style={{ marginBottom: '1rem' }}>
                I recently completed my Bachelor of Computer Applications (BCA) from University of Lucknow (2021-2024) and am currently
                working as a Machine Learning Intern at Digipodium in Lucknow, where I develop machine learning models, build deep learning
                architectures, and integrate trained models into web applications using Flask.
              </motion.p>
              <motion.p variants={textVariants}>
                Beyond programming, I'm passionate about advancing AI capabilities and creating practical applications 
                for machine learning. I've developed numerous projects in computer vision, voice cloning, and automated tools 
                that demonstrate my commitment to innovation and problem-solving in the field of artificial intelligence.
              </motion.p>
            </motion.div>
            
            <motion.div 
              variants={textVariants} 
              style={{ order: 1, '@media (min-width: 768px)': { order: 2 } }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div style={{ 
                backgroundColor: 'rgba(30, 41, 59, 0.7)', 
                backdropFilter: 'blur(12px)', 
                borderRadius: '0.75rem', 
                overflow: 'hidden',
                border: '1px solid rgba(75, 85, 99, 0.5)'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
                  alt="Developer working" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div
          ref={skillsRef}
          variants={sectionVariants}
          initial="hidden"
          animate={skillsControls}
          style={{ marginTop: '5rem' }}
        >
          <motion.h3 
            variants={textVariants} 
            style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}
          >
            My <span className="gradient-text">Skills</span>
          </motion.h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                style={{
                  background: 'rgba(30, 41, 59, 0.7)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid rgba(75, 85, 99, 0.5)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)'
                  }
                }}
                whileHover={{ y: -5 }}
              >
                <div style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>{skill.icon}</div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{skill.title}</h4>
                <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>{skill.description}</p>
                <ul style={{ fontSize: '0.875rem' }}>
                  {skill.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ 
                        width: '0.5rem', 
                        height: '0.5rem', 
                        backgroundColor: 'var(--color-primary)', 
                        borderRadius: '50%', 
                        marginRight: '0.5rem' 
                      }}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 