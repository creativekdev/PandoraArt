import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import './style.scss';

function GeneratePage() {
    const { t } = useTranslation();
    const history = useHistory();

    const goToHome = () => {
        history.push('/home');
    }

    return (
        <Grid className='grid-container' container spacing={0}>
            <Grid className='ptr-32-20 w-full h-full' item lg={3} md={4} sm={12}>
                <div className='left-side-bar'>
                    <p className='mlr-auto' dangerouslySetInnerHTML={{ __html: t('generate.leftSidebar')} }></p>
                </div>
            </Grid>
            <Grid className='w-full h-full' item lg={9} md={8} sm={12}>
                <div className='main-content'>
                    <div className='mlr-auto'>
                        <p dangerouslySetInnerHTML={{ __html: t('generate.description')} }></p>
                        <Button color='secondary' onClick={goToHome}>{ t('generate.goButton') }</Button>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}

export default GeneratePage;
