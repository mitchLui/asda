import buttonStyles from './Button.module.scss';

type ButtonProps = {
  style?: React.CSSProperties;
  buttonType?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ buttonType, onClick, style, children, className }: ButtonProps) {
  buttonType = buttonType || 'primary';
  return (
    <button style={style} className={`${buttonStyles.button} ${buttonStyles[buttonType]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}