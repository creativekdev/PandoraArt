import { lazy } from 'react';

const Error404PageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: '/errors/404',
      exact: true,
      component: lazy(() => import('./Error404Page')),
    },
  ],
};

export default Error404PageConfig;
