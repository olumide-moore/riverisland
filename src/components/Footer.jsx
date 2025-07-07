import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const sections = [
    {
      title: "How can we help?",
      links: [
        "Delivery",
        "Returns",
        "Gift Cards",
        "Size Guides",
        "Women's Plus Size Guide",
        "Product Recalls",
        "Reporting a Scam",
        "FAQs",
        "Contact Us",
        "My Account",
        "Find A Store",
        "Store Events",
        "Student Discount",
        "Blue Light Card Discount",
        "Sitemap",
      ],
    },
    {
      title: "Useful info",
      links: [
        "Terms & Conditions",
        "Promotion Terms & Conditions",
        "Privacy Notice & Cookies",
        "Security",
        "Accessibility",
        "User Generated Content Policy",
      ],
    },
    {
      title: "Inside River Island",
      links: [
        "About Us",
        "Sustainability",
        "Careers At River Island",
        "Partner With Us",
        "Charity Donations",
        "Gender Pay Gap Report",
        "Pensions",
        "Modern Slavery Statement",
        "Tax Strategy",
        "S172 Statement",
      ],
    },
  ];

  return (
    <footer className="bg-gray-100 text-gray-700 pt-14 px-6 mt-20">
      <div className="text-6xl mb-8">RI</div>
      <div className="md:w-full grid md:grid-cols-3 gap-14">
        <div>
          <h3 className="text-lg text-nowrap font-semibold">Are you an insider?</h3>
          <p className="mt-4">Sign up now and get 10% off your first shop, and insider-only discounts all year round (you're welcome)</p>
          <div className="mt-4 flex gap-1">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-12 p-2 border border-gray-300 rounded-sm focus:outline-none"
            />
            <button className="bg-white border border-gray-300 px-4 rounded-sm text-nowrap">Sign Up</button>
          </div>
          <p className="text-xs mt-2">
            <a href="#" className="underline">T&Cs apply</a>. Your personal details are safe with us. For more info, read our <a href="#" className="underline">Privacy Notice</a>.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10 col-span-2">
          {sections.map(({ title, links }) => (
            <div key={title} className="border-b md:border-none">
              <button
                className="w-full text-left py-2 flex justify-between items-center md:cursor-default"
                onClick={() => toggleSection(title)}
              >
                <h3 className="text-lg font-semibold">{title}</h3>
                <span className="md:hidden text-2xl">{openSections[title] ? "-" : "+"}</span>
              </button>
              <ul className={`mt-2 space-y-1 ${openSections[title] ? "block" : "hidden"} md:block`}>
                {links.map((item) => (
                  <li key={item}><a href="#" className="hover:underline">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t mt-8 pt-4 flex flex-col md:flex-row justify-between items-center ">
        <div className="flex items-center gap-2">
          <span role="img" aria-label="UK flag">🇬🇧</span>
          <a href="#" className="hover:underline">United Kingdom</a>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-600 hover:text-black"><FaFacebookF /></a>
          <a href="#" className="text-gray-600 hover:text-black"><FaInstagram /></a>
          <a href="#" className="text-gray-600 hover:text-black"><FaPinterestP /></a>
          <a href="#" className="text-gray-600 hover:text-black"><FaYoutube /></a>
          <a href="#" className="text-gray-600 hover:text-black"><FaTiktok /></a>
        </div>
        <p className="mt-4 md:mt-0">© 2025 River Island</p>
      </div>
    </footer>
  );
};

export default Footer;
