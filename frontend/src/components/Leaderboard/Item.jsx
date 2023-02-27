import React from "react";
import styles from './Leaderboard.module.scss';

export default function Item({ row }) {
  return (
    <li className={styles.item}>
      <span className={styles.item__name}>{row.name}</span>
      <span className={styles.item__score}>{row.score}</span>
    </li>
  );
}
