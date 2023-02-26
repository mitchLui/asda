import Button from '../Button/Button';
import Input from '../Input/Input';
import postcodeCheckerStyles from './PostcodeChecker.module.scss';

export default function PostcodeChecker() {
  return (
    <div className={postcodeCheckerStyles.main}>
      <div className={postcodeCheckerStyles.text}>
        <div className={postcodeCheckerStyles.icon}>
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 4a8 8 0 018 8c0 2.789-2.39 7.718-7.172 14.788a1 1 0 01-1.656 0C10.39 19.718 8 14.788 8 12a8 8 0 018-8zm0 2a6 6 0 00-6 6c0 2.736 2 6.879 6 12.427l.6-.842C20.2 18.458 22 14.596 22 12a6 6 0 00-6-6zm0 3a2 2 0 110 4 2 2 0 010-4z" fill="#3d3d3d"></path></svg>
        </div>
        <div>
          <span className={postcodeCheckerStyles.title}>Check if an ASDA is near you</span><br/>
          <span className={postcodeCheckerStyles.subtitle}>See delivery and collection options</span>
        </div>
      </div>
      <div>
        <Input name="postcode" value="Enter a postcode" />
        <Button>Check</Button>
      </div>
    </div>
  )
}