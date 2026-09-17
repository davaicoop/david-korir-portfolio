import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, className = "", delay = 0, variant = "up" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal reveal-${variant} ${visible ? "is-visible" : ""} ${className}`.trim()} style={{ "--reveal-delay": `${delay}ms` }}>
      {children}
    </div>
  );
}
