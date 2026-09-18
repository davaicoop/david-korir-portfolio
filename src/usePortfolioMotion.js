import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function usePortfolioMotion(setActive, setProgress) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    const sections = [...document.querySelectorAll('main section[id]')];
    let frame = 0;
    const updateNavigation = () => {
      frame = 0;
      const marker = innerHeight * 0.35;
      const current = sections.filter(section => section.getBoundingClientRect().top <= marker).at(-1) || sections[0];
      setActive(current.id);
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? Math.min(1, scrollY / max) : 0);
      const nav = document.querySelector('#site-navigation');
      const button = [...nav.querySelectorAll('button')].find(item => item.textContent === current.id);
      const indicator = nav.querySelector('.nav-indicator');
      indicator.style.opacity = button ? '1' : '0';
      if (button) {
        indicator.style.transform = `translateX(${button.offsetLeft}px) scaleX(${button.offsetWidth})`;
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(updateNavigation); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    updateNavigation();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const hero = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.hero-copy', { y: -70, ease: 'none', scrollTrigger: hero });
      gsap.to('.hero-card', { y: 45, rotation: 2, ease: 'none', scrollTrigger: hero });
      gsap.to('.system-grid', { y: 60, rotationX: 16, ease: 'none', scrollTrigger: hero });
      document.querySelectorAll('.section').forEach(section => {
        gsap.fromTo(section, { '--chapter-opacity': 0 }, { '--chapter-opacity': 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top 90%', end: 'top 25%', scrub: true } });
        const heading = section.querySelector('h2');
        if (heading) gsap.from(heading, { x: -16, ease: 'none', scrollTrigger: { trigger: heading, start: 'top 95%', end: 'top 65%', scrub: true } });
      });
      document.querySelectorAll('.project').forEach(card => {
        const sequence = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 28%', scrub: true } });
        sequence.from(card.querySelector('.project-diagram'), { scale: 0.88, y: 20, ease: 'none' }, 0)
          .from(card.querySelector('.project-description'), { opacity: 0.3, y: 12, ease: 'none' }, 0.15)
          .from(card.querySelectorAll('.project-tags span'), { scale: 0.85, opacity: 0.25, stagger: 0.08, ease: 'none' }, 0.3);
      });
      document.querySelectorAll('.skill-row').forEach(row => {
        gsap.from(row.querySelector('.skill-meter i'), { scaleX: 0, ease: 'none', scrollTrigger: { trigger: row, start: 'top 92%', end: 'top 58%', scrub: true } });
      });
      gsap.fromTo('.timeline-track path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 80%', end: 'bottom 55%', scrub: true } });
      document.querySelectorAll('.timeline, .earlier-grid > div').forEach(role => {
        ScrollTrigger.create({ trigger: role, start: 'top 70%', end: 'bottom top', toggleClass: 'role-reached' });
      });
    });
    const refresh = () => { ScrollTrigger.refresh(); schedule(); };
    document.fonts?.ready.then(() => { if (!disposed) refresh(); });
    let disposed = false;
    return () => {
      disposed = true;
      media.revert();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [setActive, setProgress]);
}
