import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logoImage from './assets/logow.png';
import { trackVisit } from './services/tracking';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Cursor from './components/layout/Cursor';
import AnimatedBackground from './components/layout/AnimatedBackground';

// Page sections
import Home from './components/sections/Home';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Resume from './components/sections/Resume';
import Contact from './components/sections/Contact';

// Context
import { ThemeProvider } from './context/ThemeContext';

import './App.css';

console.log("App component is loading!");

// Define the pulse animation
const pulseKeyframes = `
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      opacity: 0.8;
      filter: brightness(0.8) drop-shadow(0 0 15px rgba(99, 102, 241, 0.2));
    }
    50% {
      transform: scale(1.05);
      opacity: 1;
      filter: brightness(1.2) drop-shadow(0 0 30px rgba(99, 102, 241, 0.6));
    }
    100% {
      transform: scale(0.95);
      opacity: 0.8;
      filter: brightness(0.8) drop-shadow(0 0 15px rgba(99, 102, 241, 0.2));
    }
  }
`;

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Track visit
    trackVisit();
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      console.log("Loading complete!");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <style>{pulseKeyframes}</style>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#111827',
          color: 'white',
          zIndex: 1000
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <img 
              src={logoImage} 
              alt="Harsh Jaiswal Logo"
              style={{
                width: '80px',
                height: 'auto',
                animation: 'pulse 1.5s ease-in-out infinite',
                filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.3))'
              }}
            />
            <p style={{ marginTop: '20px', fontSize: '1.1rem', letterSpacing: '0.05em' }}>Loading...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <Cursor />
        <AnimatedBackground />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={
                <>
                  <Home />
                  <About />
                  <Projects />
                  <Resume />
                  <Contact />
                </>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
