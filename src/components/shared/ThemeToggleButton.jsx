// filepath: /C:/Users/Home PC/Desktop/Web ph/Chapter 12/A12/client/src/components/ThemeToggleButton.jsx
import { Moon, Sun } from 'lucide-react';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../providers/ThemeProvider';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" onChange={toggleTheme} defaultChecked={theme === 'dark' ? true : false} />
        <div className="group peer ring-0 bg-gray-200 text-gray-900 rounded-full border border-gray-900 duration-700 after:duration-300 w-16 h-8  shadow-md peer-checked:bg-gray-900 peer-checked:text-gray-200 after:content-[''] after:rounded-full after:absolute after:bg-gray-900 after:h-6 after:w-6 after:top-1 after:left-1 peer-checked:after:bg-white peer-checked:after:translate-x-8 flex justify-between items-center px-2">
          <Sun className="group-hover:scale-90 duration-300 transition-all w-5" />
          <Moon className="group-hover:scale-90 duration-300 transition-all  w-5" />
        </div>
      </label>

    </>
  );
};
export default ThemeToggleButton;