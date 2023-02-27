import styles from './PulsatingCircle.module.scss';

export function PulsatingCircle() {
  return (
<div className={styles.wrapper}>
  <span className={`${styles.ring} ${styles.ring1}`}></span>
  <span className={`${styles.ring} ${styles.ring2}`}></span>
  <span className={`${styles.ring} ${styles.ring3}`}></span>
  <span className={`${styles.ring} ${styles.ring4}`}></span>
  <span className="arrow"></span>
  <img className={styles.seagull} src="/seagull.png" alt={"seagull"}/>
  <img className={`${styles.seagull} ${styles.seagull2}`} src="/seagull.png" alt={"seagull"}/>
</div>
  );
}