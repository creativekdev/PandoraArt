import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    itemText: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '22px',
        color: '#8185A9'
    }
}));

export default function ItemsList(props) {
    let title = props.title;
    let data = props.list;

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

  return (
    <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                {title}
            </ListSubheader>
        }
        className={classes.root}
        >
        {
            data.map((item, index) => {
                return (
                    <ListItem
                        component={Link}
                        to={item.link}
                        key={index}
                        button
                    >
                        <ListItemText className={classes.itemText} primary={item.title} />
                    </ListItem>
                );
            })
        }
    </List>
  );
}