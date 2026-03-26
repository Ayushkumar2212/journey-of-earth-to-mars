// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// --- 1. INTRO ANIMATION ON LOAD ---
window.addEventListener("load", () => {
    let introTl = gsap.timeline();
    introTl.to(".intro-title", { opacity: 1, y: 20, duration: 1.5, ease: "power2.out" })
           .to("#takeoff-wrapper", { opacity: 1, duration: 1 }, "-=0.5")
           .fromTo(".riding-astro", { y: -100, opacity: 0 }, { y: -30, opacity: 1, duration: 0.8, ease: "bounce.out" })
           .to(".takeoff-fire", { opacity: 1, scale: 1.5, duration: 0.2, yoyo: true, repeat: 7 })
           .to("#takeoff-wrapper", { x: 5, y: 5, yoyo: true, repeat: 14, duration: 0.05 }, "-=1.4")
           .to("#takeoff-wrapper", { y: -1200, duration: 1.5, ease: "power2.in" })
           .to(["#timeline-track", "#journey-rocket"], { opacity: 0.5, duration: 1 })
           .to("#scroll-prompt", { opacity: 1, yoyo: true, repeat: -1, duration: 1 });
});

// --- 2. THE SCROLLING ROCKET ---
gsap.to("#journey-rocket", {
    y: () => document.documentElement.scrollHeight - window.innerHeight - 170, 
    ease: "none",
    scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1 }
});

gsap.to("#rocket-inner", {
    filter: "drop-shadow(0 0 25px rgba(255, 69, 0, 1))", 
    scrollTrigger: { trigger: "#moi", start: "top center", end: "bottom center", scrub: true }
});

// --- 3. THE OUTRO LANDING SEQUENCE ---

// Move Rocket to the center
gsap.to("#journey-rocket", {
    scrollTrigger: { trigger: "#outro", start: "top bottom", end: "center center", scrub: 1 },
    left: "50%", xPercent: -50, scale: 1.8 
});

// Fade out track
gsap.to("#timeline-track", {
    scrollTrigger: { trigger: "#outro", start: "top center", end: "center center", scrub: true },
    opacity: 0
});

// "WELCOME TO MARS" text glow
gsap.to(".welcome-text", {
    opacity: 1, transform: "scale(1)", duration: 1.5, ease: "power3.out",
    scrollTrigger: { trigger: "#outro", start: "top 70%", toggleActions: "play none none reverse" }
});

// Landing Platform Appears
gsap.to("#landing-platform", {
    opacity: 1, width: "350px", duration: 1, ease: "power2.out",
    scrollTrigger: { trigger: "#outro", start: "top 60%", toggleActions: "play none none reverse" }
});

// 🚀 BOUNCE LANDING 
let landingTl = gsap.timeline({
    scrollTrigger: { trigger: "#outro", start: "top 20%", toggleActions: "play none none reverse" }
});

// The Rocket bounces down perfectly on the inner wrapper
landingTl.to("#rocket-inner", { y: 40, duration: 0.6, ease: "bounce.out" });

// --- 4. SECTION CONTENT REVEALS ---
document.querySelectorAll('section:not(#intro):not(#outro)').forEach(section => {
    let tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none reverse" } });
    tl.fromTo(section.querySelectorAll('.reveal-head'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });
    tl.fromTo(section.querySelector('.main-desc'), { opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 20 }, { opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0, duration: 1, ease: "power4.out" }, "-=0.4");
    tl.fromTo(section.querySelectorAll('.fact-box'), { opacity: 0, scale: 0.8, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" }, "-=0.6");
});

// --- 5. RIGHT SIDE ICONS SCROLL EFFECTS ---
gsap.to("#anim-earth", { scrollTrigger: { trigger: "#earth", start: "top top", end: "bottom top", scrub: 1 }, scale: 0.5, opacity: 0, y: -100 });
gsap.to("#anim-flame", { scrollTrigger: { trigger: "#launch", start: "top bottom", end: "bottom top", scrub: true }, scale: 1.5, rotation: () => Math.random() * 20 - 10 });
gsap.fromTo("#anim-astro", { y: -150, rotation: -45 }, { scrollTrigger: { trigger: "#space", start: "top bottom", end: "bottom top", scrub: 1.5 }, y: 200, rotation: 180 });
gsap.fromTo("#anim-meteor", { x: 150, y: -200, scale: 0.5 }, { scrollTrigger: { trigger: "#landing", start: "top bottom", end: "center center", scrub: 1 }, x: -50, y: 50, scale: 1.5 });
gsap.fromTo("#anim-mars", { scale: 0.3, opacity: 0 }, { scrollTrigger: { trigger: "#mars", start: "top 80%", end: "center center", scrub: 1 }, scale: 1, opacity: 1 });
