import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom'; // We will use NavLink to scroll within the page
import { IoMenu } from 'react-icons/io5';
import HeaderComponent from './HeaderComponent';
import Second from './Second';
import Third from './Third';
import Forth from './Forth';
import Fifth from './Fifth';

const Header = () => {
  // const menuRef = useRef(null);
  // const [navToggle, setNavToggle] = useState(false);

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

        <div className="flex  z-20 justify-between lg:h-[9rem] md:h-[7rem] sm:h-[4rem] w-full px-6 sm:px-6 md:px-12 lg:px-28 py-4 relative items-center ">

          {/* Logo */}
          <div className="Logo">
            <NavLink to="/" className="text-[#6165f3] font-sans text-[14px] sm:text-2xl font-extrabold">
              Investor&nbsp;App
            </NavLink>
          </div>

          {/* Desktop Menu */}

          <ul className="flex sm:justify-evenly max-sm:gap-4 justify-center w-3/5 lg:w-2/5 text-lg max-md:text-[16px] max-sm:text-[9px] text-center">
            <NavLink to="/" className="text-gray-800 font-bold">
              Home
            </NavLink>
            <NavLink to="/about" className="text-gray-400">
              About App
            </NavLink>
            <NavLink to="/faqs" className="text-gray-400">
              FAQs
            </NavLink>
            <NavLink to="/preview" className="text-gray-400">
              Preview
            </NavLink>

          </ul>

          {/* Download Button */}
          <button className="block bg-white max-md:text-[16px] max-sm:text-[9px] rounded px-2 py-1 sm:px-4 sm:py-2 text-[#6165F3] border-2 z-10">
            Download
          </button>

          {/* Toggle Button for Mobile */}

          {/* Toggle Menu for Mobile */}
          {/* {navToggle && (
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

          )} */}
        </div> 
      </div>

      <HeaderComponent />
      <Second />
      {/* <Third /> */}
      {/* <Forth /> */}
      {/* <ThreeAfter/> don't 😥😣 uncomment*/}
      {/* <Fifth /> */}

    </>
  );
};

export default Header;
