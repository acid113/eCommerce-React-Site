import React, {FC, useEffect, useState} from 'react';

import Layout from '../core/Layout';
import Card from '../core/Card';

import {getCategories, getProducts} from './apiCore';
import {ICategoryOutput, IProductOutput} from '../models/OutputInterfaces';
import CheckboxList from '../shared/CheckboxList';

import {PriceRange} from './fixedPrices';
import RadioboxList, {IPriceList} from '../shared/PriceRangeList';

interface ICurrentFilter {
	filters: {
		category?: string[];
		price?: number[]; // ! should be number
	};
}

const Shop = () => {
	const [products, setProducts] = useState<IProductOutput[]>([]);
	const [categories, setCategories] = useState<ICategoryOutput[]>([]);
	const [priceRange, setPriceRange] = useState<IPriceList[]>([]);
	const [errorMessage, setErrorMessage] = useState('');
	// const [isSuccess, setIsSuccess] = useState(false);
	// const [isLoading, setIsLoading] = useState(false);

	// const [currentFilter, setCurrentFilter] = useState<any>({
	const [currentFilter, setCurrentFilter] = useState<ICurrentFilter>({
		filters: {
			category: [],
			price: []
		}
	});

	const loadCategoryFilterList = () => {
		getCategories().then((response) => {
			// console.log(response);
			if (response.error) {
				setErrorMessage(response.error);
			} else {
				setCategories(response);
			}
		});
	};

	const loadPriceRangeFilterList = () => {
		setPriceRange(PriceRange);
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

	const displayCategoryFilters = () => {
		if (categories.length > 0) {
			return (
				<>
					<h4>Filter by category</h4>
					<ul>
						<CheckboxList items={categories} handleFilters={(categories) => handleSelectedFilter(categories, 'category')} />
					</ul>
				</>
			);
		}
	};

	const displayPriceRangeFilters = () => {
		return (
			<>
				<h4>Filter by price range</h4>
				<div>
					{/* how did this work with 'any' type? */}
					<RadioboxList items={priceRange} handleFilters={(priceId) => handleSelectedFilter(priceId, 'price')} />
				</div>
			</>
		);
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

	const getPriceRangeValue = (priceId: number): number[] => {
		let selectedRange: number[] = [];

		priceRange.filter((price) => {
			if (price._id === priceId) {
				// console.log('price range found: ', price.range);
				selectedRange = price.range;
			}
		});

		return selectedRange;
	};

	const handleSelectedFilter = (filterData: string[], filterBy: string) => {
		// console.log(`Shop filter by "${filterBy}": ${filterData}`);
		const newFilters = {...currentFilter};

		// ! error if you use ICurrentFilter
		// newFilters.filters[filterBy] = filterData;

		if (filterBy === 'category') {
			newFilters.filters.category = filterData;
		}

		if (filterBy === 'price') {
			// ? While expected 'filterData' param is of type string[], here it's a single string value
			newFilters.filters.price = getPriceRangeValue(parseInt(filterData.toString()));
		}

		setCurrentFilter(newFilters);
		console.log('current filter: ', JSON.stringify(currentFilter));
	};

	useEffect(() => {
		loadCategoryFilterList();
		loadPriceRangeFilterList();
		loadProductList();
	}, []);

	return (
		<>
			<Layout title="Shop Page" description="Search and find products of your choice" className="container-fluid">
				<div className="row">
					<div className="col-4">
						{displayCategoryFilters()}
						{displayPriceRangeFilters()}
					</div>
					<div className="col-8">{displayProductList()}</div>
				</div>
			</Layout>
		</>
	);
};

export default Shop;
