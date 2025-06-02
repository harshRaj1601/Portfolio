import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';

/**
 * Custom hook for triggering animations when elements scroll into view
 * @param {number} threshold - The percentage of the element that needs to be visible to trigger
 * @param {number} triggerOnce - Whether to trigger the animation only once
 * @returns {object} - The ref to attach to the element and the animation controls
 */
const useScrollReveal = (threshold = 0.1, triggerOnce = true) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return { ref, controls, inView };
};

export default useScrollReveal; 