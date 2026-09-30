import { useEffect } from 'react';

// React creates the sections after HTML navigation. Restore a shared section
// once it exists and after fonts settle, including refresh and hash changes.
export function useSectionLinks() {
  useEffect(() => {
    let disposed = false;
    let frame;
    const restore = () => {
      if (disposed || !location.hash) return;
      const section = document.getElementById(location.hash.slice(1));
      if (!section) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => section.scrollIntoView({ behavior: 'instant', block: 'start' }));
    };
    restore();
    document.fonts?.ready.then(restore);
    window.addEventListener('hashchange', restore);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', restore);
    };
  }, []);
}
