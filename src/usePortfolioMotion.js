import { useLayoutEffect } from 'react';

export function usePortfolioMotion(setActive) {
  useLayoutEffect(() => {
    const sections = [...document.querySelectorAll('main section[id]')];
    const progressBar = document.querySelector('.progress span');
    const nav = document.querySelector('#site-navigation');
    const buttons = [...nav.querySelectorAll('button')];
    const indicator = nav.querySelector('.nav-indicator');
    let frame = 0, lastSection, disposed = false, media;

    const updateNavigation = () => {
      frame = 0;
      const marker = innerHeight * 0.35;
      const current = sections.filter(section => section.getBoundingClientRect().top <= marker).at(-1) || sections[0];
      if (lastSection !== current.id) {
        lastSection = current.id;
        setActive(current.id);
      }
      const max = document.documentElement.scrollHeight - innerHeight;
      progressBar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
      const button = buttons.find(item => item.textContent === current.id);
      indicator.style.opacity = button ? '1' : '0';
      if (button) indicator.style.transform = `translateX(${button.offsetLeft}px) scaleX(${button.offsetWidth})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(updateNavigation); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    updateNavigation();

    // Content and navigation work immediately; load motion after the initial render.
    const initializeMotion = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const hero = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
        gsap.to('.hero-copy', { y: -50, ease: 'none', scrollTrigger: hero });
        gsap.to('.hero-card', { y: 35, rotation: 1.5, ease: 'none', scrollTrigger: hero });
        gsap.to('.system-grid', { y: 45, rotationX: 12, ease: 'none', scrollTrigger: hero });
        document.querySelectorAll('.section').forEach(section => {
          gsap.fromTo(section, { '--chapter-opacity': 0 }, { '--chapter-opacity': 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top 90%', end: 'top 25%', scrub: true } });
          const heading = section.querySelector('h2');
          if (heading) gsap.from(heading, { x: -12, ease: 'none', scrollTrigger: { trigger: heading, start: 'top 95%', end: 'top 65%', scrub: true } });
        });
        document.querySelectorAll('.project').forEach(card => {
          gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 28%', scrub: true } })
            .from(card.querySelector('.project-browser, .project-diagram'), { scale: 0.96, y: 14, ease: 'none' }, 0)
            .from(card.querySelector('.project-description'), { y: 8, ease: 'none' }, 0.15)
            .from(card.querySelectorAll('.project-tags span'), { y: 5, stagger: 0.04, ease: 'none' }, 0.3);
        });
        document.querySelectorAll('.skill-row').forEach(row => {
          gsap.from(row.querySelector('.skill-meter i'), { scaleX: 0, ease: 'none', scrollTrigger: { trigger: row, start: 'top 92%', end: 'top 58%', scrub: true } });
        });
        gsap.fromTo('.timeline-track path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 80%', end: 'bottom 55%', scrub: true } });
        document.querySelectorAll('.timeline, .earlier-grid > div').forEach(role => {
          ScrollTrigger.create({ trigger: role, start: 'top 70%', end: 'bottom top', toggleClass: 'role-reached' });
        });
      });
      await document.fonts?.ready;
      if (!disposed) { ScrollTrigger.refresh(); schedule(); }
    };
    initializeMotion().catch(error => console.warn('Portfolio motion could not load; content and navigation remain available.', error));

    return () => {
      disposed = true;
      media?.revert();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [setActive]);
}
