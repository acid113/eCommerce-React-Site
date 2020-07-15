import React, {FC, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';

// eslint-disable-next-line no-unused-vars
import {ISignUpValues, SignUpUser} from '../auth/apiAuth';

const SignUp: FC = () => {
	const [formValues, setFormValues] = useState<ISignUpValues>({
		name: '',
		email: '',
		password: ''
	});

	const {name, email, password} = formValues;
	const [errorFound, setErrorFound] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isUserCreated, setUserCreated] = useState(false);

	const showError = () => {
		return (
			<div className="alert alert-danger" style={{display: errorFound ? '' : 'none'}}>
				{errorMessage}
			</div>
		);
	};

	const showSuccess = () => {
		return (
			<div className="alert alert-info" style={{display: isUserCreated && !errorFound ? '' : 'none'}}>
				New account created. Please <Link to="./signin">sign in</Link>.
			</div>
		);
	};

	const clearForm = () => {
		console.log('clear form');
		setFormValues({...formValues, name: '', email: '', password: ''});
	};

	const submitForm = (e: any) => {
		e.preventDefault();
		// console.log('submit:', formValues);

		SignUpUser(formValues).then((data: any) => {
			if (data.error) {
				setErrorFound(true);
				setErrorMessage(data.error);
			} else {
				setErrorFound(false);
				setUserCreated(true);

				clearForm();
			}
		});
	};

	const handleChange = (e: any) => {
		// console.log(`handleChange -> id: ${e.target.id}, value: ${e.target.value}`);
		setErrorFound(false);
		setFormValues({...formValues, [e.target.id]: e.target.value});
	};

	useEffect(() => {
		console.log('signup page init');
	}, []);

	const signUpForm = () => {
		return (
			<form onSubmit={submitForm}>
				<div className="form-group">
					<label className="text-muted">Name</label>
					<input id="name" value={name} type="text" className="form-control" onChange={handleChange} />
				</div>

				<div className="form-group">
					<label className="text-muted">Email</label>
					<input id="email" value={email} type="email" className="form-control" onChange={handleChange} />
				</div>

				<div className="form-group">
					<label className="text-muted">Password</label>
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
			<Layout title="Sign Up" description="Sign Up to E-Commerce App" className="container col-md-8 offset-md-2">
				{showSuccess()}
				{showError()}
				{signUpForm()}
				{/* {JSON.stringify(formValues)} */}
			</Layout>
		</>
	);
};

export default SignUp;
