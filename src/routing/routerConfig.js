import Test from '../components/mainPage';
import Register from '../components/auth/register';
import Login from '../components/auth/login';

export default [
    {
        id: 1,
        Component: Test,
        path: '/',
        roles: [],
        isPrivate: false,

    },
    {
        id: 2,
        Component: Login,
        path: '/login',
        roles: [],
        isPrivate: false,

    },
    {
        id: 3,
        Component: Register,
        path: '/register',
        roles: [],
        isPrivate: false,

    },
    // {
    //     id: 6,
    //     Component: UserConversationHistoryPage,
    //     path: '/chat/:id',
    //     roles: [
    //         'admin',
    //         'superadmin',
    //     ],
    //     isPrivate: true,
    // },
    // {
    //     id: 7,
    //     Component: UserProfile,
    //     path: '/userProfile',
    //     roles: [
    //         'admin',
    //         'user',
    //         'superadmin',
    //     ],
    //     isPrivate: true,
    // }
];