import React, {FC, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';

import {GetUserProfile} from '../auth/apiAuth';
import {IProductInput, CreateProduct} from './apiAdmin';

const AddProduct: FC = () => {
	const [formValues, setFormValues] = useState<IProductInput>({
		name: '',
		description: '',
		price: 0,
		category: null,
		quantity: 0,
		sold: 0,
		photo: null,
		shipping: false,
		formData: new FormData()
	});

	const {name, description, price, category, quantity, sold, shipping, formData} = formValues;
	const [errorMessage, setErrorMessage] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);

	const showSuccess = () => {
		if (isSuccess) {
			return (
				<>
					<h3 className="text-success">{name} product is created</h3>
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

	const clearForm = () => {
		console.log('clear form');
		setFormValues({...formValues, name: '', description: '', price: 0, category: null, quantity: 0, photo: null, shipping: false});
	};

	useEffect(() => {
		// ? might not be needed
		// setFormValues({...formValues, formData: new FormData()});
	}, []);

	const handleChange = (fieldName: string) => (e: any) => {
		const fieldValue = fieldName === 'photo' ? e.target.files[0] : e.target.value;

		// setIsSuccess(false);
		setErrorMessage('');
		setFormValues({...formValues, [fieldName]: fieldValue});
		formData.set(fieldName, fieldValue);
		console.log(`form value of '${fieldName}': ${fieldValue}`);
		// console.log('form values :', formValues);
	};

	const submitForm = (e: any) => {
		e.preventDefault();
		const {
			token,
			user: {_id}
		} = GetUserProfile();
	};

	const newProductForm = () => {
		return (
			<form onSubmit={submitForm}>
				<div className="form-group">
					<label className="text-muted">Name</label>
					<input id="name" value={name} type="text" className="form-control" onChange={handleChange('name')} />
				</div>

				<div className="form-group">
					<label className="text-muted">Description</label>
					<textarea id="description" value={description} className="form-control" onChange={handleChange('description')} />
				</div>

				<div className="form-group">
					<label className="btn btn-outline-secondary">
						Photo: <input id="photo" name="photo" type="file" accept="image/*" onChange={handleChange('photo')} />
					</label>
				</div>

				<div className="form-group">
					<label className="text-muted">Category</label>
					<select id="category" className="form-control" onChange={handleChange('category')} defaultValue="">
						<option value=""> None</option>
						<option value="5ee73beb0a93e957306e9236">Category A</option>
						<option value="5ee745b711a6151cd022a96e">Category B</option>
					</select>
				</div>

				<div className="form-group">
					<label className="text-muted">Price</label>
					<input id="price" value={price} type="number" className="form-control" onChange={handleChange('price')} />
				</div>

				<div className="form-group">
					<label className="text-muted">Quantity</label>
					<input id="quantity" value={quantity} type="number" className="form-control" onChange={handleChange('quantity')} />
				</div>

				<div className="form-group">
					<label className="text-muted">Shipping</label>
					{/* <select id="shipping" className="form-control" onChange={handleChange('shipping')} defaultValue={0}>
						<option value={0}>False</option>
						<option value={1}>True</option>
					</select> */}
					{/* <input type="radio" id="shipping" name="shipping" value={0} onClick={handleChange('shipping')} />
					<label>False</label>
					<input type="radio" id="shipping" name="shipping" value={1} onClick={handleChange('shipping')} />
					<label>True</label> */}

					<div className="radio">
						<label>
							<input type="radio" name="shipping" value={1} onClick={handleChange('shipping')} />
							True
						</label>
					</div>
					<div className="radio">
						<label>
							<input type="radio" name="shipping" value={0} onClick={handleChange('shipping')} />
							False
						</label>
					</div>
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
		<Layout title="Add Product" description="Create new products">
			<div className="row">
				<div className="col-md-8 offset-md-2">
					{showError()}
					{showSuccess()}
					{newProductForm()}
					{goBack()}
				</div>
			</div>
		</Layout>
	);
};

export default AddProduct;
