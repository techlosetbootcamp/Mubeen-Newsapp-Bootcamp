// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
// import { FiUser } from 'react-icons/fi';
// import { CiSearch } from 'react-icons/ci';
// import { RxHamburgerMenu } from 'react-icons/rx';
// import logo from '../assets/logo.png';

// function Navbar() {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeRoute, setActiveRoute] = useState<string>(''); // State for tracking active route
//   const navigate = useNavigate();

//   // Handle route change
//   const handleRouteClick = (route: string) => {
//     setActiveRoute(route);
//     setMobileMenuOpen(false); // Close mobile menu
//   };

//   return (
//     <div className="flex items-center justify-between bg-white h-[80px] w-full px-4 md:px-20 shadow-md">
//       {/* Logo */}
//       <div>
//         <Link to="/" onClick={() => handleRouteClick('Home')}>
//           <img src={logo} alt="Logo" width={63} height={52} />
//         </Link>
//       </div>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex items-center gap-x-10">
//         <div className="flex items-center gap-2">
//           {activeRoute === 'Corona Updates' && <div className="h-2 w-2 bg-red-700 rounded-full"></div>}
//           <Link to="/corona-updates" onClick={() => handleRouteClick('Corona Updates')}>
//             <p className={`${activeRoute === 'Corona Updates' ? 'font-bold text-gray-800' : ''}`}>
//               Corona Virus
//             </p>
//           </Link>
//         </div>
//         <div className="flex items-center gap-2">
//           {activeRoute === 'Politics' && <div className="h-2 w-2 bg-red-700 rounded-full"></div>}
//           <Link to="/politics" onClick={() => handleRouteClick('Politics')}>
//             <p className={`${activeRoute === 'Politics' ? 'font-bold text-gray-800' : ''}`}>
//               Politics
//             </p>
//           </Link>
//         </div>
//         <div className="flex items-center gap-2">
//           {activeRoute === 'Business' && <div className="h-2 w-2 bg-red-700 rounded-full"></div>}
//           <Link to="/business" onClick={() => handleRouteClick('Business')}>
//             <p className={`${activeRoute === 'Business' ? 'font-bold text-gray-800' : ''}`}>
//               Business
//             </p>
//           </Link>
//         </div>
//         <div className="flex items-center gap-2">
//           {activeRoute === 'Sports' && <div className="h-2 w-2 bg-red-700 rounded-full"></div>}
//           <Link to="/sports" onClick={() => handleRouteClick('Sports')}>
//             <p className={`${activeRoute === 'Sports' ? 'font-bold text-gray-800' : ''}`}>
//               Sports
//             </p>
//           </Link>
//         </div>
//         <div className="flex items-center gap-2">
//           {activeRoute === 'World' && <div className="h-2 w-2 bg-red-700 rounded-full"></div>}
//           <Link to="/world" onClick={() => handleRouteClick('World')}>
//             <p className={`${activeRoute === 'World' ? 'font-bold text-gray-800' : ''}`}>
//               World
//             </p>
//           </Link>
//         </div>
//         <div className="flex items-center gap-2">
//           {activeRoute === 'Travel' && <div className="h-2 w-2 bg-red-700 rounded-full"></div>}
//           <Link to="/travel" onClick={() => handleRouteClick('Travel')}>
//             <p className={`${activeRoute === 'Travel' ? 'font-bold text-gray-800' : ''}`}>
//               Travel
//             </p>
//           </Link>
//         </div>
//         <div className="flex items-center gap-2">
//           {activeRoute === 'Podcasts' && <div className="h-2 w-2 bg-red-700 rounded-full"></div>}
//           <Link to="/podcasts" onClick={() => handleRouteClick('Podcasts')}>
//             <p className={`${activeRoute === 'Podcasts' ? 'font-bold text-gray-800' : ''}`}>
//               Podcasts
//             </p>
//           </Link>
//         </div>
//       </div>

//       {/* Icons */}
//       <div className="flex items-center gap-5">
//         <MdKeyboardDoubleArrowRight size={20} className="cursor-pointer hidden md:block" />
//         <FiUser size={20} className="cursor-pointer" />
//         <CiSearch
//           size={20}
//           className="cursor-pointer"
//           onClick={() => navigate('/search')}
//         />
//         <RxHamburgerMenu
//           size={20}
//           className="cursor-pointer md:hidden"
//           onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
//         />
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="absolute top-[80px] left-0 w-full bg-white shadow-md p-4 z-40 md:hidden">
//           <div className="flex flex-col gap-y-4">
//             <div className="flex items-center gap-2">
//               {activeRoute === 'Corona Updates' && <div className="h-2 w-2 bg-red-700 rounded-full"></div>}
//               <Link to="/corona-updates" onClick={() => handleRouteClick('Corona Updates')}>
//                 <p
//                   className={`${
//                     activeRoute === 'Corona Updates' ? 'font-bold text-gray-800' : ''
//                   }`}
//                 >
//                   Corona Virus
//                 </p>
//               </Link>
//             </div>
//             <div className="flex items-center gap-2">
//               {activeRoute === 'Corona Updates' && <div className="h-2 w-2 bg-red-700 rounded-full"></div>}
//               <Link to="/politics" onClick={() => handleRouteClick('Corona Updates')}>
//                 <p
//                   className={`${
//                     activeRoute === 'Corona Updates' ? 'font-bold text-gray-800' : ''
//                   }`}
//                 >
//                   Politics
//                 </p>
//               </Link>
//             </div>
//             <div className="flex items-center gap-2">
//               {activeRoute === 'Corona Updates' && <div className="h-2 w-2 bg-red-700 rounded-full"></div>}
//               <Link to="/business" onClick={() => handleRouteClick('Corona Updates')}>
//                 <p
//                   className={`${
//                     activeRoute === 'Corona Updates' ? 'font-bold text-gray-800' : ''
//                   }`}
//                 >
//                   Business
//                 </p>
//               </Link>
//             </div>
//             <div className="flex items-center gap-2">
//               {activeRoute === 'Corona Updates' && <div className="h-2 w-2 bg-red-700 rounded-full"></div>}
//               <Link to="/sports" onClick={() => handleRouteClick('Corona Updates')}>
//                 <p
//                   className={`${
//                     activeRoute === 'Corona Updates' ? 'font-bold text-gray-800' : ''
//                   }`}
//                 >
//                   Sports
//                 </p>
//               </Link>
//             </div>
//             <div className="flex items-center gap-2">
//               {activeRoute === 'Corona Updates' && <div className="h-2 w-2 bg-red-700 rounded-full"></div>}
//               <Link to="/world" onClick={() => handleRouteClick('Corona Updates')}>
//                 <p
//                   className={`${
//                     activeRoute === 'Corona Updates' ? 'font-bold text-gray-800' : ''
//                   }`}
//                 >
//                   World
//                 </p>
//               </Link>
//             </div>
//             <div className="flex items-center gap-2">
//               {activeRoute === 'Corona Updates' && <div className="h-2 w-2 bg-red-700 rounded-full"></div>}
//               <Link to="/travel" onClick={() => handleRouteClick('Corona Updates')}>
//                 <p
//                   className={`${
//                     activeRoute === 'Corona Updates' ? 'font-bold text-gray-800' : ''
//                   }`}
//                 >
//                   Travel
//                 </p>
//               </Link>
//             </div>
//             <div className="flex items-center gap-2">
//               {activeRoute === 'Corona Updates' && <div className="h-2 w-2 bg-red-700 rounded-full"></div>}
//               <Link to="/podcasts" onClick={() => handleRouteClick('Corona Updates')}>
//                 <p
//                   className={`${
//                     activeRoute === 'Corona Updates' ? 'font-bold text-gray-800' : ''
//                   }`}
//                 >
//                   Podcasts
//                 </p>
//               </Link>
//             </div>
//             {/* Repeat the same structure for other routes */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;













// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
// import { FiUser } from 'react-icons/fi';
// import { CiSearch } from 'react-icons/ci';
// import { RxHamburgerMenu } from 'react-icons/rx';
// import logo from '../assets/logo.png';

// function Navbar() {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeRoute, setActiveRoute] = useState<string>('');
//   const navigate = useNavigate();

//   const menuItems = [
//     { name: 'Corona Updates', path: '/corona-updates' },
//     { name: 'Politics', path: '/politics' },
//     { name: 'Business', path: '/business' },
//     { name: 'Sports', path: '/sports' },
//     { name: 'World', path: '/world' },
//     { name: 'Travel', path: '/travel' },
//     { name: 'Podcasts', path: '/podcasts' },
//   ];

//   const handleRouteClick = (route: string) => {
//     setActiveRoute(route);
//   };

//   const renderMenu = (isMobile: boolean) => (
//     <div
//       className={`flex ${isMobile ? 'flex-col gap-y-4' : 'gap-x-10'} ${
//         isMobile ? 'md:hidden' : 'hidden md:flex'
//       }`}
//     >
//       {menuItems.map((route) => (
//         <div key={route.name} className="flex items-center gap-2">
//           {activeRoute === route.name && (
//             <div className="h-2 w-2 bg-red-700 rounded-full" />
//           )}
//           <Link
//             to={route.path}
//             onClick={() => {
//               handleRouteClick(route.name);
//               if (isMobile) setMobileMenuOpen(false); // Close the menu for mobile
//             }}
//             className={`${
//               activeRoute === route.name ? 'font-bold text-gray-800' : ''
//             }`}
//           >
//             {route.name}
//           </Link>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="flex items-center justify-between bg-white h-[80px] w-full px-4 md:px-20 shadow-md">
//       {/* Logo */}
//       <div>
//         <Link to="/">
//           <img src={logo} alt="Logo" width={63} height={52} />
//         </Link>
//       </div>


//       <div className='flex items-center gap-x-10'>
//         <div>
//           <Link to="/corona-updates"><p>Corona Virus</p></Link>
//         </div>
//         <div>
//           <Link to="/politics"><p>Politics</p></Link>
//         </div>
//         <div>
//           <Link to="/business"><p>Business</p></Link>
//         </div>
//         <div>
//           <Link to="/sports"><p>Sports</p></Link>
//         </div>
//         <div>
//           <Link to="/world"><p>World</p></Link>
//         </div>
//         <div>
//           <Link to="/travel"><p>Travel</p></Link>
//         </div>
//         <div>
//           <Link to="/podcasts"><p>Podcasts</p></Link>
//         </div>
//       </div>

//       {/* Desktop Menu */}
//       {renderMenu(false)}

//       {/* Icons */}
//       <div className="flex items-center gap-5">
//         <MdKeyboardDoubleArrowRight size={20} className="cursor-pointer hidden md:block" />
//         <FiUser size={20} className="cursor-pointer" />
//         <CiSearch
//           size={20}
//           className="cursor-pointer"
//           onClick={() => navigate('/search')}
//         />
//         <RxHamburgerMenu
//           size={20}
//           className="cursor-pointer md:hidden"
//           onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
//         />
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="absolute top-[80px] left-0 w-full bg-white shadow-md p-4 z-40">
//           {renderMenu(true)}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;























import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import { CiSearch } from 'react-icons/ci';
import { RxHamburgerMenu } from 'react-icons/rx';
import logo from '../assets/logo.png';

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState<string>(''); // State for tracking active route
  const navigate = useNavigate();

  const handleRouteClick = (route: string) => {
    setActiveRoute(route);
  };

  return (
    <div className="flex items-center justify-between bg-white h-[80px] w-full px-4 md:px-20 shadow-md">
      {/* Logo */}
      <div>
        <Link to="/">
          <img src={logo} alt="Logo" width={63} height={52} />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-x-10">
        {[
          { name: 'Corona Updates', path: '/corona-updates' },
          { name: 'Politics', path: '/politics' },
          { name: 'Business', path: '/business' },
          { name: 'Sports', path: '/sports' },
          { name: 'World', path: '/world' },
          { name: 'Travel', path: '/travel' },
          { name: 'Podcasts', path: '/podcasts' },
        ].map((route) => (
          <div key={route.name} className="flex items-center gap-2">
            {activeRoute === route.name && (
              <div className="h-2 w-2 bg-red-700 rounded-full" />
            )}
            <Link
              to={route.path}
              onClick={() => handleRouteClick(route.name)}
              className={`${
                activeRoute === route.name ? 'font-bold text-gray-800' : ''
              }`}
            >
              {route.name}
            </Link>
          </div>
        ))}
      </div>

      {/* Icons */}
      <div className="flex items-center gap-5">
        {/* Other icons */}
        <MdKeyboardDoubleArrowRight size={20} className="cursor-pointer hidden md:block" />
        <FiUser size={20} className="cursor-pointer" />

        {/* Search Icon */}
        <CiSearch
          size={20}
          className="cursor-pointer"
          onClick={() => navigate('/search')}
        />

        {/* Hamburger Menu */}
        <RxHamburgerMenu
          size={20}
          className="cursor-pointer md:hidden"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        />
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-white shadow-md p-4 md:hidden z-40">
          <div className="flex flex-col gap-y-4">
            {[
              { name: 'Corona Updates', path: '/corona-updates' },
              { name: 'Politics', path: '/politics' },
              { name: 'Business', path: '/business' },
              { name: 'Sports', path: '/sports' },
              { name: 'World', path: '/world' },
              { name: 'Travel', path: '/travel' },
              { name: 'Podcasts', path: '/podcasts' },
            ].map((route) => (
              <div key={route.name} className="flex items-center gap-2">
                {activeRoute === route.name && (
                  <div className="h-2 w-2 bg-red-700 rounded-full" />
                )}
                <Link
                  to={route.path}
                  onClick={() => {
                    handleRouteClick(route.name);
                    setMobileMenuOpen(false); // Close the menu when an item is selected
                  }}
                  className={`${
                    activeRoute === route.name ? 'font-bold text-gray-800' : ''
                  }`}
                >
                  {route.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
