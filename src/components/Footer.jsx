import { FaGooglePlay, FaApple } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-5 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand and Apps */}
        <div>
          <h2 className="text-2xl font-bold">Savitri Jewels</h2>
          <p className="text-gray-400 mt-2">Timeless Beauty, Eternal Elegance</p>
          <div className="flex justify-center md:justify-start mt-4 gap-4">
            <button className="bg-black p-2 flex items-center gap-2 rounded-lg">
              <FaGooglePlay /> Google Play
            </button>
            <button className="bg-black p-2 flex items-center gap-2 rounded-lg">
              <FaApple /> App Store
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold md:px-10">Company</h3>
            <ul className="text-gray-400 mt-2 space-y-2 md:px-10">
              <li>About</li>
              <li>News</li>
              <li>Shop</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold md:px-10">Support</h3>
            <ul className="text-gray-400 mt-2 space-y-2 md:px-10">
              <li>FAQs</li>
              <li>Returns</li>
              <li>Shipping</li>
              <li>Track Order</li>
            </ul>
          </div>
        </div>

        {/* Legal & Social */}
        <div>
          <h3 className="text-lg font-semibold md:px-10">Legal</h3>
          <ul className="text-gray-400 mt-2 space-y-2 md:px-10">
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Cookies</li>
            <li>Report Issue</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-500 text-sm mt-8">
        <p>&copy; {new Date().getFullYear()} Savitri Jewels. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
