export type Score = {
  score: number;
  username: string
  user_id: string;
  score_id: string;
}

export type User = {
  username: string;
  id: number;
  owner_id: string;
  scores: Score[];
}

export async function getLeaderboard() {
  const response = await fetch('http://localhost:8000/scores/0');
  const data = await response.json().then((data: Score[]) => data);
  return data;
}

export async function createUser(username: string) {
  const response = await fetch('http://localhost:8000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // super insecure but oh well
    body: JSON.stringify({ username, password: 'password' }),
  });
  const data = await response.json().then((data: User) => data);
  return data;
}

export async function createScore(user_id: string) {
  const response = await fetch(`http://localhost:8000/users/${user_id}/score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // super insecure but oh well
    body: JSON.stringify({ 'game_mode': 0, 'score':  0}),
  });
  const data = await response.json().then((data: Score) => data);
  return data;
}

export async function updateScore(score_id: string, new_score: number) {
  const response = await fetch(`http://localhost:8000/scores/${score_id}?score=${new_score}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json().then((data: Score) => data);
  return data;
}