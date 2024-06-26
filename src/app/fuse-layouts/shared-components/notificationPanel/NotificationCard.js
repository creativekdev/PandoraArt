import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    messageStyle: {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '150%',
      color: '#FFFFFF'
    }
}));

function NotificationCard(props) {
  const { item, className } = props;
  const { variant } = item.options;

  const classes = useStyles();

  const handleClose = () => {
    if (props.onClose) {
      props.onClose(item.id);
    }
  };

  function ItemIcon() {
    switch (variant) {
      case 'error': {
        return (
          <Icon className="mr-8 opacity-75" color="inherit">
            cancel
          </Icon>
        );
      }
      case 'success': {
        return (
          <Icon className="mr-8 opacity-75" color="inherit">
            check_circle
          </Icon>
        );
      }
      case 'warning': {
        return (
          <Icon className="mr-8 opacity-75" color="inherit">
            error_outline
          </Icon>
        );
      }
      case 'info': {
        return (
          <Icon className="mr-8 opacity-75" color="inherit">
            info
          </Icon>
        );
      }
      default: {
        return null;
      }
    }
  }
  return (
    <Card
      className={clsx(
        'flex items-center relative w-full rounded-16 p-20 min-h-64 shadow',
        variant === 'success' && 'bg-green-600 text-white',
        variant === 'info' && 'bg-blue-700 text-white',
        variant === 'error' && 'bg-red-600 text-white',
        variant === 'warning' && 'bg-orange-600 text-white',
        className
      )}
      elevation={0}
    >
      <ItemIcon />
      <Typography className={classes.messageStyle} component="div">{item.message}</Typography>
      <IconButton
        disableRipple
        className="right-5 absolute p-8"
        color="inherit"
        size="small"
        onClick={handleClose}
      >
        <Icon className="text-24 opacity-75" color="inherit">
          close
        </Icon>
      </IconButton>
      {item.children}
    </Card>
  );
}

export default NotificationCard;
