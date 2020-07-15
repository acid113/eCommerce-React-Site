// TODO: convert to Typescript

import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import {IsUserAuthenticated, GetUserProfile} from './apiAuth';

const PrivateRoute = ({component: Component, ...rest}) => {
	console.log('inside Private Route');

	const isUserAuthenticated = IsUserAuthenticated();
	let isAdminRole = false;

	if (isUserAuthenticated) {
		const {
			user: {role}
		} = GetUserProfile();

		isAdminRole = role === 1;
	}

	return (
		<Route
			{...rest}
			render={(props) =>
				isUserAuthenticated && !isAdminRole ? (
					<Component {...props} />
				) : (
					// * Redirect to Sign page if user not authenticated
					<Redirect
						to={{
							pathname: '/signin',
							state: {from: props.location}
						}}
					/>
				)
			}
		/>
	);
};

PrivateRoute.propTypes = {
	component: PropTypes.func
};

export default PrivateRoute;
