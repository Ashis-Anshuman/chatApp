import React, { useState } from "react";
import { Link } from "react-router";
import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  LoaderIcon,
  Eye,
  EyeOff
} from "lucide-react";
import BorderAnimation from "../components/BorderAnimation";
import { useUserAuthStore } from "../store/userAuthStore";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const {login, isLoggingIn} = useUserAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();

    login(formData);
  };

  return (
    <div className="min-h-{98vh} flex items-center justify-center px-4">
    <BorderAnimation>
    <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-3xl bg-slate-900/40 backdrop-blur-2xl shadow-2xl shadow-blue-500/10">

        {/* Left Panel */}
        <div className="hidden lg:flex lg:col-span-4 bg-blue-600/10 p-10 flex-col justify-between relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full -mb-20 -ml-20"></div>

          <div className="relative z-10">
            {/* Chat Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full"></div>
                  <MessageSquare size={75} className="text-blue-500" />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
              <span className="text-xs font-mono text-blue-400 tracking-[0.3em]">
                AUTH_LAYER
              </span>
            </div>

            <h2 className="text-4xl font-black text-white leading-tight uppercase italic">
              Access the <br />
              <span className="text-blue-500">Network</span>
            </h2>

            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Authenticate to continue encrypted communication inside the Nexus.
            </p>
          </div>

          <div className="flex items-center gap-3 text-slate-300 text-xs font-mono relative z-10">
            <ShieldCheck size={14} className="text-blue-500" />
            ZERO-TRUST VERIFIED
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-8 p-8 md:p-12">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                System Login
              </h3>
              <p className="text-slate-500 text-sm">
                Verify your credentials.
              </p>
            </div>

            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">
                Session
              </p>
              <p className="text-[10px] text-green-500 font-mono uppercase animate-pulse">
                ● Secure
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-slate-400 text-[10px] font-mono uppercase">
                  Email Address
                </span>
              </label>
              <div className="relative group">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="protocol@nexus.com"
                  className="input w-full bg-slate-950/50 border-none ring-1 ring-slate-800 focus:ring-2 focus:ring-blue-500 pl-10 text-white transition-all"
                  onChange={(e)=> setFormData({...formData, email:e.target.value})}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-slate-400 text-[10px] font-mono uppercase">
                  Access Key
                </span>
              </label>
              <div className="relative group">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="••••••••"
                  className="input w-full bg-slate-950/50 border-none ring-1 ring-slate-800 focus:ring-2 focus:ring-blue-500 pl-10 text-white transition-all"
                  onChange={(e)=> setFormData({...formData, password:e.target.value})}
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

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
              <Link
                to="/signup"
                className="text-slate-500 hover:text-white text-sm transition-colors order-2 sm:order-1"
              >
                New here?{" "}
                <span className="text-blue-500 font-bold">Create Identity</span>
              </Link>

              <button type="submit" disabled={isLoggingIn} className="btn btn-primary bg-blue-600 hover:bg-blue-500 border-none text-white px-8 rounded-xl group order-1 sm:order-2 w-full sm:w-auto">
                {isLoggingIn ? <LoaderIcon size={18} className="mr-2 animate-spin"/> : "Authenticate"}
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </BorderAnimation>
    </div>
  );
};

export default LoginPage;
