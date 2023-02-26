import buttonStyles from './Button.module.scss';

type ButtonProps = {
  style?: React.CSSProperties;
  buttonType?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ buttonType, onClick, style, children }: ButtonProps) {
  buttonType = buttonType || 'primary';
  return (
    <button style={style} className={`${buttonStyles.button} ${buttonStyles[buttonType]}`} onClick={onClick}>
      {children}
    </button>
  );
}

type AnchorButtonProps = {
  style?: React.CSSProperties;
  buttonType?: string;
  children: React.ReactNode;
  anchor: string;
}

export function AnchorButton({ buttonType, style, children, anchor }: AnchorButtonProps) {
  buttonType = buttonType || 'primary';
  return (
    <a style={style} className={`${buttonStyles.button} ${buttonStyles.anchor} ${buttonStyles[buttonType]}`} href={anchor}>
      {children}
    </a>
  );
}