import { useState, useEffect } from 'react';
import styles from './Leaderboard.module.scss';
import { Score, getLeaderboard } from './utils';

export default function Leaderboard() {
  const [scores, setScores] = useState([] as Score[]);


  useEffect(() => {
    const fetchScores = async () => {
      const scores = await getLeaderboard();
      setScores(scores);
      };
      fetchScores();
        
    }, []);

  return (
    <>
    <ul className={styles.item_wrapper}>
      <h4 className={styles.item__title}>Leaderboard:</h4>
      {scores.map((row: Score) => (
        <li className={styles.item} key={row.score_id}>
          <span className={styles.item__name}>{row.username}</span>
          <span className={styles.item__score}>{row.score}</span>
        </li>
      ))}
    </ul>
    </>
  );
}