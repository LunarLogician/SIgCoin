import React from 'react';
import { Github, Twitter, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">SigCoin</h3>
            <p className="text-gray-400">
              The next generation cryptocurrency mining platform.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Connect With Us</h3>
            <div className="flex space-x-4">
             
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-zinc-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} SigCoin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
