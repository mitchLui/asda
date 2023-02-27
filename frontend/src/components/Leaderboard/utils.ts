export type Score = {
  score: number;
  username: string
  user_id: string;
  score_id: string;
}

export async function getLeaderboard() {
  const response = await fetch('http://localhost:8000/scores/0');
  const data = await response.json().then((data: Score[]) => data);
  return data;
}