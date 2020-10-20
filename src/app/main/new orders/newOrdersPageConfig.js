import React from 'react';


const NewOrdersPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/new-orders',
			component: React.lazy(() => import('./newOrderPage'))
		}
	]
};

export default  NewOrdersPageConfig ;
