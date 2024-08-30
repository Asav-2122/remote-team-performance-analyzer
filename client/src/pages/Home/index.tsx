// src/pages/Home.tsx
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="home dark:bg-background-dark dark:text-text-dark">
      {/* Hero Section */}
      <section className="hero bg-primary-dark text-white dark:bg-primary-light p-8 text-center">
        <h1 className="text-4xl font-bold">
          Welcome to Remote Team Performance Analyzer
        </h1>
        <p className="mt-4 text-lg">
          Optimize your remote team's productivity with our powerful tools.
        </p>
        <button className="cta-button mt-6 bg-secondary-dark text-white dark:bg-secondary-light px-4 py-2 rounded">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="features grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        <div className="feature-card bg-light dark:bg-dark p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold">Performance Tracking</h3>
          <p>Track tasks and deadlines efficiently.</p>
        </div>
        <div className="feature-card bg-light dark:bg-dark p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold">Communication Analysis</h3>
          <p>Analyze team interactions for better collaboration.</p>
        </div>
        <div className="feature-card bg-light dark:bg-dark p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold">AI Recommendations</h3>
          <p>Receive AI-powered suggestions for team improvement.</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats bg-gray-100 dark:bg-gray-800 p-8 text-center">
        <h2 className="text-2xl font-bold">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="stat-card bg-white dark:bg-gray-900 p-6 rounded shadow-md">
            <p className="text-3xl font-bold">1000+</p>
            <span className="text-gray-600 dark:text-gray-400">
              Teams Optimized
            </span>
          </div>
          <div className="stat-card bg-white dark:bg-gray-900 p-6 rounded shadow-md">
            <p className="text-3xl font-bold">5000+</p>
            <span className="text-gray-600 dark:text-gray-400">
              Tasks Completed
            </span>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials p-8 text-center">
        <h2 className="text-2xl font-bold">What Our Users Say</h2>
        <div className="testimonial-card bg-light dark:bg-dark p-6 rounded shadow-md mt-4">
          <p>"This tool transformed our remote work experience!"</p>
          <span className="text-gray-600 dark:text-gray-400">- Jane Doe</span>
        </div>
      </section>
    </div>
  );
};

export default Home;
