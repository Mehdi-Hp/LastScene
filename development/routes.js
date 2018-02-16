import Dashboard from './components/Dashboard.vue';
import AddMovie from './components/AddMovie.vue';

export default [
	{
		path: '/',
		components:	{
			dashboard: Dashboard
		},
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
];
