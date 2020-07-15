import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';

import {GetUserProfile} from '../auth/apiAuth';

const AdminDashboard: FC = () => {
	// ? another level of deconstruction
	const {
		user: {name, email, role}
	} = GetUserProfile();

	const adminLinks = () => {
		return (
			<div className="card">
				<h4 className="card-header">Admin Links</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link className="nav-link" to="/admin/create/category">
							Create Category
						</Link>
					</li>
					<li className="list-group-item">
						<Link className="nav-link" to="/admin/create/product">
							Create Product
						</Link>
					</li>
				</ul>
			</div>
		);
	};

	const adminInfo = () => {
		return (
			<div className="card mb-5">
				<h3 className="card-header">User Information</h3>
				<ul className="list-group">
					<li className="list-group-item">Name: {name}</li>
					<li className="list-group-item">Email: {email}</li>
					<li className="list-group-item">Role: {role === 1 ? 'Admin' : 'Registerd User'}</li>
				</ul>
			</div>
		);
	};

	return (
		<Layout title="Dashboard" description={`Hello ${name}`} className="container">
			<div className="row">
				<div className="col-3">{adminLinks()}</div>
				<div className="col-9">{adminInfo()}</div>
			</div>
		</Layout>
	);
};

export default AdminDashboard;
