const Dashboard = () => {
	return import('@components/5_pages/Dashboard.vue');
};
const Buffet = () => {
	return import('@components/4_layouts/Buffet.vue');
};

export default [
	{
		path: '/',
		alias: '/movies',
		component: Dashboard,
		children: [
			{
				path: '/',
				component: Buffet,
				meta: {
					title: 'My Buffet'
				}
			}
		]
	}
];
