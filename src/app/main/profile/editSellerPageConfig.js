import React from 'react';

const EditSellerPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/profile',
			component: React.lazy(() => import('./editSellerPage'))
		}
	]
};

export default EditSellerPageConfig;
