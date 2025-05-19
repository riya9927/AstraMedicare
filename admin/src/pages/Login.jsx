import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {setAToken,backendUrl}=useContext(AdminContext)

  const onSubmitHandler=async(event)=>{
    event.preventDefault()
    try {
        if(state==='Admin'){
            const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password})
             if (data.success) {
                //  console.log(data.token)
                localStorage.setItem('aToken',data.token)
                setAToken(data.token)
             }else{
                toast.error(data.message)
             }
        }
    } catch (error) {
        
    }
  }

  return (
    <form onSubmit={onSubmitHandler}>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl animate-fade-in transition-all duration-500">
        <div className="flex justify-center mb-6">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-28 h-auto object-contain shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6 animate-slide-in">
          {state} Login
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            onChange={(e)=>setEmail(e.target.value)} value={email}
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
          onChange={(e)=>setPassword(e.target.value)} value={password}
            type="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>

        {/* Login Button */}
        <button onClick={() => navigate('/admin-dashboard')} className="w-full bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300">
          Login
        </button>

        {/* Toggle Login Role */}
        <p className="mt-4 text-center text-sm text-gray-600">
          {state === 'Admin' ? (
            <>
              Doctor Login?{' '}
              <span
                onClick={() => setState('Doctor')}
                className="text-blue-500 font-medium cursor-pointer hover:underline"
              >
                Click Here
              </span>
            </>
          ) : (
            <>
              Admin Login?{' '}
              <span
                onClick={() => setState('Admin')}
                className="text-blue-500 font-medium cursor-pointer hover:underline"
              >
                Click Here
              </span>
            </>
          )}
        </p>
      </div>
    </div>
    </form>
  );
};

export default Login;


// import React, { useState } from 'react';
// import { assets } from '../assets/assets';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login attempt with:', email, password);
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 overflow-hidden">
      

//       {/* Login Card Container */}
//       <div className="z-10 bg-white/90 rounded-xl shadow-2xl p-10 max-w-md w-full backdrop-blur-md border border-gray-200 relative">

//         {/* Logo */}
//         <div className="flex justify-center mb-8">
//           <img 
//             src={assets.logo} 
//             alt="Logo"
//             className="w-20 h-20 object-contain rounded-full shadow-md hover:scale-105 transition-transform duration-300"
//           />
//         </div>

//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* Email */}
//           <div className="relative">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border-b-2 border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:border-blue-600 bg-transparent text-gray-800 placeholder-gray-400"
//               placeholder="Email"
//               required
//             />
//             <div className="absolute left-2 top-2.5 text-gray-400">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                 <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//               </svg>
//             </div>
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border-b-2 border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:border-blue-600 bg-transparent text-gray-800 placeholder-gray-400"
//               placeholder="Password"
//               required
//             />
//             <div className="absolute left-2 top-2.5 text-gray-400">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//               </svg>
//             </div>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold shadow hover:shadow-lg transform hover:-translate-y-0.5"
//           >
//             Login
//           </button>
//         </form>
        
//       </div>
//     </div>
//   );
// };

// export default Login;
