import React, { useState } from 'react';
import { Mail,Lock, User } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="flex w-full max-w-[1000px] bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Panel */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 p-12 flex-col justify-between text-white">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              {isLogin ? 'Welcome Back!' : 'Join Us!'}
            </h2>
            <p className="text-blue-100 mb-8">
              {isLogin 
                ? 'To keep connected with us please login with your personal info'
                : 'Start your journey to better healthcare with AstraMedicare'}
            </p>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              {isLogin ? 'SIGN UP' : 'SIGN IN'}
            </button>
          </div>
          <div className="text-sm text-blue-200">
            © 2025 AstraMedicare. All rights reserved.
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">
            {isLogin ? 'Sign in to AstraMedicare' : 'Create Account'}
          </h3>

          {/* Social Login */}
          <div className="flex justify-center gap-4 mb-8">
            <SocialButton icon={<FaGoogle size={20} />} />
          </div>

          <div className="text-center text-gray-500 mb-8">
            or use your email for {isLogin ? 'login' : 'registration'}:
          </div>

          <form className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  Forgot Password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              {isLogin ? 'SIGN IN' : 'SIGN UP'}
            </button>
          </form>

          {/* Mobile Toggle */}
          <div className="mt-8 text-center md:hidden">
            <p className="text-gray-600 mb-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({ icon }) => {
  return (
    <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-300">
      {icon}
    </button>
  );
};

export default Login;
