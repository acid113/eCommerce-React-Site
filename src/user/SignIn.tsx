import React, {FC, useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../core/Layout';

// eslint-disable-next-line no-unused-vars
import {ISignInValues, SignInUser, AuthenticateUser, GetUserProfile} from '../auth/apiAuth';
import {IsUserAuthenticated} from '../auth/apiAuth';

const SignIn: FC = () => {
	const [formValues, setFormValues] = useState<ISignInValues>({
		email: 'nata@abc2.com',
		password: 'pass123'
	});

	const {email, password} = formValues;
	const [errorFound, setErrorFound] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [isUserValidated, setUserValidated] = useState(false); // * replace with Context API?

	const showError = () => {
		return (
			<div className="alert alert-danger" style={{display: errorFound ? '' : 'none'}}>
				{errorMessage}
			</div>
		);
	};

	const showLoading = () => {
		if (isLoading) {
			return (
				<div>
					<h3>Loading...</h3>
				</div>
			);
		}

		return '';
	};

	const redirectUser = () => {
		console.log('isUserValidated: ', isUserValidated);

		// ? workaround to redirect user to homepage if user is currently logged in
		// if (IsUserAuthenticated()) return <Redirect to="/" />;

		if (isUserValidated) {
			const {
				user: {role}
			} = GetUserProfile();

			switch (role) {
				case 0:
					console.log('inside SignIn, redirect to user dashboard');
					return <Redirect to="/user/dashboard" />;

				case 1:
					console.log('inside SignIn, redirect to admin dashboard');
					return <Redirect to="/admin/dashboard" />;

				default:
					console.log('inside SignIn, redirect to home');
					return <Redirect to="/" />;
			}
		}
	};

	const clearForm = () => {
		console.log('clear form');
		setFormValues({...formValues, email: '', password: ''});
	};

	const submitForm = (e: any) => {
		e.preventDefault();
		// console.log('submit:', formValues);

		setLoading(true);
		SignInUser(formValues).then((data: any) => {
			setLoading(false);

			if (data.error) {
				setErrorFound(true);
				setErrorMessage(data.error);
			} else {
				console.log('user is validated');

				// ? you can set states separately
				// Authenticate(data);
				// setErrorFound(false);
				// setUserValidated(true);

				// ? or set states in a callback
				AuthenticateUser(data, () => {
					setErrorFound(false);
					setUserValidated(true);
				});
			}
		});
	};

	const handleChange = (e: any) => {
		// console.log(`handleChange -> id: ${e.target.id}, value: ${e.target.value}`);
		setErrorFound(false);
		setFormValues({...formValues, [e.target.id]: e.target.value});
	};

	useEffect(() => {
		console.log('signin page init');
	}, []);

	const signInForm = () => {
		return (
			<form onSubmit={submitForm}>
				<div className="form-group">
					<label className="text-muted" htmlFor="email">
						Email
					</label>
					<input id="email" value={email} type="email" className="form-control" onChange={handleChange} />
				</div>

				<div className="form-group">
					<label className="text-muted" htmlFor="password">
						Password
					</label>
					<input id="password" value={password} type="password" className="form-control" onChange={handleChange} />
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
				<button type="button" className="btn" onClick={() => clearForm()}>
					Clear
				</button>
			</form>
		);
	};

	return (
		<>
			<Layout title="Sign In" description="Sign In to E-Commerce App" className="container col-md-8 offset-md-2">
				{showLoading()}
				{showError()}
				{signInForm()}
				{redirectUser()}
				{/* {JSON.stringify(formValues)} */}
			</Layout>
		</>
	);
};

export default SignIn;
