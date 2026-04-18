import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './About.module.css';

const highlights = [
  { label: 'Education', value: 'KFUPM — Software Engineering' },
  { label: 'Focus', value: 'Full-Stack Web Development' },
  { label: 'Currently Learning', value: 'Cloud & DevOps' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export default function About() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="about" className={`${styles.about} section`}>
      <div className="container">
        <SectionTitle title="About Me" />
        <motion.div
          ref={ref}
          className={styles.grid}
          initial="hidden"
          animate={isVisible ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div className={styles.avatar} variants={fadeUp}>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="95" fill="url(#avatarGrad)" opacity="0.12" />
              <circle cx="100" cy="80" r="30" fill="url(#avatarGrad)" opacity="0.5" />
              <ellipse cx="100" cy="150" rx="48" ry="35" fill="url(#avatarGrad)" opacity="0.4" />
              <circle cx="100" cy="100" r="95" fill="none" stroke="url(#avatarGrad)" strokeWidth="2.5" />
            </svg>
          </motion.div>

          <div className={styles.content}>
            <motion.p variants={fadeUp}>
              I'm a <strong>Software Engineering student at KFUPM</strong> who builds web applications that actually solve problems. I care about clean code, thoughtful design, and understanding how things work under the hood.
            </motion.p>
            <motion.p variants={fadeUp}>
              When I'm not coding, I'm exploring new tech, following AI developments, or competing in hackathons. I believe the best way to learn is to build — and then rebuild it better.
            </motion.p>
            <motion.div className={styles.highlights} variants={fadeUp}>
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  className={styles.highlight}
                  whileHover={{ y: -2, borderColor: 'var(--clr-primary)' }}
                  transition={{ duration: 0.2 }}
                >
                  <dt className={styles.highlightLabel}>{h.label}</dt>
                  <dd className={styles.highlightValue}>{h.value}</dd>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
