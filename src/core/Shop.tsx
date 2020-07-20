import React, {FC, useEffect, useState} from 'react';

import Layout from '../core/Layout';
import Card from '../core/Card';

import {getCategories, getProducts} from './apiCore';
import {ICategoryOutput, IProductOutput} from '../models/OutputInterfaces';
import CheckboxList from '../shared/CheckboxList';

const Shop = () => {
	const [products, setProducts] = useState<IProductOutput[]>([]);
	const [categories, setCategories] = useState<ICategoryOutput[]>([]);
	const [errorMessage, setErrorMessage] = useState('');
	// const [isSuccess, setIsSuccess] = useState(false);
	// const [isLoading, setIsLoading] = useState(false);

	const loadCategoryList = () => {
		getCategories().then((response) => {
			// console.log(response);
			if (response.error) {
				setErrorMessage(response.error);
			} else {
				setCategories(response);
			}
		});
	};

	const loadProductList = () => {
		getProducts('createdAt').then((response) => {
			if (response.error) {
				setErrorMessage(response.error);
			} else {
				setProducts(response);
			}
		});
	};

	const displayCategoryList = () => {
		if (categories.length > 0) {
			return (
				<>
					<h4>Filter by category</h4>
					<ul>
						<CheckboxList items={categories} />
					</ul>
				</>
			);
		}
	};

	const displayProductList = () => {
		if (products.length > 0) {
			return (
				<>
					<h4>Products</h4>
					<div className="row">{products && products.map((product, index) => <Card key={index} product={product} />)}</div>
				</>
			);
		}
	};

	useEffect(() => {
		loadCategoryList();
		loadProductList();
	}, []);

	return (
		<>
			<Layout title="Shop Page" description="Search and find products of your choice" className="container-fluid">
				<div className="row">
					<div className="col-4">{displayCategoryList()}</div>
					<div className="col-8">{displayProductList()}</div>
				</div>
			</Layout>
		</>
	);
};

export default Shop;
