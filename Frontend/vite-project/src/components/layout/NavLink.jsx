import React from 'react';

export default function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-gray-300 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-yellow-500 after:transition-all"
    >
      {children}
    </a>
  );
}
