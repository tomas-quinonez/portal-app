import { protectRoutes } from '@hilla/react-auth';
import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

const ApplicationView = lazy(async () => import('Frontend/views/application/ApplicationView.js'));
const OrganisationView = lazy(async () => import('Frontend/views/organisation/OrganisationView.js'));
const UserView = lazy(async () => import('Frontend/views/user/UserView.js'));
const MyApplicationsView = lazy(async () => import('Frontend/views/application/MyApplicationsView.js'));

export const routes: RouteObject[] = protectRoutes([
    {
        element: <MainLayout />,
        handle: { title: 'Main', requiresLogin: true },
        children: [
            { path: '/', element: <MyApplicationsView />, handle: { title: 'Portal Aplicaciones' } },
            { path: '/abm/applications', element: <ApplicationView />, handle: { title: 'Aplicaciones' } },
            { path: '/abm/organisations', element: <OrganisationView />, handle: { title: 'Organismos' } },
            { path: '/abm/users', element: <UserView />, handle: { title: 'Usuarios' } },
        ],
    },
]);

export default createBrowserRouter(routes);
