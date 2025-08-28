
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center py-20 px-4">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-6 leading-tight drop-shadow-lg">
            The Ultimate Dashboard for Modern Education
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Streamline assignments, submissions, and communication for students, teachers, and admins—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Link to="/signup" className="inline-block bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-800 transition">Get Started Free</Link>
            <Link to="/login" className="inline-block border border-blue-700 text-blue-700 px-8 py-3 rounded-xl font-bold text-lg shadow hover:bg-blue-50 transition">Login</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition">
              <div className="text-4xl mb-3 text-blue-600">🎓</div>
              <h3 className="font-bold text-xl mb-2">For Students</h3>
              <p className="text-gray-600">Easily submit assignments, track your progress, and stay connected with your teachers.</p>
            </div>
            <div className="bg-green-50 rounded-xl p-6 shadow hover:shadow-lg transition">
              <div className="text-4xl mb-3 text-green-600">👩‍🏫</div>
              <h3 className="font-bold text-xl mb-2">For Teachers</h3>
              <p className="text-gray-600">Create assignments, review student work, and provide feedback efficiently.</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6 shadow hover:shadow-lg transition">
              <div className="text-4xl mb-3 text-yellow-600">🛡️</div>
              <h3 className="font-bold text-xl mb-2">For Admins</h3>
              <p className="text-gray-600">Manage users, oversee all activities, and ensure a smooth workflow for everyone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-blue-100 to-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow">
              <p className="text-gray-700 italic mb-3">“This dashboard made submitting assignments so much easier and less stressful!”</p>
              <div className="font-bold text-blue-700">— Ayesha, Student</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <p className="text-gray-700 italic mb-3">“I can manage all my classes and feedback in one place. Highly recommended!”</p>
              <div className="font-bold text-green-700">— Mr. Khan, Teacher</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <p className="text-gray-700 italic mb-3">“The admin tools are powerful and easy to use. Our workflow is so much smoother now.”</p>
              <div className="font-bold text-yellow-700">— Admin Team</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <p className="text-gray-700 italic mb-3">“A must-have for any modern educational institution.”</p>
              <div className="font-bold text-blue-700">— Principal</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-blue-700">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-blue-100 mb-6">Join us today and experience a smarter way to manage education for everyone.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Link to="/signup" className="inline-block bg-white text-blue-700 px-8 py-3 rounded-xl font-bold text-lg shadow hover:bg-blue-100 transition">Sign Up Now</Link>
            <Link to="/login" className="inline-block border border-white text-white px-8 py-3 rounded-xl font-bold text-lg shadow hover:bg-blue-600 transition">Login</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
