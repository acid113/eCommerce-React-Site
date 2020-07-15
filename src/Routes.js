import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoutes';
import AdminRoute from './auth/AdminRoute';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';

// import Menu from './core/Menu';

const Routes = () => {
	return (
		<BrowserRouter>
			{/* <Menu /> */}
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/signin" exact component={SignIn} />
				<Route path="/signup" exact component={SignUp} />
				<PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
				<AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
				<AdminRoute path="/admin/create/category" exact component={AddCategory} />
				<AdminRoute path="/admin/create/product" exact component={AddProduct} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
