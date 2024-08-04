import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
        <div className="text-black min-h-screen flex py-12 justify-center w-full">
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl font-bold text-red-500 mb-6">
              Personal Expense Tracker
            </h1>
            <p className="text-lg mb-6">
            We are a team of passionate developers committed to helping you
              manage your finances effectively. Our Personal Expense Tracker is
              designed to be user-friendly and efficient, allowing you to keep
              track of your expenses with ease. Join us on this journey to
              financial freedom.
            </p>
            <Link to = "/signup">
            <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600">
              Get Started
            </button>
            </Link>
          </div>

         
        </div>
    
      <Footer />
    </div>
  );
};

export default LandingPage;
