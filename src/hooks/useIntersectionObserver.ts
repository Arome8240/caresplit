import { useState, useEffect, useRef } from 'react';

interface Options extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = (options: Options = {}): [React.RefObject<HTMLElement | null>, boolean] => {
  const { threshold = 0, root = null, rootMargin = '0px', freezeOnceVisible = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (freezeOnceVisible && isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (freezeOnceVisible) observer.unobserve(element);
        } else if (!freezeOnceVisible) {
          setIsVisible(false);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [threshold, root, rootMargin, freezeOnceVisible, isVisible]);

  return [ref, isVisible];
};
