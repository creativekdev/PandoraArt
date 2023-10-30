import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import FixedBar from 'app/fuse-layouts/shared-components/FixedBar';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'theme.palette.background.paper',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    gridStyle: {
        color: 'var(--footer-text-color)'
    },
    socialStyle: {
        marginTop: '12px',
        justifyContent: 'center !important'
    },
    footerMenuBtn: {
        color: 'var(--footer-text-color)',
        textDecoration: 'none !important'
    }
}));

function FooterLayout1(props) {
    const { i18n, t } = useTranslation();
    const footerTheme = useSelector(selectFooterTheme);
    const history = useHistory();
    const classes = useStyles();
    
    const handleFooter = (url) => {
        history.push(url);
        localStorage.setItem('redirectUrl', url);
    };

    return (
        <ThemeProvider theme={footerTheme}>
            <AppBar
              id="fuse-footer"
              className={clsx('relative z-20 shadow-md', props.className)}
              color="default"
              style={{ backgroundColor: 'var(--page-background-color)' }}
            >
                <Divider />
                <Toolbar className="min-h-48 md:min-h-64 px-8 sm:px-12 py-0 items-center overflow-x-auto block">
                    <p style={{ textAlign: 'center' }}>This is footer</p>
                </Toolbar>
                <FixedBar />
              </AppBar>
        </ThemeProvider>
    );
}

export default memo(FooterLayout1);
