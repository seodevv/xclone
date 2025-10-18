export const scrollHeaderHandler = (set: (value: 'up' | 'down') => void) => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  let lastScrollY = 0;
  const listener = () => {
    if (lastScrollY < window.scrollY) {
      set('down');
    } else {
      set('up');
    }

    lastScrollY = window.scrollY;
  };

  window.addEventListener('scroll', listener);
  return () => {
    window.removeEventListener('scroll', listener);
  };
};
