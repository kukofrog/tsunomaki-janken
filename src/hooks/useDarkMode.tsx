import { useState, useEffect } from 'react';

function useDarkMode() {
  const [theme, setTheme] = useState<string | undefined>(undefined);

  useEffect(() => {
    setTheme(
      localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
    );
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    theme && localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
}

export default useDarkMode;
