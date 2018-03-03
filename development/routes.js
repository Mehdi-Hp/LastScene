import Buffet from './components/Buffet.vue';
import AddMovie from './components/AddMovie.vue';
import Movie from './components/Movie.vue';

export default [
	{
		path: '/',
		alias: '/movies',
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
	},
	{
		path: '/movies/:movie_id',
		component:	Movie
	}
];
