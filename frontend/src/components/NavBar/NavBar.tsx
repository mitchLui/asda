import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';

export default function NavBar() {
  return (
    <>
    <div style={{'display': 'flex','justifyContent': 'space-between', 'marginBottom': '16px'}}>
      <div style={{'display': 'flex'}}>
        <div style={{'height': '32px', 'width': '32px', 'marginTop': '2px'}}>
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5 23a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-16a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm-6-8a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm9-8a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-19a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5z" fill="#3d3d3d" fillRule="evenodd">
            </path>
          </svg>
        </div>
        <div style={{'textAlign': 'left'}}>
          <span style={{'fontSize': '30px', 'color': '#538316', fontWeight: '900'}}>ASDA</span>
          <span style={{'paddingLeft': '10px'}}>Anti-Seagull Defence Apparatus</span><br/>
        </div>
      </div>
      <div style={{'textAlign': 'right'}}>
        <Button buttonType="action">Sign In</Button>
      </div>
    </div>
    <div>
      <div style={{'display': 'flex', 'justifyContent': 'center', 'marginBottom': '10px'}}>
        <Link className={styles.link} to="/">Home</Link>
        <a className={styles.link} href="/#technology">Technology</a>
        <a className={styles.link} href="/#stories">Stories</a>
        <Link className={styles.link} to="/demo">Demo</Link>
        <Link className={styles.link} to="/about">About</Link>
      </div>
    </div>
    </>
  );
}