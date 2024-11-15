import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom'; // We will use NavLink to scroll within the page
import { IoMenu } from 'react-icons/io5';
import HeaderComponent from './HeaderComponent';
import Second from './Second';
import Third from './Third';
import Forth from './Forth';
import Fifth from './Fifth';

const Header = () => {
  const menuRef = useRef(null);
  const [navToggle, setNavToggle] = useState(false);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setNavToggle(false);
    }
  };

  useEffect(() => {
    if (navToggle) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navToggle]);

  const scrollToSection = (id) => {
    // Use this function to scroll to the respective section
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className='overflow-x-hidden bg-[#e4efff]'>
        <div className="flex z-20 justify-between h-36 w-full px-6 sm:px-6 md:px-12 lg:px-28 pt-4 relative items-center">
          {/* Logo */}
          <div className="Logo">
            <NavLink to="/" className="text-[#6165f3] font-sans text-2xl sm:text-2xl font-extrabold">
              Investor App
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex justify-evenly w-3/5 lg:w-2/5 text-lg text-center">
            <li>
              <a
                href="#home"
                className="text-gray-800 font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('home'); // Scroll to the Home section
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-gray-400"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('about'); // Scroll to the About section
                }}
              >
                About App
              </a>
            </li>
            <li>
              <a
                href="#faqs"
                className="text-gray-400"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('faqs'); // Scroll to the FAQs section
                }}
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="#preview"
                className="text-gray-400"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('preview'); // Scroll to the Preview section
                }}
              >
                Preview
              </a>
            </li>
          </ul>

          {/* Download Button */}
          <button className="hidden md:block bg-white rounded h-10 w-28 px-4 py-2 text-[#6165F3] border-2 z-10">
            Download
          </button>

          {/* Toggle Button for Mobile */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setNavToggle(!navToggle)}
          >
            <IoMenu />
          </button>

          {/* Toggle Menu for Mobile */}
          {navToggle && (
            <div
              ref={menuRef}
              className="absolute top-16 right-0 w-48 bg-white shadow-lg z-20 md:hidden"
            >
              <ul className="flex flex-col items-start p-4">
                <li>
                  <a
                    href="#home"
                    className="text-gray-800 block py-2 w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('home');
                    }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 block py-2 w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('about');
                    }}
                  >
                    About App
                  </a>
                </li>
                <li>
                  <a
                    href="#faqs"
                    className="text-gray-400 block py-2 w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('faqs');
                    }}
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#preview"
                    className="text-gray-400 block py-2 w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('preview');
                    }}
                  >
                    Preview
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Sections of the page that you want to scroll to */}
      <div id="home">
        <HeaderComponent />
      </div>
      <div id="about">
        <Second />
      </div>
      <div id="faqs">
        <Third />
      </div>
      <div id="preview">
        <Fifth />
      </div>
    </>
  );
};

export default Header;
