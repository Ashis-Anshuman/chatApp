import React, { useState } from 'react';
import { Link } from 'react-router';
import { User, Mail, Lock, AtSign, ArrowRight, Fingerprint, Shield, MessageCircle, LoaderIcon, Eye, EyeOff} from 'lucide-react';
import BorderAnimation from '../components/BorderAnimation';
import { useUserAuthStore } from '../store/userAuthStore';


const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const {signUp, isSigningUp, pendingEmail, verifyOtp, showOtp, isValidingOtp} = useUserAuthStore();

  const [otp, setOtp] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    
   signUp(formData);

  };

  const handleVerifyOtp = async (e) => {
  e.preventDefault();

  console.log("OTP:", otp);

   verifyOtp({
    email: pendingEmail,
    otpCode: otp
  });
};
  return (
    <div className="min-h-{98vh} flex items-center justify-center px-4">
    <BorderAnimation>
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-3xl bg-slate-900/40 backdrop-blur-2xl shadow-2xl shadow-blue-500/10">
        
        {/* Left Panel */}
        <div className="hidden lg:flex lg:col-span-4 bg-blue-600/10 p-10 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full -mr-16 -mt-16"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
              <span className="text-xs font-mono text-blue-400 tracking-[0.3em]">
                SECURE_LINK
              </span>
            </div>

            <div className="mb-8 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full"></div>
                  <MessageCircle size={60} className="text-blue-500" />
              </div>
            </div>

            <h2 className="text-4xl font-black text-white leading-tight uppercase italic">
              Join the <br /> <span className="text-blue-500">chatapp</span>
            </h2>

            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Connect to the encrypted chat protocol. Your data is protected by end-to-end neural layers.
            </p>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3 text-slate-300 text-xs font-mono">
              <Shield size={14} className="text-blue-500" /> AES-256 ACTIVE
            </div>
            <div className="flex items-center gap-3 text-slate-300 text-xs font-mono">
              <Fingerprint size={14} className="text-blue-500" /> BIOMETRIC READY
            </div>
          </div>
        </div>

        {/* Right Panel: The Form */}
        <div className="lg:col-span-8 p-8 md:p-12">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Create Identity</h3>
              <p className="text-slate-500 text-sm">Step into the digital void.</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">System Status</p>
              <p className="text-[10px] text-green-500 font-mono uppercase animate-pulse">● Online</p>
            </div>
          </div>

          {!false ? (         //instead of false use showOtp from store to toggle between forms
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-slate-400 text-[10px] font-mono uppercase">Full Name</span>
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    className="input w-full bg-slate-950/50 border-none ring-1 ring-slate-800 focus:ring-2 focus:ring-blue-500 pl-10 text-white transition-all"
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-slate-400 text-[10px] font-mono uppercase">Email Address</span>
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    placeholder="protocol@nexus.com"
                    className="input w-full bg-slate-950/50 border-none ring-1 ring-slate-800 focus:ring-2 focus:ring-blue-500 pl-10 text-white transition-all"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-slate-400 text-[10px] font-mono uppercase">Access Key</span>
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    placeholder="••••••••"
                    className="input w-full bg-slate-950/50 border-none ring-1 ring-slate-800 focus:ring-2 focus:ring-blue-500 pl-10 text-white transition-all"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-blue-500 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                <Link to="/login" className="text-slate-500 hover:text-white text-sm transition-colors order-2 sm:order-1">
                  Already a user? <span className="text-blue-500 font-bold">Log In</span>
                </Link>
                
                <button type='submit' disabled={isSigningUp} className="btn btn-primary bg-blue-600 hover:bg-blue-500 border-none text-white px-8 rounded-xl group order-1 sm:order-2 w-full sm:w-auto">
                  {isSigningUp ? <LoaderIcon size={16} className="ml-2 animate-spin inline-block"/> : "Create Identity"}
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>

          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white">
                  Verify Your Email
                </h3>
                <p className="text-slate-400 text-sm">
                  Enter the OTP sent to your email
                </p>
              </div>

              <div className="form-control">
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="input w-full text-center tracking-[0.4em] text-lg bg-slate-950/50 border-none ring-1 ring-slate-800 focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>

              <button
                type="submit"
                disabled = {isValidingOtp}
                className="btn btn-primary bg-blue-600 hover:bg-blue-500 border-none w-full rounded-xl"
              >
                {isValidingOtp ? <LoaderIcon size={16} className="ml-2 animate-spin inline-block"/> : "Validate OTP"}
              </button>

            </form>
          ) }
        </div>
      </div>
    </BorderAnimation>
    </div>
  );
};

export default SignUpPage;

