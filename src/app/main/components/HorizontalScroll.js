import { useRef } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './style.scss';

function HorizontalScroll(props) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 200; // Adjust the value for desired scroll amount
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 200; // Adjust the value for desired scroll amount
  };

  return (
    <div className="horizontal-scroll-container">
      <Button onClick={scrollLeft} variant="contained" color="secondary">&lt;</Button>
      <div className="horizontal-scroll" ref={scrollRef}>
        {Array.from({ length: 20 }).map((_, index) => (
          <Typography key={index} className="scroll-item">
            <Button variant="contained" color="primary">
              <img
                className="tag-item"
                src="https://image4.cdn2.seaart.ai/static/upload/20231016/fd671e61-18c4-4b2c-99b0-632004c0f6ce_low.webp"
              />
              <span className='tag-itme-span'>Photography</span>
            </Button>
          </Typography>
        ))}
      </div>
      <Button onClick={scrollRight} variant="contained" color="secondary">&gt;</Button>
    </div>
  );
}

export default HorizontalScroll;
