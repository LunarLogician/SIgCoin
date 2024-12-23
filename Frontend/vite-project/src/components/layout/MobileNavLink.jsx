import React from 'react';

export default function MobileNavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-gray-300 hover:text-yellow-500 block px-3 py-2 rounded-md text-base font-medium border border-transparent hover:border-yellow-500/20 transition-all"
    >
      {children}
    </a>
  );
}
