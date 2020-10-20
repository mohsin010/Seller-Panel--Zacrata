import RegisterPageConfig from './auth/register/RegisterPageConfig';
import LoginPageConfig from './auth/login/LoginPageConfig';
import ProductsPageConfig from './products/ProductsPageConfig';
import editSellerPageConfig from './profile/editSellerPageConfig';
import ActiveOrdersPageConfig from './active orders/ActiveOrdersPageConfig';
import historyPagesConfigs from './history/historyConfig';
import ViewOrderPageConfig from './cart/viewOrderPageConfig';
import NewOrderPageConfig from './new orders/newOrdersPageConfig';
import LogoutPageConfig from './auth/Logout/logoutPageConfig';

const pagesConfigs = [
	LoginPageConfig,
	// RegisterPageConfig,
	NewOrderPageConfig,
	ProductsPageConfig,
	editSellerPageConfig,
	ActiveOrdersPageConfig,
	ViewOrderPageConfig,
	LogoutPageConfig,
	...historyPagesConfigs
];

export default pagesConfigs;
