import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Download } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import Button from '../ui/Button';
import styles from './Resume.module.css';

const timeline = [
  {
    icon: <GraduationCap size={20} />,
    period: '2022 — Aug 2027 (Expected)',
    title: 'B.Sc. Software Engineering',
    org: 'King Fahd University of Petroleum & Minerals (KFUPM)',
    details: 'Focused on web development, software architecture, cloud computing, and AI/ML fundamentals. Active in hackathons and tech communities.',
  },
  {
    icon: <Briefcase size={20} />,
    period: '2024 — Present',
    title: 'Full-Stack Web Developer',
    org: 'Personal & Academic Projects',
    details: 'Building production-grade web applications using Python (FastAPI, Flask), JavaScript (React, Node.js), and cloud services. Projects include URL analytics platforms and email tracking systems.',
  },
  {
    icon: <Award size={20} />,
    period: '2023 — Present',
    title: 'Hackathon Participant & Open Source Contributor',
    org: 'Various Events',
    details: 'Competing in university and national hackathons. Contributing to open-source projects and building developer tools that solve real problems.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export default function Resume() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="resume" className={`${styles.resume} section`}>
      <div className="container">
        <SectionTitle title="Resume" subtitle="My education, experience, and achievements." />
        <motion.div
          ref={ref}
          className={styles.timeline}
          initial="hidden"
          animate={isVisible ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
        >
          {timeline.map((item, i) => (
            <motion.div key={i} className={styles.item} variants={fadeUp}>
              <div className={styles.iconWrap}>{item.icon}</div>
              <div className={styles.content}>
                <span className={styles.period}>{item.period}</span>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.org}>{item.org}</p>
                <p className={styles.details}>{item.details}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className={styles.downloadWrap}
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Button variant="outline" comingSoon icon={<Download size={16} />}>
            Download Full CV
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
