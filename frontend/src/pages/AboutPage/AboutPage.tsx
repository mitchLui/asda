import styles from './AboutPage.module.scss';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';

function About() {
  return (
    <div className={styles.about}>    
      <div className={styles.aboutcontent}>
          <Header text={"About the project"} />
          <div>
            <p>
              Hopefully you'll have realised by now that this is a parody of ASDA (the supermarket chain)'s website. It just so happens
              that our thing was called the Anti Seagull Defence Apparatus (ASDA) and we thought it would be funny to make a website
              for it. We hope you enjoyed it!
            </p>
          </div>
          <div style={{'marginTop': '25px'}}>
            <Link to="/">Close</Link>
          </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <>
      <About/>
      <HomePage/>
    </>
  );
}
