import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { NotFound } from '../pages/404';
import { Stores } from '../pages/client/stores';
import { Search } from '../pages/client/search';
import { Category } from '../pages/client/category';
import { UserRole } from '../__generated__/globalTypes';
import { Dashboard } from '../pages/delivery/dashboard';
import { Order } from '../pages/order';
import { AddProduct } from '../pages/owner/add-product';
import { AddStore } from '../pages/owner/add-store';
import { MyStore } from '../pages/owner/my_store';
import { MyStores } from '../pages/owner/my_stores';
import { ConfirmEmail } from '../user/confirm-email';
import { EditProfile } from '../user/edit-profile';
import { Store } from '../pages/client/store';
import { OTP } from '../pages/otp';
import { Products } from '../pages/client/products';
import { ProductPage } from '../pages/client/product-page';

const clientRoutes = [
	{
		path: '/',
		component: <Products />,
	},
	{
		path: '/product/:id',
		component: <ProductPage />,
	},
	{
		path: '/search',
		component: <Search />,
	},
	{
		path: '/category/:slug',
		component: <Category />,
	},
	{
		path: '/stores/:id',
		component: <Store />,
	},
];

const commonRoutes = [
	{ path: '/:id/otp', component: <OTP /> },
	{ path: '/confirm', component: <ConfirmEmail /> },
	{ path: '/edit-profile', component: <EditProfile /> },
	{ path: '/orders/:id', component: <Order /> },
];

const storeRoutes = [
	{ path: '/', component: <MyStores /> },
	{ path: '/add-store', component: <AddStore /> },
	{ path: '/stores/:id', component: <MyStore /> },
	{ path: '/stores/:storeId/add-product', component: <AddProduct /> },
];

const driverRoutes = [{ path: '/', component: <Dashboard /> }];

export const LoggedInRouter = () => {
	const { data, loading, error } = useMe();

	if (!data || loading || error) {

		if(loading)
			{return (
				<div className="h-screen flex justify-center items-center">
					<span className="font-medium text-xl tracking-wide">Loading...</span>
				</div>
			);}
			return (
				<Router>
					<Route path="/:id/otp">
						<OTP/>
					</Route>
				</Router>
			);

	}
	return (
		<Router>
			<Header />
			<Switch>
				{data.me.role === UserRole.Client &&
					clientRoutes.map((route) => (
						<Route exact key={route.path} path={route.path}>
							{route.component}
						</Route>
					))}
				{data.me.role === UserRole.Owner &&
					storeRoutes.map((route) => (
						<Route exact key={route.path} path={route.path}>
							{route.component}
						</Route>
					))}
				{data.me.role === UserRole.Delivery &&
					driverRoutes.map((route) => (
						<Route exact key={route.path} path={route.path}>
							{route.component}
						</Route>
					))}
				{commonRoutes.map((route) => (
					<Route key={route.path} path={route.path}>
						{route.component}
					</Route>
				))}
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</Router>
	);
};
