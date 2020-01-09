import Vue from 'vue';
import VueRouter from 'vue-router';

const Archive = () => {
    return import('~page/Archive/Archive');
};
const RecentlyAdded = () => {
    return import('~page/RecentlyAdded/RecentlyAdded');
};
const WatchList = () => {
    return import('~page/WatchList/WatchList');
};
const Favorites = () => {
    return import('~page/Favorites/Favorites');
};

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: {
            name: 'archive'
        }
    },
    {
        path: '/archive',
        name: 'archive',
        component: Archive
    },
    {
        path: '/recently-added',
        name: 'recently-added',
        component: RecentlyAdded
    },
    {
        path: '/watch-list',
        name: 'watch-list',
        component: WatchList
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: Favorites
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
