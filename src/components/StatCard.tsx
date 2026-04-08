import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  suffix?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, suffix }) => (
  <div className="relative group p-4 px-5 rounded-2xl bg-white/5 border border-white/10 overflow-visible transition-all duration-500 hover:border-heritage-accent/30 backdrop-blur-2xl h-full flex flex-col justify-center">
    <div className="absolute inset-0 bg-radial-gradient from-heritage-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none" />
    <div className="text-3xl font-black text-white mb-0.5 tracking-tight">{value}<span className="text-heritage-accent">{suffix}</span></div>
    <div className="text-[11px] font-bold text-heritage-platinum/50 uppercase tracking-[0.2em]">{label}</div>
  </div>
);

export const MissionCard = ({ icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center gap-4 p-3 px-5 rounded-xl bg-white/5 border border-white/10 w-full group transition-all duration-300 hover:bg-white/10 hover:border-white/20">
    <span className="text-heritage-platinum/40 group-hover:text-heritage-accent transition-colors scale-110">{icon}</span>
    <span className="text-xs font-bold text-heritage-platinum/70 tracking-wide group-hover:text-white transition-colors">{text}</span>
  </div>
);
