import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGreeting } from '../../hooks/useGreeting';
import Button from '../ui/Button';
import styles from './Hero.module.css';

function Particles() {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const count = window.innerWidth < 768 ? 10 : 16;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = styles.particle;
      const size = Math.random() * 5 + 2;
      const left = Math.random() * 100;
      const dur = Math.random() * 18 + 12;
      const delay = Math.random() * 12;
      p.style.cssText = `width:${size}px;height:${size}px;left:${left}%;animation-duration:${dur}s;animation-delay:${delay}s`;
      container.appendChild(p);
    }
    return () => { container.innerHTML = ''; };
  }, []);
  return <div ref={containerRef} className={styles.particles} />;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function Hero() {
  const greeting = useGreeting();

  return (
    <section id="hero" className={styles.hero}>
      <Particles />
      <motion.div
        className={`${styles.content} container`}
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <div className={styles.text}>
          <motion.p className={styles.greeting} variants={fadeUp}>{greeting}</motion.p>
          <motion.h1 className={styles.title} variants={fadeUp}>
            I build things<br />for the <span className={styles.highlight}>web</span>
          </motion.h1>
          <motion.p className={styles.subtitle} variants={fadeUp}>
            Software Engineering student at KFUPM, focused on making the internet a little more useful.
          </motion.p>
          <motion.p className={styles.description} variants={fadeUp}>
            Currently exploring full-stack development, cloud computing, and developer tools — turning ideas into functional, well-crafted applications.
          </motion.p>
          <motion.div className={styles.actions} variants={fadeUp}>
            <Button href="#projects" variant="primary">View My Work</Button>
            <Button href="#contact" variant="outline">Get In Touch</Button>
          </motion.div>
        </div>

        <motion.div className={styles.visual} variants={fadeUp} aria-hidden="true">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="heroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="heroGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#818CF8" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="heroGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="160" fill="url(#heroGrad1)" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="#6366F1" strokeWidth="1" strokeDasharray="8 6" opacity="0.3">
              <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="60s" repeatCount="indefinite" />
            </circle>
            <rect x="120" y="120" width="160" height="160" rx="20" fill="url(#heroGrad2)" transform="rotate(15 200 200)" />
            <polygon points="200,80 280,200 200,320 120,200" fill="url(#heroGrad3)" opacity="0.6">
              <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="-360 200 200" dur="90s" repeatCount="indefinite" />
            </polygon>
            <circle cx="200" cy="200" r="40" fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.3" />
            <text x="170" y="210" fill="#6366F1" fontSize="48" fontWeight="700" fontFamily="monospace" opacity="0.15">&lt;/&gt;</text>
          </svg>
        </motion.div>
      </motion.div>

      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
