import Buffet from './components/Buffet.vue';
import AddMovie from './components/AddMovie.vue';
import Movie from './components/Movie.vue';
import Authenticate from './components/Authenticate.vue';
import AuthForm from './components/AuthForm.vue';
import Logout from './components/Logout.vue';
import GoogleOauthCallback from './components/GoogleOauthCallback.vue';
import NotFound from './components/NotFound.vue';

const Dashboard = () => {
	return import('./components/05_pages/Dashboard.vue');
};

export default [
	{
		path: '/auth',
		component: Authenticate,
		children: [
			{
				path: 'signup',
				component: AuthForm,
				props: {
					mode: 'signup'
				}
			},
			{
				path: 'login',
				component: AuthForm,
				props: {
					mode: 'login'
				}
			},
			{
				path: 'logout',
				component: Logout
			},
			{
				path: 'google-callback',
				component: GoogleOauthCallback
			}
		]
	},
	{
		path: '/',
		alias: '/movies',
		name: 'Dashboard',
		component: Dashboard,
		children: [
			{
				path: '/',
				component: Buffet,
				meta: {
					title: 'My Buffet'
				}
				// children: [
				// 	{
				// 		path: 'add',
				// 		name: 'addMovie',
				// 		components: {
				// 			addMovie: AddMovie
				// 		}
				// 	}
				// ]
			},
			{
				path: 'watch-next',
				component: Buffet,
				meta: {
					title: 'Watch Next...'
				},
				props: {
					watchNextMode: true
				}
			}
			// {
			// 	path: '/movies/:movie_id',
			// 	component: Movie
			// }
		]
	},
	{
		path: '*',
		component: NotFound
	}
];
