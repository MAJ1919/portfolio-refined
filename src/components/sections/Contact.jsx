import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Contact.module.css';

export default function Contact() {
  const [ref, isVisible] = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = (field, value) => {
    if (!value.trim()) return `${field} is required.`;
    if (field === 'Email') {
      if (!/@/.test(value)) return `Please include an '@' in the email address.`;
      if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(value)) return `Please enter a valid email address.`;
    }
    return '';
  };

  const handleBlur = (field, key) => {
    const err = validate(field, form[key]);
    setErrors(prev => ({ ...prev, [key]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: validate('Name', form.name),
      email: validate('Email', form.email),
      message: validate('Message', form.message),
    };
    setErrors(newErrors);
    if (!Object.values(newErrors).some(Boolean)) {
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionTitle
          title="Get In Touch"
          subtitle="Have a project idea, a question, or just want to say hello? I'd love to hear from you."
        />
        <motion.form
          ref={ref}
          className={styles.form}
          noValidate
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 32 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.group}>
            <label htmlFor="contact-name" className={styles.label}>Name</label>
            <input
              type="text" id="contact-name"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="Your full name" required
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              onBlur={() => handleBlur('Name', 'name')}
              onFocus={() => setErrors(p => ({ ...p, name: '' }))}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
          <div className={styles.group}>
            <label htmlFor="contact-email" className={styles.label}>Email</label>
            <input
              type="email" id="contact-email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="you@example.com" required
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              onBlur={() => handleBlur('Email', 'email')}
              onFocus={() => setErrors(p => ({ ...p, email: '' }))}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          <div className={`${styles.group} ${styles.full}`}>
            <label htmlFor="contact-message" className={styles.label}>Message</label>
            <textarea
              id="contact-message"
              className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
              placeholder="Write your message here..." rows="6" required
              value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              onBlur={() => handleBlur('Message', 'message')}
              onFocus={() => setErrors(p => ({ ...p, message: '' }))}
            />
            <div className={styles.charCount}>{form.message.length} / 1000</div>
            {errors.message && <span className={styles.error}>{errors.message}</span>}
          </div>
          <motion.button
            type="submit"
            className={`${styles.submit}`}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Send Message</span>
            <Send size={20} />
          </motion.button>
          {success && (
            <motion.div
              className={styles.success}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle size={24} />
              <span>Message validated successfully! (Demo form — messages are not sent)</span>
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
