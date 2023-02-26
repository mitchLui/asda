import styles from './PulsatingCircle.module.scss';

export function PulsaingCircle() {
  return (
<div className={styles.wrapper}>
  <span className={`${styles.ring} ${styles.ring1}`}></span>
  <span className={`${styles.ring} ${styles.ring2}`}></span>
  <span className={`${styles.ring} ${styles.ring3}`}></span>
  <span className={`${styles.ring} ${styles.ring4}`}></span>
  <span className="arrow"></span>
</div>
  );
}