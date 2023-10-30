import { lazy } from 'react';
import { authRoles } from 'app/auth';

const GeneratePageConfig = {
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
            path: '/generate',
            exact: true,
            component: lazy(() => import('./GeneratePage')),
        },
    ],
};

export default GeneratePageConfig;
