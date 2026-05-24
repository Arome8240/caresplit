import { useState, useEffect, useRef } from 'react';

export const useAnimatedCounter = (
  target: number,
  duration = 1500,
  isActive = true
): number => {
  const [current, setCurrent] = useState(0);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const startValueRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive || target === 0) {
      setCurrent(target);
      return;
    }

    startValueRef.current = current;
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(startValueRef.current + (target - startValueRef.current) * eased);
      setCurrent(value);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, isActive]);

  return current;
};
