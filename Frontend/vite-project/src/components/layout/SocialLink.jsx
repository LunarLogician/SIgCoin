import React from 'react';

// SocialLink Component
export default function SocialLink({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-yellow-500 transition-all transform hover:scale-110"
    >
      {icon}
    </a>
  );
}
