import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{

		id: 'new-orders',
		title: 'New Orders',
		// translate: 'Home',
		type: 'item',
		icon: 'create',
		url: '/new-orders'


	},

	{
		id: 'order-history',
		title: 'Order History',
		translate: 'History',
		type: 'group',
		icon: 'history',
		children: [
			// {
			// 	id: 'previous-used-stores',
			// 	title: 'Previous Used Stores',
			// 	type: 'item',
			// 	// icon: 'history',
			// 	url: '/previous-used-store'
			// },
			{
				id: 'cancelled-orders',
				title: 'Cancelled Orders',
				type: 'item',
				// icon: 'history',
				url: '/cancelled-orders'
			},
			{
				id: 'completed-orders',
				title: 'Completed Orders',
				type: 'item',
				// icon: 'history',
				url: '/completed-orders'
			},
			{
				id: 'list-all-previous-orders',
				title: 'List of All Previous Orders',
				type: 'item',
				// icon: 'history',
				url: '/list-all-previous-orders'
			},
			// {
			// 	id: 'list-all-used-stores',
			// 	title: 'List of All Used Stores',
			// 	type: 'item',
			// 	// icon: 'history',
			// 	url: '/list-all-used-stores'
			// },
		]

	},
	{

		id: 'active-orders',
		title: 'Active Orders',
		// translate: 'Active Orders',
		type: 'item',
		icon: 'whatshot',
		url: '/active-orders'

	},
	{

		id: 'products',
		title: 'My Products',
		// translate: 'Settings',
		type: 'item',
		icon: 'toc',
		url: '/products'

	},
	{

		id: 'profile',
		title: 'Profile',
		// translate: 'Settings',
		type: 'item',
		icon: 'person',
		url: '/profile'

	},
	{

		id: 'logout',
		title: 'Logout',
		// translate: 'LogOut',
		type: 'item',
		icon: 'lock',
		url: '/logout'
	},
];

export default navigationConfig;
