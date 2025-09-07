"use client";
import React, { useState } from 'react';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (activeTab === "login") {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });
    const data = await res.json();
    console.log("Login response:", data);
    if (res.ok) {
      alert(`Welcome back, ${data.user.name}`);
    } else {
      alert(data.error);
    }
  } else {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });
    const data = await res.json();
    console.log("Register response:", data);
    if (res.ok) {
      alert("Account created! Please log in.");
      setActiveTab("login");
    } else {
      alert(data.error);
    }
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 font-medium transition-colors ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-4 font-medium transition-colors ${activeTab === 'signup' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>

          <form onSubmit={handleSubmit}>
            {activeTab === 'signup' && (
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter your name"
                />
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter your password"
              />
            </div>

            {activeTab === 'signup' && (
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Confirm your password"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition shadow-md hover:shadow-lg"
            >
              {activeTab === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                className="text-blue-600 font-semibold hover:text-blue-800"
                onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
              >
                {activeTab === 'login' ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default Auth;