import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import './style.scss';
import Masonry from 'react-masonry-css';
import CardImage from '../components/CardImage';
import HorizontalScroll from '../components/HorizontalScroll';

function HomePage() {
  const { t } = useTranslation();
  const history = useHistory();

  const goToGenerate = () => {
    history.push('/generate');
  };

  return (
    <>
      <div className="flex flex-col flex-1 items-center justify-center">
        <HorizontalScroll />
        <Masonry
          breakpointCols={{
            default: 5,
            1920: 5,
            1600: 5,
            1366: 4,
            1280: 3,
            960: 2,
            600: 2,
            480: 1,
          }}
          className="my-masonry-grid flex w-full"
          columnClassName="my-masonry-grid_column flex flex-col p-0 md:p-8"
          l
        >
          {/* Your Masonry items here */}
          <CardImage url="https://image7.cdn2.seaart.ai/static/0d46839f6371fb84f6b6c682f5fc2c77/20230422/b424995d22b8d51e2801bfedd4388d5f.jpeg" />
          <CardImage url="https://image10.cdn2.seaart.ai/static/07168af6cb0ef9f78dae15739dd73255/20230628/ad96860506afb9995cb3f368996a2b6d.jpeg" />
          <CardImage url="https://image7.cdn2.seaart.ai/static/0d46839f6371fb84f6b6c682f5fc2c77/20230422/b424995d22b8d51e2801bfedd4388d5f.jpeg" />
          <CardImage url="https://image10.cdn2.seaart.ai/static/07168af6cb0ef9f78dae15739dd73255/20230628/ad96860506afb9995cb3f368996a2b6d.jpeg" />
          <CardImage url="https://image7.cdn2.seaart.ai/static/0d46839f6371fb84f6b6c682f5fc2c77/20230422/b424995d22b8d51e2801bfedd4388d5f.jpeg" />
          <CardImage url="https://image10.cdn2.seaart.ai/static/07168af6cb0ef9f78dae15739dd73255/20230628/ad96860506afb9995cb3f368996a2b6d.jpeg" />
          <CardImage url="https://image7.cdn2.seaart.ai/static/0d46839f6371fb84f6b6c682f5fc2c77/20230422/b424995d22b8d51e2801bfedd4388d5f.jpeg" />
          <CardImage url="https://image10.cdn2.seaart.ai/static/07168af6cb0ef9f78dae15739dd73255/20230628/ad96860506afb9995cb3f368996a2b6d.jpeg" />
          <CardImage url="https://image7.cdn2.seaart.ai/static/0d46839f6371fb84f6b6c682f5fc2c77/20230422/b424995d22b8d51e2801bfedd4388d5f.jpeg" />
          <CardImage url="https://image10.cdn2.seaart.ai/static/07168af6cb0ef9f78dae15739dd73255/20230628/ad96860506afb9995cb3f368996a2b6d.jpeg" />
          <CardImage url="https://image7.cdn2.seaart.ai/static/0d46839f6371fb84f6b6c682f5fc2c77/20230422/b424995d22b8d51e2801bfedd4388d5f.jpeg" />
          <CardImage url="https://image10.cdn2.seaart.ai/static/07168af6cb0ef9f78dae15739dd73255/20230628/ad96860506afb9995cb3f368996a2b6d.jpeg" />
          <CardImage url="https://image7.cdn2.seaart.ai/static/0d46839f6371fb84f6b6c682f5fc2c77/20230422/b424995d22b8d51e2801bfedd4388d5f.jpeg" />
          <CardImage url="https://image10.cdn2.seaart.ai/static/07168af6cb0ef9f78dae15739dd73255/20230628/ad96860506afb9995cb3f368996a2b6d.jpeg" />
          <CardImage url="https://image7.cdn2.seaart.ai/static/0d46839f6371fb84f6b6c682f5fc2c77/20230422/b424995d22b8d51e2801bfedd4388d5f.jpeg" />
          <CardImage url="https://image10.cdn2.seaart.ai/static/07168af6cb0ef9f78dae15739dd73255/20230628/ad96860506afb9995cb3f368996a2b6d.jpeg" />

          {/* ... */}
        </Masonry>
      </div>
    </>
  );
}

export default HomePage;
