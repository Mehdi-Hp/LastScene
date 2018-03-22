import Dashboard from './components/Dashboard.vue';
import Buffet from './components/Buffet.vue';
import AddMovie from './components/AddMovie.vue';
import Movie from './components/Movie.vue';
import Authenticate from './components/Authenticate.vue';
import AuthForm from './components/AuthForm.vue';
import Logout from './components/Logout.vue';
import NotFound from './components/NotFound.vue';

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
			}
		]
	},
	{
		path: '/',
		alias: '/movies',
		component: Dashboard,
		children: [
			{
				path: '/',
				component: Buffet,
				children: [
					{
						path: 'add',
						name: 'addMovie',
						components: {
							addMovie: AddMovie
						}
					}
				]
			},
			{
				path: '/movies/:movie_id',
				component: Movie
			}
		]
	},
	{
		path: '*',
		component: NotFound
	}
];
