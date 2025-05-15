import React, { useState, useContext, useEffect } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? '/api/user/login' : '/api/user/register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const { data } = await axios.post(backendUrl + url, payload);

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="flex w-full max-w-[1000px] bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Left Panel */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 text-white p-10 flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              {isLogin ? 'Welcome Back!' : 'Join Us!'}
            </h2>
            <p className="text-blue-100 mb-8">
              {isLogin
                ? 'Login to access your appointments.'
                : 'Create an account to get started.'}
            </p>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: '', email: '', password: '' });
              }}
              className="px-6 py-2 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition"
            >
              {isLogin ? 'SIGN UP' : 'SIGN IN'}
            </button>
          </div>
          <div className="text-sm text-blue-200">© 2025 YourCompany</div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">
            {isLogin ? 'Login to Your Account' : 'Create Your Account'}
          </h3>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          {/* Mobile Toggle */}
          <div className="mt-6 text-center md:hidden">
            <p className="text-gray-600 mb-2">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: '', email: '', password: '' });
              }}
              className="text-blue-600 hover:underline font-medium"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;



// import React, { useState, useContext } from 'react';
// import { AppContext } from '../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// const Login = () => {
//   const [state, setState] = useState('Sign Up');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate=useNavigate()
//   const [name, setName] = useState('');
//   const { backendUrl, token, setToken } = useContext(AppContext)

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     // Handle submission logic here
//     try {
//       if (state === 'Sign Up') {
//         const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })
//         if (data.success) {
//           localStorage.setItem('token', data.token)
//           setToken(data.token)
//         } else {
//           toast.error(data.message)
//         }
//       } else {
//         const { data } = await axios.post(backendUrl + '/api/user/login', { password, email })
//         if (data.success) {
//           localStorage.setItem('token', data.token)
//           setToken(data.token)
//         } else {
//           toast.error(data.message)
//         }
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   };

//   useEffect(()=>{
//     if(token){
//       navigate('/')
//     }
//   },[token])

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="min-h-screen flex items-center justify-center bg-gray-100"
//     >
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
//         <h2 className="text-2xl font-bold text-center mb-2">
//           {state === 'Sign Up' ? 'Create Account' : 'Login'}
//         </h2>
//         <p className="text-sm text-gray-500 text-center mb-6">
//           Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment
//         </p>

//         {state === 'Sign Up' && (
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Full Name</label>
//             <input
//               type="text"
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               required
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         )}

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="email"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-1">Password</label>
//           <input
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
//         >
//           {state === 'Sign Up' ? 'Create Account' : 'Login'}
//         </button>

//         <p className="mt-4 text-sm text-center text-gray-600">
//           {state === 'Sign Up' ? (
//             <>
//               Already have an account?{' '}
//               <span
//                 onClick={() => setState('Login')}
//                 className="text-blue-600 cursor-pointer hover:underline"
//               >
//                 Login here
//               </span>
//             </>
//           ) : (
//             <>
//               Don’t have an account?{' '}
//               <span
//                 onClick={() => setState('Sign Up')}
//                 className="text-blue-600 cursor-pointer hover:underline"
//               >
//                 Click here
//               </span>
//             </>
//           )}
//         </p>
//       </div>
//     </form>
//   );
// };

// export default Login;


// import React, { useState, useContext } from 'react';
// import { Mail, Lock, User } from 'lucide-react';
// import { FaGoogle } from 'react-icons/fa';
// import { AppContext } from '../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const { backendUrl, setToken } = useContext(AppContext);
//   const navigate = useNavigate();

//   // Form states
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });

//     // Clear error when user types
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: ''
//       });
//     }
//   };

//   // Form validation
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     }

//     if (!isLogin && !formData.name) {
//       newErrors.name = 'Name is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsLoading(true);

//     try {
//       let response;

//       if (isLogin) {
//         // Login request
//         response = await axios.post(`${backendUrl}/api/user/login`, {
//           email: formData.email,
//           password: formData.password
//         });
//       } else {
//         // Register request
//         response = await axios.post(`${backendUrl}/api/user/register`, {
//           name: formData.name,
//           email: formData.email,
//           password: formData.password
//         });
//       }

//       if (response.data.success) {
//         const { token } = response.data;

//         // Save token to context
//         setToken(token);

//         // Save token to localStorage if remember me is checked
//         if (rememberMe) {
//           localStorage.setItem('astraMedicareToken', token);
//         } else {
//           // Use sessionStorage for session-only storage
//           sessionStorage.setItem('astraMedicareToken', token);
//         }

//         // toast.success(isLogin ? 'Successfully logged in!' : 'Account created successfully!');
//         navigate('/'); // Navigate to dashboard or home page
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error('Auth error:', error);
//       toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle social login (Google)
//   const handleGoogleLogin = () => {
//     toast.info('Google login integration coming soon!');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
//       <div className="flex w-full max-w-[1000px] bg-white rounded-2xl shadow-xl overflow-hidden">
//         {/* Left Panel */}
//         <div className="hidden md:flex md:w-1/2 bg-blue-600 p-12 flex-col justify-between text-white">
//           <div>
//             <h2 className="text-4xl font-bold mb-6">
//               {isLogin ? 'Welcome Back!' : 'Join Us!'}
//             </h2>
//             <p className="text-blue-100 mb-8">
//               {isLogin 
//                 ? 'To keep connected with us please login with your personal info'
//                 : 'Start your journey to better healthcare with AstraMedicare'}
//             </p>
//             <button 
//               onClick={() => {
//                 setIsLogin(!isLogin);
//                 setErrors({});
//                 setFormData({ name: '', email: '', password: '' });
//               }}
//               className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-300"
//             >
//               {isLogin ? 'SIGN UP' : 'SIGN IN'}
//             </button>
//           </div>
//           <div className="text-sm text-blue-200">
//             © 2025 AstraMedicare. All rights reserved.
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="w-full md:w-1/2 p-8 md:p-12">
//           <h3 className="text-2xl font-bold text-gray-800 mb-8">
//             {isLogin ? 'Sign in to AstraMedicare' : 'Create Account'}
//           </h3>

//           {/* Social Login */}
//           <div className="flex justify-center gap-4 mb-8">
//             <SocialButton icon={<FaGoogle size={20} />} onClick={handleGoogleLogin} />
//           </div>

//           <div className="text-center text-gray-500 mb-8">
//             or use your email for {isLogin ? 'login' : 'registration'}:
//           </div>

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {!isLogin && (
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Name"
//                   className={`w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
//                 />
//                 {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//               </div>
//             )}

//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 className={`w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
//               />
//               {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//             </div>

//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className={`w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
//               />
//               {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//             </div>

//             {isLogin && (
//               <div className="flex items-center justify-between text-sm">
//                 <label className="flex items-center">
//                   <input 
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={() => setRememberMe(!rememberMe)} 
//                     className="mr-2" 
//                   />
//                   Remember me
//                 </label>
//                 <a href="#" className="text-blue-600 hover:text-blue-700">
//                   Forgot Password?
//                 </a>
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 rounded-lg transition-colors duration-300 flex items-center justify-center`}
//             >
//               {isLoading ? 'Processing...' : isLogin ? 'SIGN IN' : 'SIGN UP'}
//             </button>
//           </form>

//           {/* Mobile Toggle */}
//           <div className="mt-8 text-center md:hidden">
//             <p className="text-gray-600 mb-4">
//               {isLogin ? "Don't have an account?" : "Already have an account?"}
//             </p>
//             <button
//               onClick={() => {
//                 setIsLogin(!isLogin);
//                 setErrors({});
//                 setFormData({ name: '', email: '', password: '' });
//               }}
//               className="text-blue-600 font-semibold hover:text-blue-700"
//             >
//               {isLogin ? 'Sign Up' : 'Sign In'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SocialButton = ({ icon, onClick }) => {
//   return (
//     <button 
//       type="button"
//       onClick={onClick}
//       className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-300"
//     >
//       {icon}
//     </button>
//   );
// };

// export default Login;