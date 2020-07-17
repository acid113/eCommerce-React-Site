import React, {FC, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';

import {GetUserProfile} from '../auth/apiAuth';
import {createProduct, getCategories} from './apiAdmin';
import {IProductInput} from '../models/InputInterfaces';
import {IProductOutput, ICategoryOutput} from '../models/OutputInterfaces';

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

	const {name, description, price, quantity, formData} = formValues;
	const [errorMessage, setErrorMessage] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [categories, setCategories] = useState<ICategoryOutput[]>([]);
	const [newProduct, setNewProduct] = useState('');

	const showSuccess = () => {
		if (isSuccess) {
			return (
				<>
					<h3 className="alert alert-info">{newProduct} is created</h3>
				</>
			);
		}
	};

	const showError = () => {
		if (errorMessage) {
			return (
				<>
					<h3 className="alert alert-danger">{errorMessage}</h3>
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
		setFormValues({
			...formValues,
			name: '',
			description: '',
			price: 0,
			category: null,
			quantity: 0,
			photo: null,
			shipping: false
		});
	};

	const handleChange = (fieldName: string) => (e: any) => {
		const fieldValue = fieldName === 'photo' ? e.target.files[0] : e.target.value;

		// setIsSuccess(false);
		setErrorMessage('');
		formData.set(fieldName, fieldValue);
		setFormValues({...formValues, [fieldName]: fieldValue});

		// console.log(`form value of '${fieldName}': ${fieldValue}`);
		// console.log('form values :', formValues);
	};

	const submitForm = (e: any) => {
		e.preventDefault();
		const {
			token,
			user: {_id}
		} = GetUserProfile();

		setIsLoading(true);

		createProduct(_id, token, formData).then((response: IProductOutput) => {
			setIsLoading(false);
			if (response.error) {
				console.log('error returned by API: ', response.error);

				setErrorMessage(response.error);
				setIsSuccess(false);
			} else {
				console.log('success creating new product: ', response.name);
				setErrorMessage('');
				setIsSuccess(true);
				setNewProduct(response.name);
				clearForm();
			}
		});
	};

	const getCategoryList = () => {
		getCategories().then((response: ICategoryOutput[]) => {
			// console.log(response);
			setCategories(response);
		});
	};

	useEffect(() => {
		// ? might not be needed
		// setFormValues({...formValues, formData: new FormData()});

		getCategoryList();
	}, []);

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
					<label className="btn btn-secondary">
						Photo: <input id="photo" name="photo" type="file" accept="image/*" onChange={handleChange('photo')} />
					</label>
				</div>

				<div className="form-group">
					<label className="text-muted">Category</label>
					<select id="category" className="form-control" onChange={handleChange('category')} defaultValue="">
						<option>Select</option>
						{categories &&
							categories.map((category, index: number) => (
								<option key={index} value={category._id}>
									{category.name}
								</option>
							))}
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
