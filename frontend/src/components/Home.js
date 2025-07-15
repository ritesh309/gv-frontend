import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, ShoppingCart, Users, Award, Heart } from 'lucide-react';
import { products, testimonials, aboutContent, storeInfo } from '../mock';
import { useCart } from '../context/CartContext';

const Home = () => {
  const { addToCart } = useCart();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const featuredProducts = products.filter(product => product.featured);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    alert('Thank you for your message! We will get back to you soon.');
    setContactForm({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="retro-hero">
        <div className="retro-hero-content">
          <h1 className="retro-hero-title">
            Welcome to {storeInfo.name}
          </h1>
          <p className="retro-hero-subtitle">
            {storeInfo.tagline}
          </p>
          <p className="retro-hero-description">
            Discover our exquisite collection of traditional and contemporary clothing for men and women. 
            Located in the heart of Lucknow, we bring you the finest fabrics and designs that celebrate 
            the rich heritage of Indian fashion while embracing modern trends.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/products" className="btn-primary">
              Shop Now <ArrowRight size={20} />
            </Link>
            <a href="#about" className="btn-outline">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Featured Collection</h2>
            <p className="body-large text-gray-600">
              Handpicked pieces from our latest arrivals
            </p>
          </div>
          
          <div className="retro-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="retro-card retro-hover-lift">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="retro-card-image"
                />
                <div className="retro-card-content">
                  <h3 className="retro-card-title">{product.name}</h3>
                  <div className="retro-card-price">
                    ₹{product.price.toLocaleString()}
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through ml-2">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="retro-card-description">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 capitalize">
                      {product.category} • {product.type}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="btn-secondary"
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary">
              View All Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="text-orange-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">5000+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <Award className="text-orange-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">20+</h3>
              <p className="text-gray-600">Years of Excellence</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="text-orange-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">100%</h3>
              <p className="text-gray-600">Quality Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 mb-8">{aboutContent.title}</h2>
            <p className="body-large mb-8 text-gray-600">{aboutContent.description}</p>
            <p className="body-medium mb-8 text-gray-600">{aboutContent.mission}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="space-y-4">
                <h3 className="sub-heading">Our Values</h3>
                <ul className="space-y-2 text-left">
                  {aboutContent.values.map((value, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span className="body-medium">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="sub-heading">Our Services</h3>
                <ul className="space-y-2 text-left">
                  {storeInfo.services.map((service, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span className="body-medium">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">What Our Customers Say</h2>
            <p className="body-large text-gray-600">
              Read reviews from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                  <div className="flex ml-auto">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-1 mb-4">Get in Touch</h2>
              <p className="body-large text-gray-600">
                Have questions? We'd love to hear from you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="sub-heading">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-gray-600">{storeInfo.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-gray-600">{storeInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600">{storeInfo.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="sub-heading mb-4">Send us a Message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;