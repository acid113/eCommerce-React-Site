import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';

import {GetUserProfile} from '../auth/apiAuth';
import {CreateCategory} from './apiAdmin';

const AddCategory: FC = () => {
	const [categoryName, setCategoryName] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);

	const handleChange = (e: any) => {
		// ! 'isUserAuthenticated' check always called, why?
		setErrorMessage('');
		setCategoryName(e.target.value);
	};

	const submitForm = (e: any) => {
		e.preventDefault();
		const {
			token,
			user: {_id}
		} = GetUserProfile();

		// console.log('AddCategory > submitForm() > category input: ', category);

		CreateCategory(_id, token, categoryName).then((response) => {
			// console.log('response: ', response);
			if (response.error) {
				console.log('error returned by API: ', response.error);
				// setErrorMessage(JSON.stringify(response.error));
				setErrorMessage('Category name should be unique.');
				setIsSuccess(false);
			} else {
				setErrorMessage('');
				setIsSuccess(true);
			}
		});
	};

	const newCategoryForm = () => {
		return (
			<form onSubmit={submitForm}>
				<div className="form-group">
					<label className="text-muted">Name</label>
					<input id="name" type="text" value={categoryName} onChange={handleChange} className="form-control" autoFocus required></input>
				</div>

				<button type="submit" className="btn btn-outline-primary">
					Add Category
				</button>
			</form>
		);
	};

	const showSuccess = () => {
		if (isSuccess) {
			return (
				<>
					<h3 className="text-success">{categoryName} category is created</h3>
				</>
			);
		}
	};

	const showError = () => {
		if (errorMessage) {
			return (
				<>
					<h3 className="text-danger">{errorMessage}</h3>
				</>
			);
		}
	};

	const goBack = () => (
		<div className="mt-5">
			<Link to="/admin/dashboard" className="text-warning">
				Back to Dashboard
			</Link>
		</div>
	);

	return (
		<>
			<Layout title="Add Category" description="Create new categories">
				<div className="row">
					<div className="col-md-8 offset-md-2">
						{showError()}
						{showSuccess()}
						{newCategoryForm()}
						{goBack()}
					</div>
				</div>
			</Layout>
		</>
	);
};

export default AddCategory;
