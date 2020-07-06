import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import {SignOutUser, IsUserAuthenticated} from '../auth/index';

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
	return (
		<nav className="navbar navbar-expand-sm bg-primary">
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link className="nav-link" to="/" style={isActive(history, '/')}>
						Home
					</Link>
				</li>
				{!IsUserAuthenticated() && (
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

				{IsUserAuthenticated() && (
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
