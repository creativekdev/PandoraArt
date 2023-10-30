import React from 'react';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

function Error505Page() {
    const { t } = useTranslation();
    const history = useHistory();

    const goHome = () => {
        history.push('/home');
    }

    return (
        <div className="flex flex-col flex-1 items-center justify-center p-80">
            <h1>{ t('error.notfound') }</h1>
            <Button color='secondary' onClick={goHome}>{ t('generate.goButton') }</Button>
        </div>
    );
}

export default Error505Page;