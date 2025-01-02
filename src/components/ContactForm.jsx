import React from 'react';

function ContactForm() {
  return (
    <section id="contact" className="relative py-24 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Details */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-Apricot">Contact</h2>
          <p className="text-gray-300 mb-6">
            I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you.
          </p>
          <p className="text-gray-300 mb-2">info@mysite.com</p>
          <p className="text-gray-300 mb-8">Tel: 1-800-000-0000</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-Apricot"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="text-gray-400 hover:text-Apricot"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-Apricot"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-gray-400 hover:text-Apricot"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="firstName">First name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-Apricot"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="lastName">Last name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-Apricot"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-Apricot"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-Apricot"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-Apricot"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-Apricot text-black font-semibold py-3 rounded hover:bg-Apricot/80 hover:text-white transition duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
