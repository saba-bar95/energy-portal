import { useState, useEffect, useRef } from "react";

const AnimatedNumber = ({ targetValue, duration = 3000 }) => {
  // Increased duration to 3 seconds
  const [animatedValue, setAnimatedValue] = useState(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    let startTime;

    const easeOutExpo = (t) => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); // Extremely slow at the end
    };

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easedPercentage = easeOutExpo(percentage); // Apply easing

      setAnimatedValue(easedPercentage * targetValue);

      if (progress < duration) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetValue, duration]);

  return animatedValue.toFixed(1);
};

export default AnimatedNumber;
