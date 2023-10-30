import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import './style.scss';

function HomePage() {
  const { t } = useTranslation();
  const history = useHistory();

  const goToGenerate = () => {
    history.push('/generate');
  };

  return (
    <>
      <div className="flex flex-col flex-1 items-center justify-center">
        <p dangerouslySetInnerHTML={{ __html: t('home.description') }} />
        <Button color="secondary" onClick={goToGenerate}>
          {t('home.goButton')}
        </Button>
      </div>
    </>
  );
}

export default HomePage;
