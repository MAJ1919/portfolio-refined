import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ExternalLink } from 'lucide-react';

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { projects } from '../../data/projects';
import styles from './Projects.module.css';

function ProjectImage({ project }) {
  const isUrl = project.id === 'url-shortener';
  return (
    <svg viewBox="0 0 600 340" className={styles.image}>
      <defs>
        <linearGradient id={`grad-${project.id}`}>
          <stop offset="0%" stopColor={project.gradient[0]} />
          <stop offset="100%" stopColor={project.gradient[1]} />
        </linearGradient>
      </defs>
      <rect width="600" height="340" rx="12" fill="#0f172a" />
      <rect y="0" width="600" height="36" rx="12" fill="#1e293b" />
      <circle cx="20" cy="18" r="5" fill="#ef4444" />
      <circle cx="38" cy="18" r="5" fill="#f59e0b" />
      <circle cx="56" cy="18" r="5" fill="#22c55e" />
      {isUrl ? (
        <>
          <rect x="40" y="70" width="380" height="44" rx="10" fill="#1e293b" stroke={project.gradient[0]} strokeWidth="2" />
          <text x="60" y="98" fill="#94a3b8" fontSize="14">https://example.com/very-long-url...</text>
          <rect x="435" y="70" width="125" height="44" rx="10" fill={`url(#grad-${project.id})`} />
          <text x="468" y="97" fill="#fff" fontSize="14" fontWeight="600">Shorten</text>
          <rect x="60" y="215" width="20" height="80" rx="4" fill={project.gradient[0]} opacity="0.4" />
          <rect x="95" y="195" width="20" height="100" rx="4" fill={project.gradient[0]} opacity="0.55" />
          <rect x="130" y="230" width="20" height="65" rx="4" fill={project.gradient[0]} opacity="0.45" />
          <rect x="165" y="175" width="20" height="120" rx="4" fill={project.gradient[0]} opacity="0.7" />
          <rect x="350" y="180" width="200" height="110" rx="10" fill="#1e293b" />
          <text x="370" y="210" fill={project.gradient[0]} fontSize="12" fontWeight="600">TOTAL CLICKS</text>
          <text x="370" y="240" fill="#fff" fontSize="28" fontWeight="800">1,247</text>
          <text x="370" y="265" fill="#94a3b8" fontSize="11">Redirect Chain: 3 hops</text>
        </>
      ) : (
        <>
          <g transform="translate(40,55)">
            <rect x="0" y="15" width="100" height="70" rx="8" fill="none" stroke="#F59E0B" strokeWidth="3" />
            <polyline points="0,15 50,55 100,15" fill="none" stroke="#F59E0B" strokeWidth="3" />
          </g>
          <rect x="170" y="55" width="190" height="75" rx="10" fill="#1e293b" />
          <text x="190" y="80" fill="#F59E0B" fontSize="11" fontWeight="600">EMAILS SENT</text>
          <text x="190" y="112" fill="#fff" fontSize="30" fontWeight="800">342</text>
          <rect x="390" y="55" width="170" height="75" rx="10" fill="#1e293b" />
          <text x="410" y="80" fill="#22c55e" fontSize="11" fontWeight="600">OPEN RATE</text>
          <text x="410" y="112" fill="#fff" fontSize="30" fontWeight="800">68.4%</text>
          <line x1="40" y1="170" x2="560" y2="170" stroke="#334155" strokeWidth="2" />
          <circle cx="80" cy="170" r="8" fill="#F59E0B" />
          <circle cx="220" cy="170" r="8" fill="#22c55e" />
          <circle cx="370" cy="170" r="8" fill="#6366F1" />
          <circle cx="510" cy="170" r="8" fill="#818CF8" />
          <rect x="40" y="220" width="520" height="40" rx="8" fill="#1e293b" />
          <text x="85" y="237" fill="#fff" fontSize="12">Weekly Newsletter – Campaign #12</text>
          <text x="85" y="253" fill="#94a3b8" fontSize="10">Opened: 234 · Clicked: 89 · Bounced: 2</text>
        </>
      )}
    </svg>
  );
}

export default function Projects() {
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [ref, isVisible] = useScrollReveal();

  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const s = search.toLowerCase();
      const matchSearch = !s || p.title.toLowerCase().includes(s) || p.tags.some(t => t.toLowerCase().includes(s));
      const matchTag = !tagFilter || p.tags.some(t => t.toLowerCase() === tagFilter.toLowerCase());
      return matchSearch && matchTag;
    });
  }, [search, tagFilter]);

  return (
    <section id="projects" className={`${styles.projects} section`}>
      <div className="container">
        <SectionTitle title="Featured Projects" />

        <motion.div
          ref={ref}
          className={styles.controls}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.searchContainer}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search projects..."
              aria-label="Search projects"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className={styles.sortContainer}>
            <SlidersHorizontal size={16} className={styles.sortIcon} />
            <select
              className={styles.sortSelect}
              aria-label="Filter by technology"
              value={tagFilter}
              onChange={e => setTagFilter(e.target.value)}
            >
              <option value="">All Technologies</option>
              {allTags.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </motion.div>

        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filtered.map(project => (
              <motion.article
                key={project.id}
                className={styles.card}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
              >
                <div className={styles.cardImage}>
                  <ProjectImage project={project} />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.tags}>
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className={styles.tag}
                        onClick={() => setTagFilter(tag)}
                        style={{ cursor: 'pointer' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDesc}>
                    <strong>The problem:</strong> {project.problem}{' '}
                    <strong>My approach:</strong> {project.approach}{' '}
                    <strong>What I learned:</strong> {project.learned}
                  </p>
                  <div className={styles.cardLinks}>
                    <Button
                      variant="primary"
                      size="sm"
                      comingSoon={!project.github}
                      href={project.github}
                      icon={<GithubIcon size={16} />}
                    >
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      comingSoon={!project.demo}
                      href={project.demo}
                      icon={<ExternalLink size={16} />}
                    >
                      Live Demo
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              className={styles.empty}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>No projects match your search.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
