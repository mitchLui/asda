import { useState } from 'react';
import styles from './HomePage.module.scss';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Grid from '../../components/Grid/Grid';
import Header from '../../components/Header/Header';
import PostcodeChecker from '../../components/PostcodeChecker/PostcodeChecker';
import { PulsatingCircle } from '../../components/PulsatingCircle/PulsatingCircle';
import { stories, Story } from '../../data/stories';

function About({onClose = () => {}}) {
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
            <Button onClick={()=>{onClose()}}>Close</Button>
          </div>
      </div>
    </div>
  )
}

function HomePage() {
  const [showAbout, setShowAbout] = useState(false);;

  return (
    <div className={styles.main} id="home">
      {
        showAbout && <About onClose={()=>{setShowAbout(!showAbout)}}/>
      }
      <span style={{'fontSize': '25px'}}>Hello. <span style={{'color': '#0073b1'}}>Sign in</span><span style={{'fontWeight': '400'}}> for the best experience. New to Asda? </span><span style={{'color': '#0073b1'}}>Register</span></span>
      <div className={styles.postcode} style={{'marginTop': '10px', 'backgroundColor': '#d5e7c7', 'justifyContent': 'space-between'}}>
        <div className={styles.postcodetxt} style={{'margin': '15px', 'textAlign': 'left'}}>
          <h3>We protect people, dogs and your fish and chips from the threat of seagulls,<br/>
          and we do it with the best technology available to create our utopia.<br/>
          <span style={{'fontWeight': '800'}}>We are <span style={{'color': '#538316'}}>ASDA</span>.</span></h3>
          <div style={{'marginTop': '10px'}}>
            <Button>How it works</Button>
            <Button>See it in action</Button>
          </div>
          </div>
        <div className={styles.postcodechecker} style={{'margin': 'auto 30px auto 0px', 'textAlign': 'right', 'display': 'inline-block',}}>
          <PostcodeChecker/>
        </div>
      </div>
      <div>
      </div>
      <div className={styles.technology} >        
        <div className={styles.technologytxt} style={{'marginLeft': '16px', 'width': '50%', zIndex: '1', 'textAlign': 'left'}}>
          <h1 style={{'color': '#538316', 'paddingTop': '15px'}}>Technology</h1>
          <span style={{'fontSize': '20px'}}>Using our proprietary SonicBarrier technology, we can prevent seagulls from entering a protected area
          by emitting a high frequency sound that is inaudible to humans but deters seagulls.</span>
          <p><Button>See it in action</Button></p>
        </div>
        <div className={styles.technologyimg}>
          <PulsatingCircle/>
        </div>
      </div>
      <div id="stories">
        <Header text={"Stories"}/>
        <Grid>
          {
            stories.map((story: Story) => {
              return (
                <Card 
                  key={story.id} 
                  title={story.title} 
                  description={story.description} 
                  detail={story.detail} 
                  image={story.image}
                  imageAlt={story.imageAlt}
                  storyURL={story.storyURL}
                />
              );
            })
          }
        </Grid>
      </div>
      <div style={{'textAlign': 'center', 'padding': '16px'}}>
        <Button>See the demo</Button>
        <Button>Buy an ASDA</Button>
      </div>
      <div style={{'textAlign': 'center', 'fontWeight': '600'}}>N.B. This is a student project and is not in any way affiliated with ASDA the supermarket chain.</div>
    </div>
  );
}

export default HomePage;
