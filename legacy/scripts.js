/* 
    SMIT Student Portal - Motion System (GSAP)
    Theme: Cyber-Tech Production
    ---------------------------------------------
*/

window.addEventListener('load', () => {
    if (typeof gsap === 'undefined') {
        console.error('GSAP is missing. Motion system offline.');
        return;
    }

    // --- 1. CINEMATIC ENTRANCE ---
    const entranceTl = gsap.timeline({ 
        defaults: { ease: 'back.out(1.4)', duration: 1.4 } 
    });

    // --- 2. GLOBAL HERITAGE ASSETS (WOW FACTOR) ---
    const globe = document.querySelector('.floating-globe');
    if (globe) {
        gsap.to(globe, { rotation: 360, duration: 40, repeat: -1, ease: 'none' });
        gsap.to(globe, { y: '+=30', duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    }

    // --- 3. THE SEDUCTIVE DUAL-AURA & PARALLAX ---
    const orb = document.getElementById('cursor-orb');
    const heroSide = document.getElementById('hero-side');
    
    if (heroSide && orb) {
        heroSide.addEventListener('mousemove', (e) => {
            const rect = heroSide.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Follow Light
            gsap.to(orb, { x: x, y: y, duration: 2.5, ease: 'power3.out' });

            // Mouse Parallax for Globe
            if (globe) {
                const shiftX = (e.clientX - window.innerWidth / 2) * 0.04;
                const shiftY = (e.clientY - window.innerHeight / 2) * 0.04;
                gsap.to(globe, { x: shiftX, y: shiftY, duration: 2, ease: 'power2.out' });
            }
        });
    }

    // --- 4. MAGNETIC CARD PHYSICS ---
    document.querySelectorAll('.stat-card-gsap').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -14;
            const rotateY = ((x - centerX) / centerX) * 14;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1200,
                ease: 'power3.out',
                duration: 0.35
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                ease: 'elastic.out(1, 0.4)',
                duration: 1.5
            });
        });
    });

    // --- 5. STAT COUNTERS ---
    document.querySelectorAll('.gs-counter').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '+';
        const displaySuffix = target >= 1000 ? 'K+' : suffix;
        const finalVal = target >= 1000 ? target / 1000 : target;

        gsap.to({}, {
            duration: 3.5,
            ease: "power2.out",
            onUpdate: function() {
                const progress = this.progress();
                const current = Math.floor(progress * finalVal);
                el.innerText = current + displaySuffix;
            }
        });
    });
});

// --- AUTH & NAVIGATION ---
function handleLogin(e) {
    e.preventDefault();
    const portalShell = document.getElementById('portal-shell');
    const loginPage = document.getElementById('login-page');
    const loading = document.getElementById('loading-overlay');

    // Show Loading
    loading.style.display = 'flex';
    gsap.fromTo(loading, { opacity: 0 }, { opacity: 1, duration: 0.5 });

    setTimeout(() => {
        gsap.to(loginPage, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                loginPage.style.display = 'none';
                loading.style.display = 'none';
                portalShell.style.display = 'grid';
                gsap.fromTo(portalShell, { opacity: 0 }, { opacity: 1, duration: 0.8 });
                showPage('dashboard');
            }
        });
    }, 1000);
}

function handleLogout() {
    location.reload();
}

function showPage(pageId) {
    document.querySelectorAll('.page-aura').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(`page-${pageId}`).style.display = 'block';
    document.getElementById(`nav-${pageId}`).classList.add('active');
    
    gsap.fromTo(`#page-${pageId}`, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
}
