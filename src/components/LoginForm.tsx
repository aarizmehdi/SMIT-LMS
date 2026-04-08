import React from 'react';

export const LoginForm = () => (
  <div className="w-full max-w-[420px] space-y-12">
    <div className="space-y-3">
      <h2 className="text-5xl font-black text-white tracking-tight">Sign In</h2>
      <p className="text-heritage-platinum/60 font-medium">Access your professional student portal</p>
    </div>

    <form className="space-y-8">
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-heritage-platinum/40 uppercase tracking-[0.2em] pl-1">CNIC Number</label>
        <input 
          type="text" 
          placeholder="17301-xxxxxxx-x" 
          className="w-full h-16 px-6 rounded-2xl bg-white/5 border border-white/10 font-medium text-white transition-all focus:border-heritage-accent focus:ring-4 focus:ring-heritage-accent/10 outline-none hover:bg-white/10"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-bold text-heritage-platinum/40 uppercase tracking-[0.2em] pl-1">Password</label>
        <input 
          type="password" 
          placeholder="••••••••" 
          className="w-full h-16 px-6 rounded-2xl bg-white/5 border border-white/10 font-medium text-white transition-all focus:border-heritage-accent focus:ring-4 focus:ring-heritage-accent/10 outline-none hover:bg-white/10"
        />
      </div>

      <button className="heritage-button w-full h-16 text-lg">
        Sign In &rarr;
      </button>
    </form>

    <div className="text-center pt-4">
      <p className="text-sm text-heritage-platinum/40 font-medium">
        First time here? <a href="#" className="text-heritage-accent hover:text-white transition-colors font-bold">Request Student Credentials</a>
      </p>
    </div>
  </div>
);
