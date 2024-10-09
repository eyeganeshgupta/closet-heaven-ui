import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeCategories from "./HomeCategories";
import HomeProductTrending from "./HomeProductTrending";

const offers = [
  {
    name: "Download the app",
    description: "Get an exclusive 5% off",
    href: "#",
    icon: "📱",
  },
  {
    name: "Return when you're ready",
    description: "18 days of free returns",
    href: "#",
    icon: "🔄",
  },
  {
    name: "Sign up for our newsletter",
    description: "15% off your first order",
    href: "#",
    icon: "📧",
  },
];

const perks = [
  {
    name: "Free returns",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/670/670910.png",
    description:
      "Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.",
  },
  {
    name: "Same day delivery",
    imageUrl:
      "https://cdn.vectorstock.com/i/500p/48/45/same-day-delivery-icon-symbol-on-white-background-vector-52974845.jpg",
    description:
      "We offer a delivery service that has never been done before. Checkout today and receive your products within hours.",
  },
  {
    name: "All year discount",
    imageUrl:
      "https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/image/rDtN98Qoishumwih/discount-coupon_G1jSWUd__thumb.jpg",
    description:
      'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
  },
  {
    name: "For the planet",
    imageUrl:
      "https://png.pngtree.com/png-vector/20240310/ourmid/pngtree-world-earth-globe-circle-png-image_11927301.png",
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
];

const LazyImage = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState("placeholder.jpg");

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
    };
  }, [src]);

  return (
    <motion.img
      src={imageSrc}
      alt={alt}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
};

const NewsletterForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mt-4 sm:flex sm:max-w-md w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label htmlFor="email-address" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        name="email-address"
        id="email-address"
        autoComplete="email"
        required
        className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-indigo-500"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <motion.div
        className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Subscribe
        </button>
      </motion.div>
    </motion.form>
  );
};

export default function EnhancedHomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setIsLoggedIn(user?.token ? true : false);
  }, []);

  const containerClass = `bg-gradient-to-b from-white to-gray-100 ${
    !isLoggedIn ? "lg:mt-32" : "lg:mt-24"
  }`;

  return (
    <motion.div
      className={containerClass}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main>
        {/* Hero */}
        <div className="flex flex-col border-b border-gray-200 lg:border-0">
          <nav aria-label="Offers" className="order-last lg:order-first">
            <div className="mx-auto max-w-7xl lg:px-8">
              <ul
                role="list"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:mb-8"
              >
                {offers.map((offer, index) => (
                  <motion.li
                    key={offer.name}
                    className="flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <motion.a
                      href={offer.href}
                      className="relative flex flex-1 flex-col justify-center bg-white py-6 px-4 text-center focus:z-10 hover:bg-gray-50 transition duration-300 rounded-lg shadow-md"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <p className="text-3xl mb-2">{offer.icon}</p>
                      <p className="text-sm text-gray-500">{offer.name}</p>
                      <p className="font-semibold text-gray-900">
                        {offer.description}
                      </p>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute hidden h-full w-1/2 bg-gray-100 lg:block"
            />
            <div className="relative bg-gray-100 lg:bg-transparent">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
                <div className="mx-auto max-w-2xl py-24 lg:max-w-none lg:py-64">
                  <div className="lg:pr-16">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-4xl font-bold tracking-tight mt-5 text-gray-900 sm:text-5xl xl:text-6xl"
                    >
                      Shop with confidence
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="mt-4 text-xl text-gray-600"
                    >
                      New products are added every week. Check back often to see
                      what's new!
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="mt-6"
                    >
                      <motion.a
                        href="#"
                        className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 font-medium text-white hover:bg-indigo-700 transition duration-300"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Shop Productivity
                      </motion.a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-48 w-full sm:h-64 lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-1/2">
              <LazyImage
                src="https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg?cs=srgb&dl=pexels-willoworld-3768005.jpg&fm=jpg"
                alt="Productivity tools"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden">
          {/* Sale */}
          <motion.section
            aria-labelledby="sale-heading"
            className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                id="sale-heading"
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
              >
                Get 25% off during our one-time sale
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mx-auto mt-4 max-w-xl text-xl text-gray-600"
              >
                Most of our products are limited releases that won't come back.
                Get your favorite items while they're in stock.
              </motion.p>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                href="#"
                className="mt-6 inline-block w-full rounded-md border border-transparent bg-gray-900 py-3 px-8 font-medium text-white hover:bg-gray-800 transition duration-300 sm:w-auto"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get access to our one-time sale
              </motion.a>
            </div>
          </motion.section>
        </div>
      </main>
      <main>
        {/* Category section */}
        <motion.section
          aria-labelledby="category-heading"
          className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
            <h2
              id="category-heading"
              className="text-2xl font-bold tracking-tight text-gray-900"
            >
              Shop by Category
            </h2>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/all-categories"
                className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block transition duration-300"
              >
                Browse all categories
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </motion.div>
          </div>
          {/* home categories */}
          <HomeCategories />
          {/* Browse all categories option for small devices */}
          <motion.div
            className="mt-3 ml-4 sm:hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/all-categories"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition duration-300"
            >
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </motion.div>
        </motion.section>

        {/* Home trending products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HomeProductTrending />
        </motion.div>

        {/* Newsletter subscription */}
        <motion.section
          className="bg-white py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Subscribe to our newsletter
            </h2>
            <div className="flex justify-center">
              <NewsletterForm />
            </div>
          </div>
        </motion.section>

        {/* Perks */}
        <motion.section
          aria-labelledby="perks-heading"
          className="border-t border-gray-200 bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 id="perks-heading" className="sr-only">
            Our perks
          </h2>

          <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
              {perks.map((perk, index) => (
                <motion.div
                  key={perk.name}
                  className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="md:flex-shrink-0">
                    <div className="flow-root">
                      <img
                        className="-my-1 mx-auto h-24 w-auto"
                        src={perk.imageUrl}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                    <h3 className="text-base font-medium text-gray-900">
                      {perk.name}
                    </h3>
                    <p className="mt-3 text-sm text-gray-500">
                      {perk.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
}
