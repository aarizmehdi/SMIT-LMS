import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function App() {
   const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');
   const [showPassword, setShowPassword] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [currentView, setCurrentView] = useState('Dashboard');
   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); const [showCopyToast, setShowCopyToast] = useState(false);
   const [dashTab, setDashTab] = useState('Quizzes');
   const [userGender, setUserGender] = useState<'male' | 'female'>('male');
   const [isEditingProfile, setIsEditingProfile] = useState(false);
   const [userProfile, setUserProfile] = useState({
      name: "AARIZ MEHDI",
      aboutMe: "No information provided",
      email: "aarizmehdi100@gmail.com",
      phone: "03109753253",
      address: "Not provided",
      gender: "male",
      dob: "September 5, 2009",
      cnic: "1730157164037",
      qualification: "Not provided",
      isPrivate: true
   });
   const heroRef = useRef<HTMLDivElement>(null);
   const orbRef = useRef<HTMLDivElement>(null);
   const globeRef = useRef<SVGSVGElement>(null);

   // --- KEYBOARD SHORTCUTS (MAGNUM OPUS CONTROL) ---
   useLayoutEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.ctrlKey && e.key === '.') {
            e.preventDefault();
            setIsSidebarCollapsed(prev => !prev);
         }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
   }, []);

   // --- 1. ONE-TIME CINEMATIC ENTRANCE ---
   useLayoutEffect(() => {
      const ctx = gsap.context(() => {
         const entranceTl = gsap.timeline({
            defaults: { ease: 'back.out(1.4)', duration: 1.4 }
         });

         entranceTl.fromTo(".gsap-hero-element",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 1 }
         );

         entranceTl.fromTo(".floating-globe",
            { y: 150, opacity: 0 },
            { y: 0, opacity: 1, duration: 2.5, ease: 'expo.out' },
            "-=1.2"
         );

         entranceTl.fromTo(".slide-from-left",
            { x: -300, rotation: -120, opacity: 0 },
            { x: 0, rotation: 0, opacity: 0.5, duration: 2.8, ease: 'expo.out' },
            "-=2"
         );

         entranceTl.fromTo(".cross-screen-floater-right",
            { x: -150, y: 0, rotation: 90, opacity: 1 },
            { x: 3000, y: 0, rotation: 180, opacity: 0, duration: 2.5, ease: 'power2.in' },
            "0"
         );

         entranceTl.fromTo(".cross-screen-floater-left",
            { x: -1200, rotation: -180, opacity: 0 },
            { x: 0, rotation: -15, opacity: 0.5, duration: 3.5, ease: 'expo.out' },
            "1.0"
         );

         entranceTl.fromTo(".fade-in-floater",
            { opacity: 0 },
            { opacity: 0.5, duration: 3, ease: 'power2.inOut', stagger: 0.3 },
            "-=2"
         );

         entranceTl.fromTo(".gsap-smit-brand",
            { x: 600, rotation: 30, opacity: 0 },
            { x: 0, rotation: -8, opacity: 0.3, duration: 2.5, ease: 'expo.out' },
            "0.6"
         );

         if (globeRef.current) {
            gsap.to(globeRef.current, { rotation: 360, duration: 40, repeat: -1, ease: 'none' });
            gsap.to(globeRef.current, { y: '+=30', duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
         }

         // Initial Counters (triggered once)
         const counters = heroRef.current?.querySelectorAll('.gs-counter');
         counters?.forEach(el => {
            const target = parseInt(el.getAttribute('data-target') || "0");
            const finalVal = target >= 1000 ? target / 1000 : target;
            const displaySuffix = target >= 1000 ? 'K+' : (el.getAttribute('data-suffix') || '+');

            gsap.to({}, {
               duration: 3.5,
               ease: "power2.out",
               onUpdate: function () {
                  const current = Math.floor(this.progress() * finalVal);
                  (el as HTMLElement).innerText = current + displaySuffix;
               }
            });
         });
      });
      return () => ctx.revert();
   }, [activeTab]);

   // --- 2. INTERACTIVE ECOSYSTEM & KINETIC TOGGLE ---
   useLayoutEffect(() => {
      const ctx = gsap.context(() => {
         // Magnetic Stat Cards - Re-implemented strictly for these 4 divs as requested
         const cards = document.querySelectorAll('.magnetic-stat-card');
         cards.forEach(card => {
            const cardEl = card as HTMLElement;
            const moveHandler = (e: MouseEvent) => {
               const r = cardEl.getBoundingClientRect();
               const x = (e.clientX - r.left - r.width / 2) * 0.15;
               const y = (e.clientY - r.top - r.height / 2) * 0.15;
               gsap.to(cardEl, { x, y, duration: 0.6, ease: 'power2.out' });
            };
            const resetHandler = () => gsap.to(cardEl, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });

            cardEl.addEventListener('mousemove', moveHandler);
            cardEl.addEventListener('mouseleave', resetHandler);
         });
         // Holographic Pulsar Kinetic Float
         gsap.to(".pulsar-node", {
            y: "-=6",
            x: "+=2",
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
         });
         gsap.to(".pulsar-node", {
            rotation: 360,
            duration: 8,
            repeat: -1,
            ease: "none"
         });
      });
      return () => ctx.revert();
   }, [activeTab]);

   const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      const loading = document.getElementById('loading-overlay');
      if (loading) {
         loading.style.display = 'flex';
         loading.style.opacity = '1';
         
         const tl = gsap.timeline({
            onComplete: () => {
               setIsLoggedIn(true);
               gsap.to(loading, { opacity: 0, duration: 0.8, onComplete: () => { loading.style.display = 'none'; }});
            }
         });

         tl.fromTo(loading, { opacity: 0 }, { opacity: 1, duration: 0.5 });
         tl.fromTo(".loading-smit-svg path, .loading-smit-svg polyline, .loading-smit-svg line", 
            { strokeDashoffset: 1000 }, 
            { strokeDashoffset: 0, duration: 2, stagger: 0.1, ease: "power2.inOut" }
         );
         tl.fromTo(".loading-scanline", { opacity: 0 }, { opacity: 1, duration: 0.3 }, "-=1.5");
         tl.to(".loading-scanline", { y: 120, duration: 2, repeat: 1, ease: "none" }, "-=1.5");
         tl.fromTo(".loading-progress-bar", { width: "0%" }, { width: "100%", duration: 2.5, ease: "power2.inOut" }, "-=2.5");
         
         const percentEl = document.querySelector('.loading-percentage');
         tl.to({}, { duration: 2.5, onUpdate: function() {
            if (percentEl) {
               percentEl.innerHTML = Math.floor(this.progress() * 100) + "%";
            }
         }}, "-=2.5");

      } else {
         setIsLoggedIn(true);
      }
   };

   const handleLogout = () => {
      const loading = document.getElementById('loading-overlay');
      if (loading) {
         loading.style.display = 'flex';
         gsap.fromTo(loading, { opacity: 0 }, { opacity: 1, duration: 0.8, onComplete: () => {
            setIsLoggedIn(false);
            setCurrentView('Dashboard');
            gsap.to(loading, { opacity: 0, duration: 0.8, delay: 0.5, onComplete: () => {
               loading.style.display = 'none';
            }});
         }});
      } else {
         setIsLoggedIn(false);
         setCurrentView('Dashboard');
      }
   };

   const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
         setShowCopyToast(true); setTimeout(() => setShowCopyToast(false), 2000);
      });
   };

   const [showFeedback, setShowFeedback] = useState(false);
   const [feedbackType, setFeedbackType] = useState<'Bug' | 'Idea' | 'Other'>('Idea');
   const [showNotifs, setShowNotifs] = useState(false);
   const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

   const notifications: any[] = [];
   const pendingAssignments: any[] = [];
   const pendingQuizzes: any[] = [];

   const handleFeedbackSubmit = () => {
      setFeedbackStatus('sending');
      setTimeout(() => {
         setFeedbackStatus('sent');
         setTimeout(() => {
            setShowFeedback(false);
            setFeedbackStatus('idle');
         }, 1500);
      }, 1000);
   };

   useLayoutEffect(() => {
      if (isLoggedIn) {
         const ctx = gsap.context(() => {
            // "Pages don't appear ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â they arrive."
            gsap.fromTo(".arrive-fade",
               { y: 20, opacity: 0 },
               { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power4.out' }
            );
            gsap.fromTo(".arrive-sidebar",
               { x: -30, opacity: 0 },
               { x: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
            );

            // Numbers count up
            const counters = document.querySelectorAll('.count-up');
            counters.forEach(el => {
               const targetStr = el.getAttribute('data-val');
               if (!targetStr) return;
               const target = parseFloat(targetStr);
               const isPerc = el.getAttribute('data-perc');
               const isFormat = el.getAttribute('data-format');

               gsap.to(el, {
                  innerHTML: target,
                  duration: 2.2,
                  ease: 'power3.out',
                  snap: { innerHTML: 1 },
                  onUpdate: function () {
                     let val = Math.floor(Number(this.targets()[0].innerHTML));
                     if (isPerc) {
                        el.innerHTML = val + "%";
                     } else if (isFormat) {
                        el.innerHTML = val + "/" + el.getAttribute('data-format-total');
                     } else {
                        el.innerHTML = String(val);
                     }
                  }
               });
            });

            // Bars grow from zero
            gsap.fromTo(".grow-bar",
               { width: "0%" },
               { width: (i, target) => target.getAttribute('data-width'), duration: 1.8, ease: 'power4.out', delay: 0.2 }
            );

            // Seductive Banner Entrance (Absolute Premium v3)
            gsap.fromTo(".sed-visionary-banner",
               { y: 30, opacity: 0, filter: 'blur(15px)' },
               { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power4.out' }
            );

            gsap.fromTo(".v-quote-animate",
               { x: -20, opacity: 0 },
               { x: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: 'power3.out' }
            );

            gsap.fromTo(".v-sub-animate",
               { x: -15, opacity: 0 },
               { x: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: 'power3.out' }
            );

            // Kinetic Floating SVG Animation
            gsap.to(".sed-floating-svg", {
               y: "random(-20, 20)",
               x: "random(-10, 10)",
               rotation: "random(-5, 5)",
               duration: 6,
               repeat: -1,
               yoyo: true,
               ease: "sine.inOut"
            });

            gsap.to(".sed-floating-svg svg", {
               scale: 1.1,
               opacity: 0.35,
               duration: 4,
               repeat: -1,
               yoyo: true,
               ease: "power1.inOut"
            });

            // Kinetic Orbs
            gsap.to(".orb-1", {
               x: "random(-40, 40)",
               y: "random(-40, 40)",
               duration: 8,
               repeat: -1,
               yoyo: true,
               ease: "sine.inOut"
            });
            gsap.to(".orb-2", {
               x: "random(-30, 30)",
               y: "random(-30, 30)",
               duration: 10,
               repeat: -1,
               yoyo: true,
               ease: "sine.inOut"
            });

            // Seductive Card Entrances
            gsap.fromTo(".sed-card",
               { y: 30, opacity: 0, scale: 0.98 },
               { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
            );

            // Pulse for active day
            gsap.to(".sed-cal-day.active", {
               scale: 1.05,
               duration: 2,
               repeat: -1,
               yoyo: true,
               ease: "sine.inOut"
            });
         });
         return () => ctx.revert();
      }
   }, [isLoggedIn, currentView]);

   if (isLoggedIn) {
      return (
         <div className={`portal-root ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>

            {/* PERSISTENT SIDEBAR - Refined for Magnum Opus */}
            <aside className="portal-sidebar arrive-sidebar">
               <div className="ps-header" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <img src="/smit-logo.png" alt="SMIT" style={{ height: '44px', width: 'auto', objectFit: 'contain' }} />
                  <button
                     className="ps-toggle"
                     onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                     style={{
                        background: 'none',
                        border: 'none',
                        color: '#64748B',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                     }}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <line x1="9" y1="3" x2="9" y2="21" />
                     </svg>
                  </button>
               </div>

               <nav className="ps-nav">
                  <div className="ps-nav-group">
                     {[
                        { id: 'Dashboard', label: 'Dashboard', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg> },
                        { id: 'Progress', label: 'Progress', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg> },
                        { id: 'Attendance', label: 'Attendance', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> },
                        { id: 'Payment', label: 'Payment', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg> },
                        { id: 'Assignment', label: 'Assignment', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
                        { id: 'Quiz', label: 'Quiz', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><path d="M9 14l2 2 4-4" /></svg> }
                     ].map(item => (
                        <button
                           key={item.id}
                           className={`ps-nav-item ${currentView === item.id ? 'active' : ''}`}
                           onClick={() => setCurrentView(item.id)}
                           title={item.label}
                           style={{ gap: '14px' }}
                        >
                           <span className="psni-icon">{item.icon}</span>
                           <span className="ps-name-caps">{item.label}</span>
                           {currentView === item.id && <div className="psni-active-bar" style={{ width: '4px', background: '#1D8ACF' }}></div>}
                        </button>
                     ))}
                  </div>
               </nav>

                <div className="ps-footer-unified">
                   <div className="ps-profile-trigger" onClick={() => setCurrentView('Profile')} title={isSidebarCollapsed ? 'Open Profile' : ''}>
                      <div className="ps-avatar-tiny" style={{ background: '#F8FAFC', border: '1px solid rgba(29, 138, 207, 0.1)', overflow: 'hidden', padding: '1px' }}>
                         {userGender === 'male' ? ( <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#1D8ACF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> ) : ( <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg> )}
                      </div>
                      <span className="ps-name-caps">AARIZ</span>
                   </div>

                   <button className="logout-icon-btn" onClick={handleLogout} title="Terminate Session">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                   </button>
                </div>
            </aside>

            {/* MAIN SHELL */}
            <div className="portal-main">
               <header className="portal-header">
                  <div className="ph-left" style={{ display: 'flex', alignItems: 'center' }}>
                     <div className="ph-breadcrumb">
                        <div className="ph-breadcrumb-item">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                           Home
                        </div>
                        <span className="ph-breadcrumb-sep">/</span>
                        <div className="ph-breadcrumb-item active">
                           Web and Mobile App Development
                        </div>
                     </div>
                  </div>

                  <div className="ph-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                     <button className="ph-feedback-btn-premium" onClick={() => setShowFeedback(true)}>
                        Feedback
                     </button>
                     <div className="ph-notification" onClick={() => setShowNotifs(!showNotifs)} style={{ 
                        background: 'rgba(255, 255, 255, 0.4)', 
                        backdropFilter: 'blur(10px)',
                        padding: '0', 
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px', 
                        border: '1px solid rgba(15, 23, 42, 0.1)', 
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        cursor: 'pointer'
                     }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                        <div className="ph-notif-dot" style={{ 
                           position: 'absolute', 
                           top: '10px', 
                           right: '11px', 
                           width: '8px', 
                           height: '8px', 
                           background: '#EF4444', 
                           borderRadius: '50%',
                           border: '2px solid #FFFFFF',
                           boxShadow: '0 0 0 1.5px #FFFFFF, 0 0 10px rgba(239, 68, 68, 0.5)' 
                        }}></div>

                        {showNotifs && (
                           <div className="notif-dropdown arrive-fade" onClick={(e) => e.stopPropagation()}>
                              <div className="nd-header">Portal Logs</div>
                              <div className="nd-list">
                                 {notifications.length > 0 ? (
                                    notifications.map((n, i) => (
                                       <div key={i} className={`nd-item ${n.unread ? 'unread' : ''}`}>
                                          <div className="nd-icon" style={{ background: 'rgba(29, 138, 207, 0.1)', color: '#1D8ACF' }}>ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â°ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã¢â‚¬Â¹Ãƒâ€¦Ã¢â‚¬Å“</div>
                                          <div className="nd-content">
                                             <strong>{n.title}</strong>
                                             <p>{n.desc}</p>
                                             <span>{n.time}</span>
                                          </div>
                                       </div>
                                    ))
                                 ) : (
                                    <div className="nd-empty" style={{ padding: '32px 20px', textAlign: 'center', color: '#94A3B8' }}>
                                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 8px', opacity: 0.5 }}>
                                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                       </svg>
                                       <p style={{ fontSize: '13px', margin: 0, fontWeight: 500 }}>No recent activity.</p>
                                    </div>
                                 )}
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </header>

               <main className="portal-content-scroll">
                  <div className="portal-content-inner" key={currentView}>

                     {/* === SEDUCTIVE DASHBOARD V2 (FULL PREMIUM) === */}
                     {currentView === 'Dashboard' && (
                        <div className="seductive-dashboard arrive-fade" style={{ display: "flex", gap: "32px", width: "100%", boxSizing: "border-box", maxWidth: "none", padding: "0 8px 40px" }}>

                           {/* LEFT CONTENT AREA */}
                           <div className="sed-main-content">

                              {/* VISIONARY BANNER 3.0 (ULTRA PREMIUM SLIM) */}
                              <div className="sed-visionary-banner sed-shine-wrapper">
                                 <div className="sed-mesh"></div>
                                 <div className="sed-orb orb-1" style={{ top: '-80px', left: '-80px', background: 'radial-gradient(circle, rgba(29, 138, 207, 0.25) 0%, transparent 70%)' }}></div>

                                 {/* KINETIC FLOATING SVG */}
                                 <div className="sed-floating-svg">
                                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                                       <path d="M100 20L120 60H80L100 20Z" fill="white" fillOpacity="0.4" />
                                       <path d="M100 180L80 140H120L100 180Z" fill="white" fillOpacity="0.4" />
                                       <circle cx="100" cy="100" r="40" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="10 5" />
                                       <path d="M40 100H160" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
                                       <path d="M100 40V160" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
                                       <rect x="70" y="70" width="60" height="60" rx="8" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
                                    </svg>
                                 </div>

                                 <div className="sed-content-wrap">
                                    <h2 className="sed-visionary-quote v-quote-animate">
                                       "Your potential is limited only by the depth of your ambition."
                                    </h2>
                                    <p className="sed-visionary-sub v-sub-animate">
                                       Stay driven, Aariz. Your progress is building the foundation for a transformative career.
                                    </p>
                                 </div>
                              </div>

                              {/* METRICS ROW */}
                              <div className="sed-metrics-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', width: '100%', marginBottom: '20px' }}>
                                 {/* Attendance Card */}
                                 <div className="sed-card sed-shine-wrapper sed-shine-item" style={{ padding: '16px 20px', cursor: 'pointer' }} onClick={() => setCurrentView('Attendance')}>
                                    <div className="sed-stat-header" style={{ marginBottom: '14px' }}>
                                       <span className="sed-stat-label">Attendance</span>
                                       <div className="sed-stat-icon" style={{ background: 'rgba(16, 185, 129, 0.08)', color: '#10B981', width: '32px', height: '32px' }}>
                                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                       </div>
                                    </div>
                                    <div className="sed-stat-value" style={{ fontWeight: 450, fontSize: '34px' }}>
                                       <span className="count-up" data-val="24" data-format="true" data-format-total="37">0</span>
                                    </div>
                                 </div>

                                 {/* Assignment Card */}
                                 <div className="sed-card sed-shine-wrapper sed-shine-item" style={{ padding: '16px 20px', cursor: 'pointer' }} onClick={() => setCurrentView('Assignment')}>
                                    <div className="sed-stat-header" style={{ marginBottom: '14px' }}>
                                       <span className="sed-stat-label">Assignment</span>
                                       <div className="sed-stat-icon" style={{ background: 'rgba(139, 92, 246, 0.08)', color: '#8B5CF6', width: '32px', height: '32px' }}>
                                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                                       </div>
                                    </div>
                                    <div className="sed-stat-value" style={{ fontWeight: 450, fontSize: '34px' }}>
                                       <span className="count-up" data-val="0" data-format="true" data-format-total="0">0</span>
                                    </div>
                                 </div>
                              </div>

                              {/* FULL-WIDTH FEE LEDGER (Tightened Gaps) */}
                              <div className="sed-card sed-fee-card" style={{ padding: '16px 32px 24px', width: '100%', boxSizing: 'border-box' }}>
                                 <div className="sed-stat-header" style={{ marginBottom: '12px' }}>
                                    <span className="sed-stat-label">Fee Details</span>
                                 </div>
                                 <div className="sed-table-container">
                                    <table className="sed-table" style={{ width: '100%' }}>
                                       <thead>
                                          <tr>
                                             <th>Month</th>
                                             <th>Amount</th>
                                             <th>Due date</th>
                                             <th>Voucher ID</th>
                                             <th className="hide-mobile">1Bill/Inv</th>
                                             <th>Status</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr>
                                             <td style={{ fontWeight: 700, whiteSpace: "nowrap" }}>Apr 2026</td>
                                             <td style={{ fontWeight: 800, color: "#1D8ACF", whiteSpace: "nowrap" }}>Rs: 1000 /-</td>
                                             <td style={{ fontWeight: 450, whiteSpace: "nowrap" }}>08-Apr-2026</td>
                                             <td style={{ fontWeight: 700, fontFamily: "monospace", fontSize: "12px", whiteSpace: "nowrap" }}><div style={{ display: "flex", alignItems: "center", gap: "8px" }}>202604433008<button className="sed-copy-btn" title="Copy ID" onClick={() => { navigator.clipboard.writeText("202604433008"); setShowCopyToast(true); setTimeout(() => setShowCopyToast(false), 2000); }} style={{ padding: 0, margin: 0, display: "flex", background: "none", border: "none", outline: "none", cursor: "pointer", color: "#64748B", transition: "color 0.2s" }}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.8 }}><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                             </button></div></td>
                                             <td className="hide-mobile" style={{ fontWeight: 450, color: '#64748B' }}>N/A</td>
                                             <td><span className="sed-status-badge sed-status-pending">PENDING</span></td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>

                           {/* RIGHT PANEL AREA */}
                           <aside className="sed-right-panel" style={{ width: "340px", flexShrink: 0 }}>
                              {/* Schedule Card */}
                              <div className="sed-card sed-schedule-card" style={{ padding: '14px 20px' }}>
                                 <div className="sed-stat-header" style={{ marginBottom: '10px' }}>
                                    <span className="sed-stat-label">Schedule</span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D8ACF" strokeWidth="3"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                 </div>
                                 <div className="sed-cal-grid" style={{ gap: '4px', marginBottom: '8px' }}>
                                    {[
                                       { d: 'S', n: '05' }, { d: 'M', n: '06' }, { d: 'T', n: '07' },
                                       { d: 'W', n: '08', active: true }, { d: 'T', n: '09', active: true },
                                       { d: 'F', n: '10' }, { d: 'S', n: '11' }
                                    ].map((day, i) => (
                                       <div key={i} className={`sed-cal-day ${day.active ? 'active' : ''}`} style={{ padding: '4px 0', fontSize: '10px' }}>
                                          <span style={{ fontSize: '8px', opacity: 0.6, display: 'block', marginBottom: '2px' }}>{day.d}</span>
                                          <span style={{ fontWeight: 800 }}>{day.n}</span>
                                       </div>
                                    ))}
                                 </div>
                                 <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(15, 23, 42, 0.05)', fontSize: '11px', color: '#64748B', fontWeight: 800, display: 'flex', alignItems: 'center', letterSpacing: '0.2px', textTransform: 'uppercase' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                       <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#1D8ACF' }}></div>
                                       Wed/Thu 06-08 PM
                                    </div>
                                 </div>
                              </div>

                              {/* Interactive Tabs Card */}
                              <div className="sed-card sed-tabs-card">
                                 <div className="sed-tabs-nav">
                                    {['Assignments', 'Quizzes', 'Events'].map(tab => (
                                       <div
                                          key={tab}
                                          className={`sed-tab-item ${dashTab === tab ? 'active' : ''}`}
                                          onClick={() => setDashTab(tab)}
                                          style={{ cursor: 'pointer' }}
                                       >
                                          {tab}
                                       </div>
                                    ))}
                                 </div>
                                 <div className="sed-empty-state arrive-fade" key={dashTab}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto 6px', display: 'block', opacity: 0.15 }}>
                                       <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                                    </svg>
                                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>No pending {dashTab.toLowerCase().slice(0, -1)}s</div>
                                 </div>
                              </div>

                              {/* ENROLLED COURSE (Sidebar Integrated) */}
                              <div className="sed-card sed-sidebar-course sed-shine-wrapper sed-shine-item">
                                 <h3 className="sed-sbc-title">Web and Mobile App Development</h3>
                                 <div className="sed-sbc-badges">
                                    <span className="sed-sbc-badge enrolled">Enrolled</span>
                                    <span className="sed-sbc-badge code">WMAD</span>
                                 </div>
                                 <div className="sed-sbc-info-grid">
                                    <div className="sed-sbc-item">
                                       <span className="sed-sbc-label">Batch</span>
                                       <span className="sed-sbc-val">Batch 04</span>
                                    </div>
                                    <div className="sed-sbc-item">
                                       <span className="sed-sbc-label">Roll</span>
                                       <span className="sed-sbc-val">433008</span>
                                    </div>
                                    <div className="sed-sbc-item">
                                       <span className="sed-sbc-label">City</span>
                                       <span className="sed-sbc-val">Peshawar</span>
                                    </div>
                                    <div className="sed-sbc-item">
                                       <span className="sed-sbc-label">Schedule </span>
                                       <span className="sed-sbc-val">W/T 06-08 PM</span>
                                    </div>
                                    <div className="sed-sbc-full-item" style={{ paddingTop: '10px', marginTop: '4px' }}>
                                       <span className="sed-sbc-label" style={{ display: 'inline', marginRight: '6px' }}>Campus:</span>
                                       <span className="sed-sbc-val" style={{ fontSize: '10px', display: 'inline' }}>Mohsin and Huma Campus</span>
                                    </div>
                                 </div>
                              </div>
                           </aside>

                        </div>
                     )}

                     {/* === ATTENDANCE === */}
                     {currentView === 'Attendance' && (
                        <div className="arrive-fade">
                           
                           {/* COMPACT STATS GRID */}
                           <div className="att-stat-grid">
                              <div className="att-stat-card blue sed-shine-wrapper sed-shine-item">
                                 <span className="att-stat-lbl">Total Classes</span>
                                 <div className="att-stat-val"><span className="count-up" data-val="37">0</span></div>
                                 <span className="att-stat-sub">Across full term</span>
                              </div>
                              <div className="att-stat-card green sed-shine-wrapper sed-shine-item">
                                 <span className="att-stat-lbl">Present</span>
                                 <div className="att-stat-val"><span className="count-up" data-val="24">0</span></div>
                                 <span className="att-stat-sub" style={{ color: '#10B981' }}>Current status</span>
                              </div>
                              <div className="att-stat-card orange sed-shine-wrapper sed-shine-item">
                                 <span className="att-stat-lbl">Leave</span>
                                 <div className="att-stat-val"><span className="count-up" data-val="0">0</span></div>
                                 <span className="att-stat-sub">Total leave</span>
                              </div>
                              <div className="att-stat-card red sed-shine-wrapper sed-shine-item">
                                 <span className="att-stat-lbl">Absent</span>
                                 <div className="att-stat-val"><span className="count-up" data-val="13">0</span></div>
                                 <span className="att-stat-sub" style={{ color: '#EF4444' }}>Total absent</span>
                              </div>
                           </div>

                           {/* SLIM INTEL CARD */}
                           <div className="att-intel-card sed-shine-wrapper sed-shine-item">
                              <div>
                                 <span className="att-intel-label">Attendance Summary</span>
                                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#D97706', fontSize: '13px', fontWeight: 800 }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                    Alert: Your attendance is under 75%
                                 </div>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                                 <div className="att-prog-track">
                                    <div className="att-prog-fill grow-bar" style={{ background: 'linear-gradient(90deg, #EF4444, #F59E0B)' }} data-width="64.8%"></div>
                                 </div>
                                 <span style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Percentage: 64.8%</span>
                              </div>
                           </div>

                           <div className="att-log-card">
                              <div className="tc-header" style={{ marginBottom: '12px' }}>
                                 <h3 className="tc-title">Records</h3>
                                 <select className="tc-select" style={{ border: '1px solid rgba(15,23,42,0.1)', borderRadius: '10px', fontSize: '12px', fontWeight: 700, height: '32px', padding: '0 10px' }}><option>April 2026</option></select>
                              </div>
                              <table className="data-table">
                                 <thead>
                                    <tr>
                                       <th style={{ width: '40px' }}>#</th>
                                       <th>Date</th>
                                       <th style={{ textAlign: 'right' }}>Status</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {[
                                       { id: 1, date: 'Wednesday, April 1, 2026', status: 'PRESENT' },
                                       { id: 2, date: 'Thursday, April 2, 2026', status: 'PRESENT' }
                                    ].map(row => (
                                       <tr key={row.id}>
                                          <td style={{ color: '#94A3B8', fontWeight: 700 }}>{row.id}</td>
                                          <td style={{ color: '#0F172A', fontWeight: 800 }}>{row.date}</td>
                                          <td style={{ textAlign: 'right' }}>
                                             <span className={`att-badge ${row.status.toLowerCase()}`}>{row.status}</span>
                                          </td>
                                       </tr>
                                     ))}
                                  </tbody>
                               </table>
                            </div>
                         </div>
                      )}

                     {/* === PAYMENT === */}
                     {currentView === 'Payment' && (
                        <div className="arrive-fade">
                            {/* PREMIUM SETTLEMENT PROTOCOL GUIDE */}
                            <div className="sed-card sed-shine-wrapper sed-shine-item" style={{ padding: "28px 40px", marginBottom: "32px", position: "relative", overflow: "hidden" }}>
                               <div className="sed-stat-header" style={{ marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
                                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--brand-gradient)", boxShadow: "0 0 10px rgba(29, 138, 207, 0.4)" }}></div>
                                  <span className="sed-stat-label" style={{ fontSize: "14px", letterSpacing: "2px" }}>JAZZCASH SETTLEMENT PROTOCOL</span>
                               </div>
                               
                               <div className="protocol-track-container" style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
                                  <div style={{ position: "absolute", top: "24px", left: "40px", right: "40px", height: "1.5px", background: "rgba(29, 138, 207, 0.1)", zIndex: 0 }}></div>
                                  {[
                                     { label: "Launch", sub: "Open JazzCash" },
                                     { label: "Expand", sub: "Click on More" },
                                     { label: "Navigate", sub: "Education Tab" },
                                     { label: "Target", sub: "Click Universities" },
                                     { label: "Select", sub: "Saylani Education" },
                                     { label: "Identify", sub: "Paste Voucher ID" },
                                     { label: "Finalize", sub: "Pay your fee" }
                                  ].map((step, idx) => (
                                     <div key={idx} className="step-node-wrapper" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", flex: 1 }}>
                                        <div style={{ 
                                           width: "48px", 
                                           height: "48px", 
                                           borderRadius: "16px", 
                                           background: idx === 6 ? "var(--brand-gradient)" : "white",
                                           color: idx === 6 ? "white" : "#1D8ACF",
                                           display: "flex",
                                           alignItems: "center",
                                           justifyContent: "center",
                                           fontSize: "15px",
                                           fontWeight: 800,
                                           boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                                           border: "1.5px solid rgba(29, 138, 207, 0.1)",
                                           transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
                                        }} className="step-node">
                                           {idx + 1}
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                                           <span style={{ fontSize: "12px", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.3px", whiteSpace: "nowrap" }}>{step.label}</span>
                                           <span style={{ fontSize: "8px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.5px" }}>{step.sub}</span>
                                        </div>
                                     </div>
                                  ))}
                               </div>
                            </div>
                           <div className="payment-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '24px' }}>
                              {/* REDESIGNED PAYMENT LEDGER (Dashboard Match) */}
                              <div className="sed-card sed-fee-card" style={{ padding: '16px 32px 24px', width: '100%', boxSizing: 'border-box' }}>
                                 <div className="sed-stat-header" style={{ marginBottom: '12px' }}>
                                    <span className="sed-stat-label">Transaction Ledger</span>
                                 </div>
                                 <div className="sed-table-container">
                                    <table className="sed-table" style={{ width: '100%' }}>
                                       <thead>
                                          <tr>
                                             <th>Month</th>
                                             <th>Amount</th>
                                             <th>Due date</th>
                                             <th>Voucher ID</th>
                                             <th>Status</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr>
                                             <td style={{ fontWeight: 700, whiteSpace: "nowrap" }}>April 2026</td>
                                             <td style={{ fontWeight: 800, color: "#1D8ACF", whiteSpace: "nowrap" }}>Rs: 1,000 /-</td>
                                             <td style={{ fontWeight: 450, whiteSpace: "nowrap" }}>08-Apr-2026</td>
                                             <td style={{ fontWeight: 700, fontFamily: "monospace", fontSize: "12px", whiteSpace: "nowrap", color: "#64748B" }}>202604433008</td>
                                             <td><span className="sed-status-badge sed-status-pending">AWAITING</span></td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>

                              <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                 {/* BALANCE STAT CARD (Dashboard Style) */}
                                 <div className="sed-card sed-stat-card" style={{ padding: '24px 28px' }}>
                                    <div className="sed-stat-header" style={{ marginBottom: '20px' }}>
                                       <span className="sed-stat-label">Outstanding Balance</span>
                                       <div className="sed-stat-icon" style={{ background: 'rgba(29, 138, 207, 0.08)', color: '#1D8ACF', width: '36px', height: '36px' }}>
                                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
                                       </div>
                                    </div>
                                    <div className="sed-stat-value" style={{ fontWeight: 450, fontSize: '38px', letterSpacing: '-1.5px', marginBottom: '8px' }}>
                                       Rs: 1,000
                                    </div>
                                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                       <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B' }}></div>
                                       Awaiting Settlement
                                    </div>
                                     {/* KINETIC SCULPTED COPY BUTTON (MAZE KA) */}
                                     <button 
                                        className="btn-primary-sculpted" 
                                        style={{ 
                                           width: "100%", 
                                           marginTop: "24px", 
                                           display: "flex", 
                                           alignItems: "center", 
                                           justifyContent: "center", 
                                           gap: "12px",
                                           height: "48px",
                                           fontSize: "13px",
                                           fontWeight: 800,
                                           letterSpacing: "0.8px",
                                           borderRadius: "16px",
                                           border: "none",
                                           boxShadow: "0 8px 24px rgba(29, 138, 207, 0.15)"
                                        }}
                                        onClick={() => { 
                                           navigator.clipboard.writeText("202604433008"); 
                                           setShowCopyToast(true); 
                                           setTimeout(() => setShowCopyToast(false), 2000); 
                                        }}
                                     >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.9 }}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>
                                        COPY VOUCHER ID
                                     </button>
                                 </div>

                                 <div className="sa-card" style={{ padding: '20px', background: '#F8FAFC', border: '1px dashed rgba(15, 23, 42, 0.1)', borderRadius: '16px' }}>
                                    <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                                       Please complete the remittance within the specified grace period to maintain active portal credentials.
                                    </p>
                                 </div>
                              </aside>
                           </div>
                        </div>
                     )}

                     {/* === PROFILE === */}
                     {/* === PROFILE VIEW (MAGNUM OPUS OVERHAUL) === */}
                     {/* === PROFILE VIEW (MAGNUM OPUS OVERHAUL) === */}
                     {currentView === "Profile" && (
                        <div className="arrive-fade profile-nexus" style={{ padding: "0 0 48px" }}>
                           {/* CINEMATIC BANNER (DARK MESH GRADIENT) */}
                           <div className="pn-cover" style={{ 
                              height: "180px", 
                              background: "linear-gradient(135deg, #0F172A 0%, #064E3B 100%)", 
                              borderRadius: "24px 24px 0 0", 
                              position: "relative",
                              overflow: "hidden" 
                           }}>
                              {/* MESH OVERLAY */}
                              <div style={{ position: "absolute", inset: 0, opacity: 0.1, background: "radial-gradient(circle at 70% 30%, #90BC4E 0%, transparent 50%)" }}></div>
                              
                              {/* KINETIC BRAND CONSTELLATION */}
                              <div
                                 className="sed-floating-svg"
                                 style={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "40px",
                                    zIndex: 1,
                                    opacity: 0.25,
                                    transform: "translateY(-50%) rotate(-8deg) scale(0.7)",
                                    transformOrigin: "right center",
                                    pointerEvents: "none"
                                 }}>
                                 <svg width="450" height="200" viewBox="0 0 450 150" fill="none">
                                    <g>
                                       {/* S */}
                                       <path d="M70,20 H25 Q20,20 20,25 V40 Q20,45 25,45 H65 Q70,45 70,50 V65 Q70,70 65,70 H20" stroke="white" strokeWidth="2" fill="none" />
                                       {/* M */}
                                       <polyline points="90,70 90,20 115,45 140,20 140,70" stroke="white" strokeWidth="2" />
                                       {/* i */}
                                       <line x1="165" y1="42" x2="165" y2="70" stroke="white" strokeWidth="2" />
                                       <circle cx="165" cy="25" r="7" fill="#90BC4E" style={{ filter: "drop-shadow(0 0 10px #90BC4E)" }} />
                                       {/* T */}
                                       <polyline points="190,20 235,20" stroke="white" strokeWidth="2" />
                                       <line x1="212.5" y1="20" x2="212.5" y2="70" stroke="white" strokeWidth="2" />
                                    </g>
                                 </svg>
                              </div>
                           </div>

                           {/* PROFILE HEADER ACTIONS */}
                           {/* PROFILE HEADER ACTIONS (REFINED ALIGNMENT) */}
                           <div className="pn-header" style={{ padding: "0 40px", marginTop: "-140px", position: "relative", zIndex: 10, display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "48px" }}>

                              <div style={{ display: "flex", alignItems: "flex-end", gap: "48px" }}>
                                 <div className="pn-avatar-hero" style={{ 
                                    width: "160px", 
                                    height: "160px", 
                                    border: "8px solid rgba(255,255,255,0.9)", 
                                    borderRadius: "50%", 
                                    boxShadow: "0 16px 48px rgba(0,0,0,0.3), inset 0 0 20px rgba(0,0,0,0.05)", 
                                    background: "#F1F5F9", 
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                    backdropFilter: "blur(12px)"
                                 }}>
                                    {userProfile.gender === "male" ? (
                                       <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="#1D8ACF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9, filter: "drop-shadow(0 0 8px rgba(29,138,207,0.2))" }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    ) : (
                                       <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9, filter: "drop-shadow(0 0 8px rgba(225,29,72,0.2))" }}><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                                    )}
                                 </div>
                                 <div className="pn-header-meta" style={{ paddingBottom: "75px", display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <div style={{ lineHeight: 1.1 }}>
                                       {isEditingProfile ? (
                                          <input 
                                             value={userProfile.name}
                                             onChange={(e) => setUserProfile({...userProfile, name: e.target.value.toUpperCase()})}
                                             style={{ fontSize: "28px", fontWeight: 900, color: "white", background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.2)", borderRadius: "10px", padding: "8px 16px", width: "340px", backdropFilter: "blur(10px)" }}
                                          />
                                       ) : (
                                          <h2 className="pn-name" style={{ fontSize: "52px", fontWeight: 950, color: "white", margin: 0, letterSpacing: "-2.5px", textShadow: "0 4px 12px rgba(0,0,0,0.3)", whiteSpace: "nowrap" }}>{userProfile.name}</h2>
                                       )}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                       <span className="badge-tag" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", padding: "6px 16px", borderRadius: "100px", fontSize: "10px", fontWeight: 900, color: "white", border: "1.5px solid rgba(255,255,255,0.2)", letterSpacing: "1px", display: "inline-flex", alignItems: "center", height: "24px" }}>STUDENT</span>
                                       <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.7)", opacity: 0.9 }}>
                                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ display: "block" }}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                                          </div>
                                          <span style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "0.5px", lineHeight: 1 }}>ID: WMAD-B4-433008</span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="pn-actions" style={{ paddingBottom: "75px", display: "flex", alignItems: "center", gap: "20px" }}>
                                 {isEditingProfile && (
                                    <div 
                                       onClick={() => setUserProfile({...userProfile, isPrivate: !userProfile.isPrivate})}
                                       style={{ 
                                          background: userProfile.isPrivate ? "rgba(225, 29, 72, 0.15)" : "rgba(16, 185, 129, 0.15)", 
                                          backdropFilter: "blur(12px)", 
                                          color: userProfile.isPrivate ? "#FF4D4D" : "#10B981", 
                                          padding: "12px 24px", 
                                          borderRadius: "14px", 
                                          display: "flex", 
                                          alignItems: "center", 
                                          gap: "12px", 
                                          fontSize: "12px", 
                                          fontWeight: 900, 
                                          boxShadow: "0 8px 32px rgba(0,0,0,0.1)", 
                                          border: `1px solid ${userProfile.isPrivate ? "rgba(225, 29, 72, 0.3)" : "rgba(16, 185, 129, 0.3)"}`, 
                                          whiteSpace: "nowrap",
                                          cursor: "pointer",
                                          transition: "all 0.3s ease"
                                       }}
                                    >
                                       <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: userProfile.isPrivate ? "#E11D48" : "#10B981", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 12px ${userProfile.isPrivate ? "rgba(225,29,72,0.4)" : "rgba(16,185,129,0.4)"}` }}>
                                          {userProfile.isPrivate ? (
                                             <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                          ) : (
                                             <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" /></svg>
                                          )}
                                       </div>
                                       {userProfile.isPrivate ? "SECURE PORTAL" : "PUBLIC PORTAL"}
                                    </div>
                                 )}
                                 <button 
                                    className="btn-primary-sculpted" 
                                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                                    style={{ 
                                       height: "40px",
                                       padding: "0 24px",
                                       background: isEditingProfile ? "linear-gradient(135deg, #10B981 0%, #059669 100%)" : "rgba(255,255,255,0.1)", 
                                       color: "white",
                                       backdropFilter: "blur(12px)",
                                       display: "flex", 
                                       alignItems: "center", 
                                       gap: "10px",
                                       boxShadow: isEditingProfile ? "0 8px 16px rgba(16,185,129,0.3)" : "0 8px 32px rgba(0,0,0,0.1)",
                                       border: isEditingProfile ? "none" : "1px solid rgba(255,255,255,0.2)",
                                       whiteSpace: "nowrap",
                                       minWidth: "150px",
                                       justifyContent: "center",
                                       borderRadius: "10px",
                                       transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                                       fontSize: "13px",
                                       fontWeight: 800
                                    }}
                                 >
                                    {isEditingProfile ? (
                                       <>
                                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                                          <span style={{ fontSize: "14px", fontWeight: 800 }}>Commit Identity</span>
                                       </>
                                    ) : (
                                       <>
                                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                          <span style={{ fontSize: "14px", fontWeight: 800 }}>Modify Identity</span>
                                       </>
                                    )}
                                 </button>
                              </div>
                           </div>

                           <div className="pn-grid" style={{ padding: "0 40px", display: "grid", gridTemplateColumns: "340px 1fr", gap: "40px" }}>
                              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                                 <div className="sed-card" style={{ padding: "32px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.5)", boxShadow: "0 20px 40px rgba(0,0,0,0.04)" }}>
                                    <div className="sed-stat-header" style={{ marginBottom: "20px" }}>
                                       <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(29, 138, 207, 0.1)", color: "#1D8ACF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                                          </div>
                                          <span className="sed-stat-label" style={{ letterSpacing: "1px", color: "#475569" }}>PROFESSIONAL INTRO</span>
                                       </div>
                                    </div>
                                    {isEditingProfile ? (
                                       <textarea 
                                          value={userProfile.aboutMe}
                                          onChange={(e) => setUserProfile({...userProfile, aboutMe: e.target.value})}
                                          style={{ width: "100%", minHeight: "100px", background: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "12px", padding: "16px", fontSize: "14px", fontWeight: 600, color: "#0F172A", resize: "none", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)" }}
                                       />
                                    ) : (
                                       <p style={{ fontSize: "16px", color: "#475569", fontWeight: 500, lineHeight: 1.6, margin: 0 }}>{userProfile.aboutMe}</p>
                                    )}
                                 </div>

                                 <div className="sed-card" style={{ padding: "32px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.5)", boxShadow: "0 20px 40px rgba(0,0,0,0.04)" }}>
                                    {[
                                       { label: "PRIMARY EMAIL", val: userProfile.email, key: "email", icon: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /> },
                                       { label: "TELEPHONE", val: userProfile.phone, key: "phone", icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /> },
                                       { label: "PHYSICAL ORIGIN", val: userProfile.address, key: "address", icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></> }
                                    ].map((field, idx) => (
                                       <div key={idx} style={{ marginBottom: idx === 2 ? 0 : "28px" }}>
                                          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5">{field.icon}</svg>
                                             <span style={{ fontSize: "11px", fontWeight: 800, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "1px" }}>{field.label}</span>
                                          </div>
                                          {isEditingProfile ? (
                                             <input 
                                                value={field.val}
                                                onChange={(e) => setUserProfile({...userProfile, [field.key]: e.target.value})}
                                                style={{ width: "100%", background: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "8px", padding: "10px 14px", fontSize: "15px", fontWeight: 700, color: "#0F172A" }}
                                             />
                                          ) : (
                                             <p style={{ fontSize: "16px", color: "#0F172A", fontWeight: 700, margin: 0 }}>{field.val}</p>
                                          )}
                                       </div>
                                    ))}
                                 </div>
                              </div>

                              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                                 <div className="sed-card" style={{ padding: "32px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px 64px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.5)", boxShadow: "0 20px 40px rgba(0,0,0,0.04)" }}>
                                    {[
                                       { label: "GENDER IDENTITY", val: userProfile.gender, key: "gender", type: "select", opts: ["male", "female"], icon: <><circle cx="12" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /></> },
                                       { label: "DATE OF BIRTH", val: userProfile.dob, key: "dob", type: "text", icon: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></> },
                                       { label: "NATIONAL CNIC", val: userProfile.cnic, key: "cnic", type: "text", icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></> },
                                       { label: "ACADEMICS", val: userProfile.qualification, key: "qualification", type: "text", icon: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></> }
                                    ].map((field, idx) => (
                                       <div key={idx}>
                                          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5">{field.icon}</svg>
                                             <span style={{ fontSize: "12px", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.5px" }}>{field.label}</span>
                                          </div>
                                          {isEditingProfile ? (
                                             field.type === "select" ? (
                                                <select 
                                                   value={field.val} 
                                                   onChange={(e) => setUserProfile({...userProfile, [field.key]: e.target.value})}
                                                   style={{ width: "100%", background: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "10px", padding: "10px 14px", fontSize: "16px", fontWeight: 800, color: "#0F172A" }}
                                                >
                                                   {field.opts?.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
                                                </select>
                                             ) : (
                                                <input 
                                                   value={field.val}
                                                   onChange={(e) => setUserProfile({...userProfile, [field.key]: e.target.value})}
                                                   style={{ width: "100%", background: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "10px", padding: "10px 14px", fontSize: "16px", fontWeight: 800, color: "#0F172A" }}
                                                />
                                             )
                                          ) : (
                                             <p style={{ fontSize: "18px", color: "#0F172A", fontWeight: 800, margin: 0, letterSpacing: "-0.5px" }}>{field.val}</p>
                                          )}
                                       </div>
                                    ))}
                                 </div>

                                 {/* ENROLLED COURSES CARD */}
                                 <div className="sed-card" style={{ padding: "32px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.5)", boxShadow: "0 20px 40px rgba(0,0,0,0.04)" }}>
                                    <div className="sed-stat-header" style={{ marginBottom: "24px" }}>
                                       <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(144, 188, 78, 0.1)", color: "#90BC4E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                                          </div>
                                          <span className="sed-stat-label" style={{ letterSpacing: "1px", color: "#475569" }}>ACADEMIC ENROLLMENT</span>
                                       </div>
                                    </div>
                                    <div style={{ borderLeft: "5px solid #90BC4E", padding: "12px 24px", background: "rgba(144, 188, 78, 0.05)", borderRadius: "0 16px 16px 0" }}>
                                       <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#0F172A", marginBottom: "10px", fontFamily: "Inter", letterSpacing: "-0.5px" }}>ویب اینڈ موبائل ایپ ڈیویلپمنٹ</h3>
                                       <span style={{ fontSize: "11px", fontWeight: 900, color: "white", background: "#90BC4E", padding: "5px 14px", borderRadius: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>ACTIVE SESSION</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}


                     {/* === ASSIGNMENTS === */}
                     {currentView === "Assignment" && (
                        <div className="arrive-fade">
                           {/* PREMIUM ASSIGNMENT METRICS */}
                           <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
                              {[
                                 { label: "Total", count: 0, icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></>, color: "#1D8ACF", bg: "rgba(29, 138, 207, 0.08)" },
                                 { label: "Submitted", count: 0, icon: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></>, color: "#F59E0B", bg: "rgba(245, 158, 11, 0.08)" },
                                 { label: "Approved", count: 0, icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>, color: "#10B981", bg: "rgba(16, 185, 129, 0.08)" },
                                 { label: "Not Approved", count: 0, icon: <><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></>, color: "#EF4444", bg: "rgba(239, 68, 68, 0.08)" }
                              ].map((m, i) => (
                                 <div key={i} className="sed-card sed-shine-wrapper sed-shine-item" style={{ padding: "24px 28px" }}>
                                    <div className="sed-stat-header" style={{ marginBottom: "20px" }}>
                                       <span className="sed-stat-label">{m.label}</span>
                                       <div className="sed-stat-icon" style={{ background: m.bg, color: m.color, width: "36px", height: "36px" }}>
                                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">{m.icon}</svg>
                                       </div>
                                    </div>
                                    <div className="sed-stat-value" style={{ fontWeight: 450, fontSize: "38px", letterSpacing: "-1.5px" }}>
                                       <span className="count-up" data-val={m.count}>0</span>
                                    </div>
                                 </div>
                              ))}
                           </div>

                           {/* ASSIGNMENT LEDGER */}
                           <div className="sed-card sed-fee-card" style={{ padding: "16px 32px 24px", width: "100%", boxSizing: "border-box" }}>
                              <div className="sed-stat-header" style={{ marginBottom: "12px" }}>
                                 <span className="sed-stat-label">Assignment Protocols</span>
                              </div>
                              <div className="sed-table-container">
                                 <table className="sed-table" style={{ width: "100%" }}>
                                    <thead>
                                       <tr>
                                          <th>Assignment</th>
                                          <th>Course</th>
                                          <th>Due Date</th>
                                          <th>Status</th>
                                          <th style={{ textAlign: "right" }}>Action</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {pendingAssignments.length > 0 ? (
                                          pendingAssignments.map((a: any, i: number) => (
                                             <tr key={i}>
                                                <td style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{a.title}</td>
                                                <td style={{ fontWeight: 600, color: "#1D8ACF", whiteSpace: "nowrap" }}>{a.course}</td>
                                                <td style={{ fontWeight: 450, whiteSpace: "nowrap" }}>{a.date}</td>
                                                <td><span className={`sed-status-badge sed-status-${a.status.toLowerCase()}`}>{a.status}</span></td>
                                                <td style={{ textAlign: "right" }}>
                                                   <button className=" ph-btn-secondary" style={{ padding: "6px 16px", fontSize: "11px", fontWeight: 800 }}>SUBMIT</button>
                                                </td>
                                             </tr>
                                          ))
                                       ) : (
                                          <tr>
                                             <td colSpan={5} style={{ textAlign: "center", padding: "80px 20px", borderBottom: "none" }}>
                                                <div style={{ width: "64px", height: "64px", borderRadius: "18px", background: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 8px 16px rgba(0,0,0,0.03)", border: "1.5px solid rgba(29, 138, 207, 0.08)" }}>
                                                   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                                                </div>
                                                <h3 style={{ fontFamily: "Inter", fontSize: "18px", fontWeight: 800, color: "#0F172A", marginBottom: "8px", letterSpacing: "-0.02em" }}>No Active Assignments</h3>
                                                <p style={{ fontSize: "14px", color: "#64748B", margin: 0, fontWeight: 500 }}>Your mission queue is currently empty.</p>
                                             </td>
                                          </tr>
                                       )}
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                        </div>
                     )}


                     {/* === QUIZZES === */}
                     {currentView === "Quiz" && (
                        <div className="arrive-fade">
                           {/* PREMIUM ASSESSMENT PROTOCOLS */}
                           <div className="sed-card sed-shine-wrapper sed-shine-item" style={{ padding: "18px 24px", marginBottom: "12px", background: "linear-gradient(135deg, #0F172A 0%, #991B1B 100%)", color: "white", position: "relative", overflow: "hidden", boxShadow: "0 12px 40px rgba(15, 23, 42, 0.25)", border: "none" }}>
                              <div style={{ position: "absolute", top: "-20px", right: "-20px", opacity: 0.15 }}>
                                 <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /></svg>
                              </div>
                              
                              <div className="sed-stat-header" style={{ marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "10px" }}>
                                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{ opacity: 0.9 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><circle cx="12" cy="12" r="2.5" /></svg>
                                 <h3 style={{ fontFamily: "Inter", fontSize: "16px", fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: 0 }}>Critical Assessment Protocols</h3>
                              </div>

                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 32px", position: "relative", zIndex: 1 }}>
                                 {[
                                    "Quizzes require single-session completion",
                                    "Tab switching triggers telemetry alerts",
                                    "Fiber-stable connection recommended",
                                    "Fullscreen environment mandated"
                                 ].map((rule, idx) => (
                                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.95)", letterSpacing: "-0.2px" }}>
                                       <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "white", boxShadow: "0 0 10px white" }}></div>
                                       {rule}
                                    </div>
                                 ))}
                              </div>
                           </div>

                           {/* ACADEMIC ASSESSMENTS LEDGER */}
                           <div className="sed-card sed-fee-card" style={{ padding: '16px 20px 20px', width: '100%', boxSizing: 'border-box', position: 'relative' }}>
                              <div style={{ position: 'absolute', left: 0, top: '16px', bottom: '16px', width: '3px', background: '#1D8ACF', borderRadius: '0 4px 4px 0', opacity: 0.8 }}></div>
                              
                              <div className="sed-stat-header" style={{ marginBottom: '14px' }}>
                                 <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.3px' }}>Academic Assessments</h3>
                              </div>

                              <div className="sed-table-container">
                                 <table className="sed-table" style={{ width: '100%' }}>
                                    <thead>
                                       <tr>
                                          <th style={{ color: '#94A3B8', fontWeight: 600 }}>Module</th>
                                          <th style={{ color: '#94A3B8', fontWeight: 600 }}>Title</th>
                                          <th style={{ color: '#94A3B8', fontWeight: 600 }}>Questions</th>
                                          <th style={{ color: '#94A3B8', fontWeight: 600 }}>Attempts</th>
                                          <th style={{ color: '#94A3B8', fontWeight: 600 }}>Score</th>
                                          <th style={{ color: '#94A3B8', fontWeight: 600 }}>Percentage</th>
                                          <th style={{ color: '#94A3B8', fontWeight: 600 }}>Status</th>
                                          <th style={{ color: '#94A3B8', fontWeight: 600 }}>info</th>
                                          <th style={{ textAlign: 'right', color: '#94A3B8', fontWeight: 600 }}>Action</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {pendingQuizzes.length > 0 ? (
                                          pendingQuizzes.map((q: any, i: number) => (
                                             <tr key={i}>
                                                <td style={{ fontWeight: 700, color: '#1D8ACF', whiteSpace: "nowrap" }}>{q.module}</td>
                                                <td style={{ fontWeight: 800, color: '#0F172A', whiteSpace: "nowrap" }}>{q.title}</td>
                                                <td style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, whiteSpace: "nowrap" }}>{q.questions}</td>
                                                <td style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, whiteSpace: "nowrap" }}>{q.attempts || '0'}</td>
                                                <td style={{ fontFamily: 'monospace', fontWeight: 800, letterSpacing: '1px', whiteSpace: "nowrap" }}>{q.score || '---'}</td>
                                                <td style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, whiteSpace: "nowrap" }}>{q.percentage || '---'}</td>
                                                <td><span className={`sed-status-badge sed-status-${q.statusClass}`}>{q.status}</span></td>
                                                <td style={{ fontSize: '12px', color: '#1D8ACF', fontWeight: 700, whiteSpace: "nowrap" }}>View</td>
                                                <td style={{ textAlign: 'right' }}>
                                                   <button className="btn-primary-sculpted" style={{ padding: '6px 16px', fontSize: '11px', fontWeight: 800 }}>LAUNCH SESSION</button>
                                                </td>
                                             </tr>
                                          ))
                                       ) : (
                                          <tr>
                                             <td colSpan={9} style={{ textAlign: 'center', padding: '48px 20px', borderBottom: 'none' }}>
                                                <h3 style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '4px', letterSpacing: '-0.4px' }}>No active quizzes available</h3>
                                                <p style={{ fontSize: '13px', color: '#64748B', margin: 0, fontWeight: 500 }}>Check back later for upcoming assessments</p>
                                             </td>
                                          </tr>
                                       )}
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                           <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: '12px', fontWeight: 700, marginTop: '32px' }}>Contact your instructor if you have any issues accessing your quizzes.</p>
                        </div>
                     )}


                     {/* === PROGRESS === */}
                     {currentView === 'Progress' && (
                        <div className="arrive-fade db-container">
                           
                           {/* HEADER METRICS */}
                           <div className="db-top-metrics">
                              <div className="db-stat-card green">
                                 <div>
                                    <span className="db-stat-label">Total Topics</span>
                                    <div className="db-stat-val"><span className="count-up" data-val="124">0</span></div>
                                 </div>
                              </div>
                              <div className="db-stat-card purple">
                                 <div>
                                    <span className="db-stat-label">Total Completed</span>
                                    <div className="db-stat-val"><span className="count-up" data-val="82">0</span></div>
                                 </div>
                              </div>
                              <div className="db-stat-card red">
                                 <div>
                                    <span className="db-stat-label">Not Completed</span>
                                    <div className="db-stat-val"><span className="count-up" data-val="42">0</span></div>
                                 </div>
                              </div>
                           </div>

                           {/* MAIN LAYOUT */}
                           <div className="db-main-grid">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                 
                                 {/* OVERALL PROGRESS CARD */}
                                 <div className="db-card">
                                    <span className="db-card-label">Overall Progress</span>
                                    <div className="db-progress-display">
                                       <h3 className="db-card-title" style={{ margin: 0 }}>Completion Target: June 2026</h3>
                                       <div className="db-perc-giant"><span className="count-up" data-val="66" data-perc="true">0%</span></div>
                                    </div>
                                    <div className="db-prog-track">
                                       <div className="db-prog-fill grow-bar" style={{ width: '0%' }} data-width="66%"></div>
                                    </div>
                                    <div className="db-metrics-pills">
                                       {[
                                          { label: 'Speed', val: 'Fast', color: '#10B981' },
                                          { label: 'Consistency', val: 'High', color: '#8B5CF6' },
                                          { label: 'Assessments', val: 'A+', color: '#F59E0B' },
                                          { label: 'Ranking', val: '#4', color: '#1D8ACF' }
                                       ].map((m, i) => (
                                          <div key={i} className="db-metric-item">
                                             <span className="db-metric-lbl">{m.label}</span>
                                             <div className="db-metric-val" style={{ color: m.color }}>{m.val}</div>
                                          </div>
                                       ))}
                                    </div>
                                 </div>

                                 {/* CURRICULUM BREAKDOWN */}
                                 <div className="db-curriculum-breakdown">
                                    {[
                                       { title: 'HTML5 Semantic Mastery', prog: 100, topics: '18/18', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
                                       { title: 'CSS3 & Modern Layouts', prog: 90, topics: '24/27', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg> },
                                       { title: 'JavaScript Fundamentals', prog: 65, topics: '32/49', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
                                       { title: 'React Ecosystem', prog: 20, topics: '6/30', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="2"/><path d="M12 2v2M12 20v2"/></svg> }
                                    ].map((m, i) => (
                                       <div key={i} className="db-subject-card sed-shine-wrapper sed-shine-item">
                                          <div className="db-subject-head">
                                             <div className="db-subject-icon">{m.icon}</div>
                                             <span className="db-subject-topics">{m.topics} Topics</span>
                                          </div>
                                          <h4 className="db-subject-title">{m.title}</h4>
                                          <div className="db-subject-track">
                                             <div className="db-subject-fill grow-bar" style={{ width: '0%', backgroundColor: m.prog === 100 ? '#10B981' : '#1D8ACF' }} data-width={`${m.prog}%`}></div>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>

                              <aside style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                 {/* ACADEMIC TRACK CARD */}
                                 <div className="db-academic-card">
                                    <div className="sed-floating-svg" style={{ opacity: 0.1, right: '-10%', top: '10%', width: '120px', height: '120px' }}>
                                       <svg viewBox="0 0 200 200" fill="none"><circle cx="100" cy="100" r="40" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="10 5"/><rect x="70" y="70" width="60" height="60" rx="8" stroke="white" strokeOpacity="0.5" strokeWidth="1.5"/></svg>
                                    </div>
                                    
                                    <div className="db-academic-header">
                                       <span className="db-card-label" style={{ color: 'rgba(255,255,255,0.4)', margin: 0 }}>Academic Track</span>
                                       <div className="db-academic-perc">
                                          <span className="count-up" data-val="66" data-perc="true">0%</span>
                                       </div>
                                    </div>

                                    <div style={{ position: 'relative', zIndex: 2 }}>
                                       <div className="db-academic-pill">
                                          <div className="db-academic-dot"></div>
                                          <span className="db-academic-pill-txt">Top 25% of Cohort</span>
                                       </div>
                                    </div>

                                    <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto' }}>
                                       <div style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '1px' }}>Trajectory: Peak Performance</div>
                                    </div>
                                 </div>

                                 {/* UPCOMING TOPICS */}
                                 <div className="db-upcoming-card">
                                    <span className="db-card-label">Upcoming Topics</span>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                                       {[
                                          { t: 'ES6+ Advanced Patterns', d: 'Next Class' },
                                          { t: 'Async/Await Deep Dive', d: 'Next Week' },
                                          { t: 'TypeScript Integration', d: 'April 15' }
                                       ].map((item, i) => (
                                          <div key={i} className="db-upcoming-item">
                                             <div>
                                                <span className="db-ui-name">{item.t}</span>
                                                <span className="db-ui-time">{item.d}</span>
                                             </div>
                                             <div className="db-ui-arrow">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              </aside>
                           </div>
                        </div>
                     )}
                  </div>
                  <div className={`sed-toast ${showCopyToast ? "show" : ""}`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg><span>Voucher ID Copied!</span></div>
               </main>
            </div>

            {/* FEEDBACK OVERLAY */}
            {showFeedback && (
               <div className="feedback-overlay arrive-fade">
                  <div className="fo-card">
                     <button className="fo-close" onClick={() => setShowFeedback(false)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button>
                     <div className="fo-body">
                        <h3 className="fo-head">Feedback Interface 💌</h3>
                        <p className="fo-sub">Transmit your diagnostics directly to engineering.</p>

                        <div className="fo-types">
                           {['Bug 🐞', 'Idea 💡', 'Other ✨'].map(t => (
                              <div
                                 key={t}
                                 className={`fo-type ${feedbackType === t.split(' ')[0] ? 'active' : ''}`}
                                 onClick={() => setFeedbackType(t.split(' ')[0] as any)}
                              >
                                 {t}
                              </div>
                           ))}
                        </div>

                        <textarea className="fo-textarea" placeholder="Detail your observation..."></textarea>

                        <button className={`btn-primary-sculpted full ${feedbackStatus !== 'idle' ? 'loading' : ''}`} onClick={handleFeedbackSubmit} disabled={feedbackStatus !== 'idle'}>
                           {feedbackStatus === 'idle' && <><span style={{ marginRight: '6px' }}>Transmit Feedback 🚀</span> <span className="btn-arrow">&rarr;</span></>}
                           {feedbackStatus === 'sending' && "Encrypting & Sending..."}
                           {feedbackStatus === 'sent' && "Transmission Received"}
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      );
   }
   return (<div className="login-view">
      <div id="loading-overlay" className="loading-overlay" style={{ background: "#000000" }}>
         <div className="flagship-loading-content">
            <div className="loading-logo-container">
               <div className="loading-glow-atmosphere"></div>
               <div className="loading-scanline"></div>
               <svg className="loading-smit-svg" viewBox="0 0 450 150" fill="none">
                  <path className="smit-path" d="M70,20 H25 Q20,20 20,25 V40 Q20,45 25,45 H65 Q70,45 70,50 V65 Q70,70 65,70 H20" />
                  <polyline className="smit-path" points="90,70 90,20 115,45 140,20 140,70" />
                  <line className="smit-path" x1="165" y1="42" x2="165" y2="70" />
                  <polyline className="smit-path" points="190,20 235,20" />
                  <line className="smit-path" x1="212.5" y1="20" x2="212.5" y2="70" />
               </svg>
            </div>
            <div className="loading-auth-meta" style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
               <div className="loading-progress-wrap">
                  <div className="loading-progress-bar"></div>
               </div>
               <div className="loading-metrics">
                  <span className="loading-status-text">INITIATING_SECURE_AUTH</span>
                  <span className="loading-percentage">0%</span>
               </div>
            </div>
         </div>
      </div>

      {/* HERO SECTION */}
      <div className="login-aura-hero" id="hero-side" ref={heroRef}>
         {/* THE 'AMAZING' TECH ASSETS */}
         <div className="floating-tech-asset fade-in-floater" style={{ top: '8%', right: '8%' }}>
            <svg width="89" height="89" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.4" style={{ animation: 'premium-float 18s ease-in-out infinite' }}>
               <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
         </div>
         <div className="floating-tech-asset slide-from-left" style={{ bottom: '10%', left: '8%' }}>
            <svg width="89" height="89" viewBox="0 0 24 24" fill="none" stroke="var(--smit-blue)" strokeWidth="0.4" style={{ animation: 'premium-float-alt 15s ease-in-out infinite' }}>
               <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="12" y1="18" x2="12" y2="6" />
            </svg>
         </div>
         <div className="floating-tech-asset fade-in-floater" style={{ bottom: '25%', right: '5%', opacity: 0.2 }}>
            <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5" opacity="0.4" style={{ animation: 'premium-float 22s ease-in-out infinite' }}>
               <rect x="4" y="4" width="16" height="16" rx="2" strokeDasharray="2 2" /><path d="M12 8v8M8 12h8" />
            </svg>
         </div>




         {/* FLOATING BRAND GLOBE */}
         <div className="floating-globe">
            <svg ref={globeRef} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
               <defs>
                  <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" stopColor="#0A21C0" />
                     <stop offset="100%" stopColor="#90BC4E" />
                  </linearGradient>
               </defs>
               <circle cx="50" cy="50" r="48" stroke="url(#globeGrad)" strokeWidth="0.5" fill="none" opacity="0.6" />
               <path className="globe-lat" d="M2 50 Q 50 10 98 50 Q 50 90 2 50" stroke="url(#globeGrad)" strokeWidth="0.3" fill="none" opacity="0.4" />
               <path className="globe-lat" d="M50 2 Q 10 50 50 98 Q 90 50 50 2" stroke="url(#globeGrad)" strokeWidth="0.3" fill="none" opacity="0.4" />
                <ellipse cx="50" cy="50" rx="48" ry="15" stroke="url(#globeGrad)" strokeWidth="0.3" fill="none" opacity="0.3" />
               <ellipse cx="50" cy="50" rx="15" ry="48" stroke="url(#globeGrad)" strokeWidth="0.3" fill="none" opacity="0.3" />
            </svg>
         </div>

         <div className="login-hero-content" style={{ padding: '60px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="gsap-hero-element" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '25px' }}>
               {/* FLAGSHIP BRAND HEADER */}
               <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '4px' }}>
                  <div style={{ position: 'relative', zIndex: 10 }}>
                     {/* CROSS-SCREEN MASTERPIECE - Wraparound flight destination (Left Node) */}
                     <div className="cross-screen-floater-left" style={{ position: 'absolute', top: '-15px', left: '-40px', zIndex: -1 }}>
                        <svg width="144" height="144" viewBox="0 0 24 24" fill="none" stroke="var(--luminous-green)" strokeWidth="0.4" style={{ animation: 'premium-float 20s ease-in-out infinite' }}>
                           <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M6 21h12M12 17v4M7 8l-3 3 3 3M17 8l3 3-3 3" />
                        </svg>
                     </div>
                     <img
                        src="/smit-logo.png"
                        alt="SMIT Logo"
                        style={{
                           width: '190px', /* Professional, non-overwhelming size */
                           filter: 'brightness(0) invert(1) drop-shadow(0 4px 15px rgba(255,255,255,0.12))',
                           marginLeft: '-32px', /* Restored original premium alignment */
                           position: 'relative'
                        }}
                     />
                  </div>
               </div>

               <h1 style={{
                  fontSize: '36px',
                  fontWeight: 900,
                  letterSpacing: '-1.2px',
                  color: 'white',
                  lineHeight: 1.1,
                  marginBottom: '12px',
                  textShadow: '0 8px 20px rgba(0,0,0,0.4)',
                  transition: 'all 0.3s ease'
               }}>
                  {activeTab === 'student' ? 'Student' : 'Trainer'} <span style={{ color: 'rgba(255,255,255,0.9)' }}>Portal</span>
               </h1>
               <p style={{
                  fontSize: '17.5px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  maxWidth: '500px',
                  fontWeight: 500,
                  transition: 'opacity 0.2s ease'
               }}>
                  {activeTab === 'student'
                     ? 'Empowering the next generation of IT leaders.'
                     : 'Empowering SMIT\'s finest educators.'}
                  <br />
                  <strong style={{ color: 'white', fontWeight: 700 }}>Success, manufactured.</strong>
               </p>
            </div>

            <div className="login-hero-grid" style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(2, 1fr)',
               gap: '12px',
               width: '100%',
               maxWidth: '520px',
               marginBottom: '20px',
               transition: 'opacity 0.2s ease'
            }}>
               {[
                  { label: 'Students Trained', val: 200, suff: 'K+' },
                  { label: 'Expert Trainers', val: 400, suff: '+' },
                  { label: 'Employment Success', val: 70, suff: '%' },
                  { label: 'Startups Launched', val: 150, suff: '+' }
               ].map((stat, i) => (
                  <div
                     key={i}
                     className="magnetic-stat-card"
                     style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                        backdropFilter: 'var(--glass-blur)',
                        border: '1px solid rgba(144,188,78,0.2)',
                        borderRadius: '10px',
                        padding: '10px 24px',
                        transition: 'var(--transition-premium)',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                     }}
                  >
                     <div style={{
                        fontSize: '26px',
                        fontWeight: 900,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'baseline',
                        lineHeight: 1,
                        letterSpacing: '-0.8px'
                     }}>
                        <span className="gs-counter" data-target={stat.val} data-suffix={stat.suff}>0</span>
                     </div>
                     <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                        {stat.label}
                     </div>
                     <div style={{
                        position: 'absolute', bottom: '-10px', right: '-10px', width: '40px', height: '40px',
                        background: 'radial-gradient(circle, rgba(144,188,78,0.12) 0%, transparent 70%)',
                        borderRadius: '50%', pointerEvents: 'none'
                     }}></div>
                  </div>
               ))}
            </div>

            <div className="gsap-hero-element" style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '520px' }}>
               {[
                  { label: '10 Million+ IT Experts Mission' },
                  { label: '$100 Billion Digital Economy Projection' }
               ].map((mission, i) => (
                  <div key={i} style={{
                     background: 'rgba(255,255,255,0.02)',
                     border: '1px solid rgba(255,255,255,0.04)',
                     borderRadius: '8px',
                     padding: '10px 16px',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '10px',
                     transition: 'all 0.3s ease',
                     backdropFilter: 'blur(10px)'
                  }}>
                     <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#90BC4E', boxShadow: '0 0 8px #90BC4E' }}></div>
                     <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{mission.label}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* FORM SECTION */}
      <div className="login-form-side" style={{ position: 'relative' }}>


         {/* GEOMETRIC SMIT CONSTELLATION - Flagship Vector Wordmark */}
         <div
            className="gsap-smit-brand"
            style={{
               position: 'absolute',
               top: '105px', /* Perfectly next to Sign In header */
               right: '25px', /* Tucked to the side for premium feel */
               zIndex: 0,
               opacity: 0.3, /* Enhanced for better visibility */
               transform: 'scale(0.9) rotate(-8deg)',
               transformOrigin: 'top right',
               pointerEvents: 'none'
            }}>
            <svg width="450" height="200" viewBox="0 0 450 150" fill="none" className="float-geo-bg">
               <g>
                  {/* S - Fluid Digital Flow (Premium Curve) */}
                  <path d="M70,20 H25 Q20,20 20,25 V40 Q20,45 25,45 H65 Q70,45 70,50 V65 Q70,70 65,70 H20" stroke="#1D8ACF" strokeWidth="1.5" fill="none" style={{ opacity: 0.6 }} />
                  <circle cx="70" cy="20" r="5" fill="#1D8ACF" className="blink-bg" style={{ opacity: 0.8, animationDelay: '0s' }} />
                  <circle cx="20" cy="20" r="5" fill="#1D8ACF" className="blink-bg" style={{ opacity: 0.8, animationDelay: '0.5s' }} />
                  <circle cx="70" cy="45" r="5" fill="#1D8ACF" className="blink-bg" style={{ opacity: 0.8, animationDelay: '1s' }} />
                  <circle cx="20" cy="45" r="5" fill="#1D8ACF" className="blink-bg" style={{ opacity: 0.8, animationDelay: '1.5s' }} />
                  <circle cx="20" cy="70" r="5" fill="#1D8ACF" className="blink-bg" style={{ opacity: 0.8, animationDelay: '2s' }} />
                  <circle cx="70" cy="70" r="5" fill="#1D8ACF" className="blink-bg" style={{ opacity: 0.8, animationDelay: '2.5s' }} />

                  {/* M - High Detail Peak */}
                  <polyline points="90,70 90,20 115,45 140,20 140,70" stroke="#1D8ACF" strokeWidth="1.5" style={{ opacity: 0.5 }} />
                  <circle cx="90" cy="70" r="5" fill="#1D8ACF" className="blink-bg" style={{ opacity: 0.8, animationDelay: '0.2s' }} />
                  <circle cx="90" cy="20" r="5" fill="#1D8ACF" className="blink-bg" style={{ opacity: 0.8, animationDelay: '0.8s' }} />
                  <circle cx="115" cy="45" r="5" fill="#1D8ACF" className="blink-bg" style={{ opacity: 0.8, animationDelay: '1.2s' }} />
                  <circle cx="140" cy="20" r="5" fill="#1D8ACF" className="blink-bg" style={{ opacity: 0.8, animationDelay: '2.1s' }} />
                  <circle cx="140" cy="70" r="5" fill="#1D8ACF" className="blink-bg" style={{ opacity: 0.8, animationDelay: '1.4s' }} />

                  {/* i - Lowercase High Fidelity (Fixed Alignment) */}
                  <line x1="165" y1="42" x2="165" y2="70" stroke="#1D8ACF" strokeWidth="1.5" style={{ opacity: 0.5 }} />
                  <circle cx="165" cy="25" r="7" fill="#6DB33F" className="pulse-glow-dot" style={{ opacity: 0.9, filter: 'drop-shadow(0 0 10px #6DB33F)' }} />
                  <circle cx="165" cy="42" r="5" fill="#1D8ACF" className="blink-bg" style={{ opacity: 0.8, animationDelay: '0.4s' }} />
                  <circle cx="165" cy="70" r="5" fill="#1D8ACF" className="blink-bg" style={{ opacity: 0.8, animationDelay: '1.1s' }} />

                  {/* T - Compact Tech Style (Consistent Spacing) */}
                  <polyline points="190,20 235,20" stroke="#1D8ACF" strokeWidth="1.5" style={{ opacity: 0.5 }} />
                  <line x1="212.5" y1="20" x2="212.5" y2="70" stroke="#1D8ACF" strokeWidth="1.5" style={{ opacity: 0.5 }} />
                  <circle cx="190" cy="20" r="5" fill="#1D8ACF" className="blink-bg" style={{ opacity: 0.8, animationDelay: '3.1s' }} />
                  <circle cx="235" cy="20" r="5" fill="#1D8ACF" className="blink-bg" style={{ opacity: 0.8, animationDelay: '1.2s' }} />
                  <circle cx="212.5" cy="20" r="5" fill="#1D8ACF" className="blink-bg" style={{ opacity: 0.8, animationDelay: '0.9s' }} />
                  <circle cx="212.5" cy="70" r="5" fill="#1D8ACF" className="blink-bg" style={{ opacity: 0.8, animationDelay: '2.4s' }} />
               </g>
            </svg>
         </div>

         {/* FORM SECTION INNER */}
         <div style={{ width: '100%', maxWidth: '380px', position: 'relative', zIndex: 1 }}>
            {/* CROSS-SCREEN MASTERPIECE - Wraparound flight origin (Right Node) */}
            <div className="cross-screen-floater-right" style={{ position: 'absolute', top: '-15px', left: '-50px', zIndex: -1, pointerEvents: 'none', opacity: 1 }}>
               <svg width="144" height="144" viewBox="0 0 24 24" fill="none" stroke="#58942D" strokeWidth="0.4" style={{ animation: 'premium-float-alt 15s ease-in-out infinite' }}>
                  <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M6 21h12M12 17v4M7 8l-3 3 3 3M17 8l3 3-3 3" />
               </svg>
            </div>
            {/* PREMIUM MODE SWITCHER - Hardened CSS Kinetic Glider */}
            <div className={`premium-mode-switcher-container ${activeTab === 'student' ? 'active-student' : 'active-teacher'}`}>
               <div className="mode-glider"></div>
               <div
                  className={`mode-btn student-btn ${activeTab === 'student' ? 'active' : ''}`}
                  onClick={() => setActiveTab('student')}
                  style={{ zIndex: 10, position: 'relative' }}
               >
                  STUDENT
               </div>
               <div
                  className={`mode-btn trainer-btn ${activeTab === 'teacher' ? 'active' : ''}`}
                  onClick={() => setActiveTab('teacher')}
                  style={{ zIndex: 10, position: 'relative' }}
               >
                  TRAINER
               </div>
            </div>

            <div key={activeTab} className="tab-content-transition">
               <h2 style={{ fontSize: '32px', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 800, letterSpacing: '-1px' }}>
                  Sign In
               </h2>
               <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', marginBottom: '34px' }}>
                  {activeTab === 'student' ? 'Access your student portal' : 'Access your instructor dashboard'}
               </p>

               <form onSubmit={handleLogin}>
                  <div style={{ marginBottom: '18px' }}>
                     <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {activeTab === 'student' ? 'CNIC Number' : 'EMAIL ADDRESS'}
                     </label>
                     <input
                        type={activeTab === 'student' ? 'text' : 'email'}
                        className="form-input"
                        placeholder={activeTab === 'student' ? "xxxxx-xxxxxxx-x" : "your@smit.edu.pk"}
                        defaultValue={activeTab === 'student' ? "1730157164037" : ""}
                        required
                        style={{ height: '52px', borderRadius: '14px' }}
                     />
                  </div>
                  <div style={{ marginBottom: '34px', position: 'relative' }}>
                     <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        PASSWORD
                     </label>
                     <div style={{ position: 'relative' }}>
                        <input
                           type={showPassword ? 'text' : 'password'}
                           className="form-input"
                           placeholder="Enter your Password"
                           defaultValue={activeTab === 'student' ? "password" : ""}
                           required
                           style={{ height: '52px', borderRadius: '14px', paddingRight: '50px' }}
                        />
                        <button
                           type="button"
                           className="pass-toggle-btn"
                           onClick={() => setShowPassword(!showPassword)}
                        >
                           {showPassword ? (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                           ) : (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                           )}
                        </button>
                     </div>
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', height: '56px', fontSize: '16px', fontWeight: 700, borderRadius: '14px' }}>
                     Sign In &rarr;
                  </button>
               </form>

               <div style={{ textAlign: 'center', marginTop: '32px', position: 'relative' }}>
                  {activeTab === 'student' ? (
                     <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0, position: 'relative' }}>
                        First time here? <a href="#" style={{ color: '#1D8ACF', fontWeight: 700, textDecoration: 'none', position: 'relative' }}>Create Password</a>
                     </p>
                  ) : (
                     <p style={{
                        color: '#1D8ACF',
                        fontWeight: 700,
                        fontSize: '14px',
                        cursor: 'pointer',
                        margin: 0
                     }}>
                        Forgot Password?
                     </p>
                  )}
               </div>
            </div>
         </div>
      </div>
   </div>
   );
}

export default App;

































