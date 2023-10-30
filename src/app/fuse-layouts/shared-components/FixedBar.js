import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: 'var(--page-background-color)',
  },
  textStyle: {
    color: '#8185A9',
    padding: '24px 0 24px 0'
  }
}));

export default function FixedBar() {
  const classes = useStyles();
  const { i18n, t } = useTranslation();

  return (
    <div className={classes.root}>
        <Grid container>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={10}>
                <Typography className={clsx('text-center sample-text-style', classes.textStyle)}>
                    { t('footer.mark') }
                </Typography>
            </Grid>
            <Grid item xs={1}>
            </Grid>
        </Grid>
        <Divider />
    </div>
  );
}