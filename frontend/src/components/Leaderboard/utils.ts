export type Score = {
  game_mode: number;
  score: number;
  username: string
  id: string;
  owner: string;
}

export async function getLeaderboard() {
  const response = await fetch('http://localhost:8000/scores/0');
  const data = await response.json().then((data: Score[]) => data);
  return data;
}