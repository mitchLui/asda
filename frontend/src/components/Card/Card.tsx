import { useState } from 'react';
import Button from '../Button/Button';
import cardStyles from './Card.module.scss';

type CardProps = {
  title: string;
  description: string;
  detail: string;
  image: string;
  imageAlt: string;
  storyURL: string;
}

export default function Card({ title, description, detail, image, imageAlt, storyURL }: CardProps) {
  const [showMore, setShowMore] = useState(false);
  return (
    <article className={cardStyles.main}>
      <div className={cardStyles.content}>
      {
        showMore ? 
        <div>
          <div style={{'color': '#538316', 'textAlign': 'center', 'fontSize': '30px', 'alignItems': 'center', 'justifyContent': 'center'}}>
            {detail}
          </div>
        </div> : 
        <div>
          <h3 style={{'color': '#538316'}}>{title}</h3>
          <div style={{'textAlign': 'center'}}>
            <img width={250} height={250} src={image} alt={imageAlt}/>
          </div>
          <p>{description}</p>
          <p><a href={storyURL}>Source</a></p>
        </div>
      }
      </div>
      <Button onClick={() => {setShowMore(!showMore)}}>{showMore ? "Hide" : "with ASDA..."}</Button>
    </article>
  )
}