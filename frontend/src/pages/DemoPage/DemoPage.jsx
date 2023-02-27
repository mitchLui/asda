import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { Demo } from '../../components/Demo/Demo'
import NavBar from '../../components/NavBar/NavBar'
import List from '../../components/Leaderboard/List'
import { getInitialData, genNextData } from "../../components/Leaderboard/tmpdata/data";

export default function DemoPage() {
  const [data, setData] = useState(getInitialData());
  // Not sure what this is for
  // const doSwitch = () => {
  //   setData(d => {
  //     [d[0], d[1]] = [d[1], d[0]];
  //     d[0].score += 1000;
  //     d[1].score += 2000;
  //     return [...d];
  //   });
  // };

  return (
    <>
    <div>
      <Demo/>
      <List data={data} />
    </div>
    </>
  )
}