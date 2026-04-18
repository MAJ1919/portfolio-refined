import { motion } from 'framer-motion';
import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icon,
  comingSoon = false,
  disabled = false,
  className = '',
  ...props
}) {
  const classes = [
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    comingSoon && styles['btn--coming-soon'],
    disabled && styles['btn--disabled'],
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {icon && <span className={styles.btn__icon}>{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (href && !comingSoon) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      disabled={disabled || comingSoon}
      whileHover={!comingSoon && !disabled ? { y: -2, scale: 1.02 } : {}}
      whileTap={!comingSoon && !disabled ? { scale: 0.98 } : {}}
      {...props}
    >
      {content}
    </motion.button>
  );
}
