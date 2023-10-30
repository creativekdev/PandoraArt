import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useTranslation, withTranslation } from 'react-i18next';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        padding: '0 !important',
        height: '100%'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    menuIcon: {
        cursor: 'pointer',
    },
  
    listItem: {
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        color: 'var(--footer-text-color)',
        borderBottom: 'var(--header-border-bottom)',
        textAlign: 'center',
        '&:hover': {
            color: 'var(--white)',
            backgroundColor: 'var(--default-background-color)',
        },
    },

    selectedListItem: {
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        color: 'var(--white)',
        backgroundColor: 'transparent !important',
        textAlign: 'center',
    },
    '@media (min-width: 960px)': {
        selectedListItem: {
            borderBottom: 'var(--header-border-selected-bottom)',
        },
    },
}));

const LabelBottomNavigation = (props) => {
    const { i18n, t } = useTranslation();
    const classes = useStyles();
    const [value, setValue] = useState('/home');
    const [menuOpen, setMenuOpen] = useState(false);
    const history = useHistory();

    const handleChange = (event, newValue) => {
        switch(newValue) {
            case "/home":
                setValue('/home');
                history.push(`/home`);
                break;
            case "/generate":
                setValue('/generate');
                history.push(`/generate`);
                break;
            default:
                setValue('/home');
                history.push(`/home`);
                break;
        }
    };

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <Hidden smDown>
                <List component="nav" aria-label="main navigation" className={classes.root}>
                    <ListItem
                        button
                        selected={value === '/home'}
                        onClick={() => handleChange(null, '/home')}
                        className={value === '/home' ? classes.selectedListItem : classes.listItem}>
                        <ListItemText primary={ t('menu.home') } />
                    </ListItem>
                    <ListItem
                        button
                        selected={value === '/generate'}
                        onClick={() => handleChange(null, '/generate')}
                        className={value === '/generate' ? classes.selectedListItem : classes.listItem}>
                        <ListItemText primary={ t('menu.generate') } />
                    </ListItem>
                </List>
            </Hidden>
            <Hidden mdUp>
                <MenuIcon className={classes.menuIcon} onClick={handleMenuClick} />
                <Drawer anchor="top" open={menuOpen} onClose={handleMenuClick}>
                    <List component="nav" aria-label="main navigation">
                        <ListItem
                            button
                            selected={value === '/home'}
                            onClick={() => {
                              handleChange(null, '/home');
                              handleMenuClick();
                            }}
                            className={value === '/home' ? classes.selectedListItem : classes.listItem}>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem
                            button
                            selected={value === '/generate'}
                            onClick={() => {
                              handleChange(null, '/generate');
                              handleMenuClick();
                            }}
                            className={value === '/generate' ? classes.selectedListItem : classes.listItem}>
                            <ListItemText primary="Generate" />
                        </ListItem>
                    </List>
                </Drawer>
            </Hidden>
        </>
    );
}

export default withTranslation()(LabelBottomNavigation);