import React from "react";
import Item from "./Item";
import styles from './Leaderboard.module.scss';

export default function List({ data }) {
  return (
    <>
    <ul className={styles.item_wrapper}>
      <h4 className={styles.item__title}>Leaderboard:</h4>
      {data.map(row => (
        <Item row={row} key={row.userID} />
      ))}
    </ul>
    </>
  );
}