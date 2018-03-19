import Dashboard from './components/Dashboard.vue';
import Buffet from './components/Buffet.vue';
import AddMovie from './components/AddMovie.vue';
import Movie from './components/Movie.vue';
import Authenticate from './components/Authenticate.vue';
import NotFound from './components/NotFound.vue';

export default [
	{
		path: '/login',
		component: Authenticate
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
						path: '/add',
						name: 'addMovie',
						components: {
							addMovie: AddMovie
						}
					}
				]
			}
		]
	},
	{
		path: '/movies/:movie_id',
		component:	Movie
	},
	{
		path: '*',
		component: NotFound
	}
];
