import { lazy } from 'react';

const Error505PageConfig = {
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
      path: '/errors/505',
      exact: true,
      component: lazy(() => import('./Error505Page')),
    },
  ],
};

export default Error505PageConfig;
