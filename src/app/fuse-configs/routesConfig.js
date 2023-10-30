import FuseUtils from '@fuse/utils';
import mainConfig from 'app/main/mainConfig';
import { Redirect } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import { useHistory } from 'react-router';

const routeConfigs = [
  ...mainConfig,
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: '/',
    exact: true,
    component: () => {
      const history = useHistory();
      const searchParam = new URLSearchParams(window.location.search).get('search');
      
      if(searchParam) {
        return (
          <Redirect to={`/home?search=${encodeURIComponent(searchParam)}`} />
        );
      } else {
        return (
          <Redirect to="/home" />
        );
      }   
    },
  },
  {
    path: '/loading',
    exact: true,
    component: () => <FuseLoading />,
  },
  {
    component: () => <Redirect to="/errors/404" />,
  },
];

export default routes;
