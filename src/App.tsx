import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Project from './pages/Project';
import Contact from './pages/Contact';
import NavigationBar from './components/NavigationBar';
import useChangeTheme from './helpers/useChangeTheme';

export function App() {
  const [theme, changeTheme] = useChangeTheme('theme', '');
  return (
    <main data-theme={theme}>
      <NavigationBar changeTheme={changeTheme} theme={theme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
