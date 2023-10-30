import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuBar from '../../shared-components/MenuBar';

const useStyles = makeStyles((theme) => ({
    root: {},
}));

function ToolbarLayout1(props) {
    const toolbarTheme = useSelector(selectToolbarTheme);
    const user = useSelector(({ auth }) => auth.user);
    const classes = useStyles(props);
    const { i18n, t } = useTranslation();

    return (
        <ThemeProvider theme={toolbarTheme}>
            <AppBar
              id="fuse-toolbar"
              className={clsx(classes.root, 'flex relative z-20 shadow-md', props.className)}
              color="default"
              style={{ backgroundColor: toolbarTheme.palette.background.paper, justifyContent: 'space-between', borderBottom: '1px solid #3F416B' }}
              position="static"
            >
                <Toolbar className="p-0 min-h-48 md:min-h-64 h-70 justify-between">
                    <MenuBar props={props}/>
                    <div className="flex items-center px-8 h-full overflow-x-auto">
                        <p>Pandoraart</p>
                    </div>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default memo(ToolbarLayout1);
