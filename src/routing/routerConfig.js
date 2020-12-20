import Test from '../components/mainPage';
import Register from '../components/auth/register';
import Login from '../components/auth/login';
import ProductPage from '../components/products/product';
import CarPage from '../components/car/carList';
import OrderPage from '../components/order/orderPage';

export default [
    {
        id: 1,
        Component: Test,
        path: '/',
        roles: [],
        isPrivate: false,
        isToken: true
    },
    {
        id: 2,
        Component: Login,
        path: '/login',
        roles: [],
        isPrivate: false,
        isToken: false
    },
    {
        id: 3,
        Component: Register,
        path: '/register',
        roles: [],
        isPrivate: false,
        isToken: false
    },
    {
        id: 4,
        Component: ProductPage,
        path: '/products/:id',
        roles: [],
        isPrivate: false,
        isToken: true
    },
    {
        id: 5,
        Component: CarPage,
        path: '/car',
        roles: [],
        isPrivate: true,
        isToken: false
    },
    {
        id: 6,
        Component: OrderPage,
        path: '/order',
        roles: [],
        isPrivate: true,
        isToken: false
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