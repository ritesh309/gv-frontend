import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { storeInfo } from '../mock';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Store Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-orange-400">{storeInfo.name}</h3>
            <p className="text-gray-300">{storeInfo.tagline}</p>
            <div className="flex items-start gap-2">
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <span className="text-sm">{storeInfo.address}</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span className="text-sm">{storeInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span className="text-sm">{storeInfo.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={16} className="mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p>Mon-Fri: {storeInfo.hours.weekdays}</p>
                  <p>Sat-Sun: {storeInfo.hours.weekends}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-1">
              {storeInfo.services.map((service, index) => (
                <li key={index} className="text-sm text-gray-300">
                  • {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-400">
              Stay updated with our latest collections and offers!
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © 2024 {storeInfo.name}. All rights reserved. | Designed with ❤️ in Lucknow
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;