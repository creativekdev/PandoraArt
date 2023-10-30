import { lazy } from 'react';

const HomePageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: true,
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
      path: '/home',
      exact: true,
      component: lazy(() => import('./HomePage')),
    },
  ],
};

export default HomePageConfig;
