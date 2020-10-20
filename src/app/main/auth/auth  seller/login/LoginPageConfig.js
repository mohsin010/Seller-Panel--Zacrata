import React from 'react';

const LoginPageConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
			}
		}
	},
	routes: [
		{
			path: '/login',
			component: React.lazy(() => import('./LoginPage'))
		}
	]
};

export default LoginPageConfig;
