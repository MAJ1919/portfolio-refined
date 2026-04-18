import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { skills } from '../../data/skills';
import styles from './Skills.module.css';

function SkillIcon({ icon, color }) {
  const icons = {
    html5: <><path d="M6 4l3.5 38L24 46l14.5-4L42 4z" fill="#E44D26" /><path d="M24 8v34l11.5-3.2L38.5 8z" fill="#F16529" /></>,
    css3: <><path d="M6 4l3.5 38L24 46l14.5-4L42 4z" fill="#1572B6" /><path d="M24 8v34l11.5-3.2L38.5 8z" fill="#33A9DC" /></>,
    javascript: <><rect width="48" height="48" rx="4" fill="#F7DF1E" /><path d="M13 35l3-2c.6 1 1.1 1.8 2.4 1.8 1.2 0 2-.5 2-2.4V20h3.7v12.5c0 4-2.3 5.8-5.7 5.8-3 0-4.8-1.6-5.4-3.3z" fill="#323330" /></>,
    react: <><circle cx="24" cy="24" r="4.5" fill="#61DAFB" /><ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke="#61DAFB" strokeWidth="1.5" /><ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 24 24)" /><ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 24 24)" /></>,
    python: <><path d="M24 4C14 4 15 8.5 15 8.5V13h9.5v1.5H11s-7-.8-7 9S10.5 33 10.5 33h4V28.5S14 23 19.5 23H29s5 .1 5-4.8V9S34.5 4 24 4z" fill="#3776AB" /><circle cx="19" cy="9" r="1.5" fill="#fff" /><path d="M24 44c10 0 9-4.5 9-4.5V35h-9.5v-1.5H37s7 .8 7-9S37.5 15 37.5 15h-4v4.5S34 25 28.5 25H19s-5-.1-5 4.8V39S13.5 44 24 44z" fill="#FFD43B" /><circle cx="29" cy="39" r="1.5" fill="#fff" /></>,
    git: <><path d="M45.3 22.1L25.9 2.7a2.4 2.4 0 00-3.4 0l-4 4 4.3 4.3a2.9 2.9 0 013.6 3.6l4.2 4.2c3.5 1.5 5.5 3 5.5 6.4 0 3.7-2.9 5.7-6.7 5.7-3.8 0-6.2-1.8-7.4-4.2l-3.9-3.9v10.3c.4.2.7.4.7.5a2.9 2.9 0 01-4.1 4.1 2.9 2.9 0 01.6-4.6V16.7a2.9 2.9 0 01-1.6-3.8l-4.2-4.2-11.1 11c-.9.9-.9 2.5 0 3.4l19.4 19.4c.9.9 2.5.9 3.4 0l19-19c.9-.9.9-2.5 0-3.4z" fill="#F05033" /></>,
    fastapi: <><circle cx="24" cy="24" r="22" fill="#009688" /><text x="24" y="32" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold">⚡</text></>,
    nodejs: <><path d="M24 3.6L5.5 14.4v21.2L24 46.4l18.5-10.8V14.4L24 3.6z" fill="#339933" /><path d="M24 22v11l9.5-5.5V22L24 16.5 14.5 22v5.5L24 33" fill="#fff" opacity="0.3" /></>,
  };

  return (
    <svg viewBox="0 0 48 48" className={styles.icon}>
      {icons[icon] || <circle cx="24" cy="24" r="20" fill={color} opacity="0.3" />}
    </svg>
  );
}

export default function Skills() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="skills" className={`${styles.skills} section`}>
      <div className="container">
        <SectionTitle title="Skills & Technologies" />
        <motion.div
          ref={ref}
          className={styles.grid}
          initial="hidden"
          animate={isVisible ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {skills.map(skill => (
            <motion.div
              key={skill.name}
              className={styles.card}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
            >
              <div className={styles.iconWrap}>
                <SkillIcon icon={skill.icon} color={skill.color} />
              </div>
              <span className={styles.name}>{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
