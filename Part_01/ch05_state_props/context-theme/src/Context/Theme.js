import React from 'react';

export const themes = {
    light: {
      foreground: '#222222',
      background: '#e9e9e9'
    },
    dark: {
      foreground: '#fff',
      background: '#222222'
    }
  };
  
  export const ThemeContext = React.createContext({
      theme: themes.dark, // default value
      toggleTheme:()=>{}, // pass func down through the context to allow consumers to do update
  });
  