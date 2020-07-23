import React, {FC, useEffect, useState} from 'react';
import Layout from '../core/Layout';
import Card from '../core/Card';
import Search from '../core/Search';

import {getProducts} from './apiCore';
import {IProductOutput} from '../models/OutputInterfaces';

const Home: FC = () => {
	const [productsBySell, setProductsBySell] = useState<IProductOutput[]>([]);
	const [productsByArrival, setProductsByArrival] = useState<IProductOutput[]>([]);
	const [errorMessage, setErrorMessage] = useState('');

	const loadNewArrivalProducts = () => {
		// console.log('inside loadNewArrivalProducts()');

		// * 'createdAt' is an automatic field created in MongoDB data
		getProducts('createdAt').then((data) => {
			if (data.error) {
				console.log('error at loadNewArrivalProducts(): ', data.error);
				setErrorMessage(data.error);
			} else {
				// console.log('success loading new products');
				// console.log(data);
				setProductsByArrival(data);
			}
		});
	};

	const loadBestSellingProducts = () => {
		// console.log('inside loadBestSellingProducts()');
		getProducts('sold').then((data) => {
			if (data.error) {
				console.log('error at loadBestSellingProducts(): ', data.error);
				setErrorMessage(data.error);
			} else {
				// console.log('success loading sold products');
				// console.log(data);
				setProductsBySell(data);
			}
		});
	};

	const displayNewArrivals = () => {
		return (
			<>
				<h2 className="mb-4">New Arrivals</h2>
				<div className="row">{productsByArrival && productsByArrival.map((product, index) => <Card key={index} product={product} />)}</div>
			</>
		);
	};

	const displayBestSellers = () => {
		return (
			<>
				<h2 className="mb-4">Best Sellers</h2>
				<div className="row">{productsBySell && productsBySell.map((product, index) => <Card key={index} product={product} />)}</div>
			</>
		);
	};

	useEffect(() => {
		// console.log('inside Home');

		loadBestSellingProducts();
		loadNewArrivalProducts();
	}, []);

	return (
		<>
			<Layout title="Home Page" description="React (Typescript) E-Commerce App" className="container-fluid">
				<Search />
				{displayNewArrivals()}
				{displayBestSellers()}
			</Layout>
		</>
	);
};

export default Home;
