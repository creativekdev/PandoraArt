import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { makeStyles } from '@material-ui/core/styles';
import Navigation from 'app/fuse-layouts/shared-components/Navigation';
import clsx from 'clsx';
import { memo } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
}));

function NavbarLayout2(props) {
  const classes = useStyles(props);

  return (
    <div className={clsx('w-full shadow-md', classes.root, props.className)}>
      <div
        className={clsx(
          'flex flex-auto justify-between items-center w-full h-full container p-0 lg:px-24 z-20'
        )}
      >
        <FuseScrollbars className="flex h-full items-center">
          <Navigation className="w-full" layout="horizontal" />
        </FuseScrollbars>
      </div>
    </div>
  );
}

export default memo(NavbarLayout2);
