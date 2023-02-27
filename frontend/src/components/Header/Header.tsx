export default function Header({ text }: { text: string }) {
  return (
    <span style={{'textAlign': 'center'}}>
      <h1 style={{'color': '#538316'}}>{text}</h1>
    </span>
  );
}
