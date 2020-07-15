import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import {SignOutUser, IsUserAuthenticated, GetUserProfile} from '../auth/apiAuth';

interface IMenuProps {
	history: any;
}

const isActive = (history: any, path: string) => {
	if (history.location.pathname === path) {
		return {color: '#ff9900'}; // ? orange
	} else {
		return {color: '#ffffff'};
	}
};

// * "props" is deconstructed to "history"
// const Menu = ({history}) => {
const Menu = (props: IMenuProps) => {
	const {history} = props;
	const isUserAuthenticated = IsUserAuthenticated(); // TODO: use ContextAPI
	let isAdminRole = false;

	if (isUserAuthenticated) {
		const {
			user: {role}
		} = GetUserProfile();

		isAdminRole = role === 1;
	}

	return (
		<nav className="navbar navbar-expand-sm bg-primary">
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link className="nav-link" to="/" style={isActive(history, '/')}>
						Home
					</Link>
				</li>
				<li className="nav-item">
					{isAdminRole ? (
						<Link className="nav-link" to="/admin/dashboard" style={isActive(history, '/admin/dashboard')}>
							Dashboard
						</Link>
					) : (
						<Link className="nav-link" to="/user/dashboard" style={isActive(history, '/user/dashboard')}>
							Dashboard
						</Link>
					)}
					{/* <Link className="nav-link" to="/user/dashboard" style={isActive(history, '/user/dashboard')}>
						Dashboard
					</Link> */}
				</li>
				{!isUserAuthenticated && (
					<>
						<li className="nav-item">
							<Link className="nav-link" to="/signin" style={isActive(history, '/signin')}>
								Sign In
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/signup" style={isActive(history, '/signup')}>
								Sign Up{' '}
							</Link>
						</li>
					</>
				)}

				{isUserAuthenticated && (
					<>
						<li className="nav-item">
							<span
								className="nav-link"
								onClick={() =>
									SignOutUser(() => {
										// * force redirect to Home
										history.push('/');
									})
								}
								style={{cursor: 'pointer', color: '#ffffff'}}
							>
								Sign Out{' '}
							</span>
						</li>
					</>
				)}
			</ul>
		</nav>
		// </div>
	);
};

export default withRouter(Menu);
