import React, {FC, useEffect, useState} from 'react';

import Layout from '../core/Layout';
import Card from '../core/Card';
import CheckboxList from '../shared/CheckboxList';
import RadioboxList, {IPriceList} from '../shared/PriceRangeList';

import {ICategoryOutput, IProductOutput} from '../models/OutputInterfaces';
import {PriceRange} from './fixedPrices';
import {getCategories, getFilteredProducts} from './apiCore';

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
	const [itemDisplayCount, setItemDisplayCount] = useState(3);
	const [skip, setSkip] = useState(0);
	const [itemsReturnCount, setItemsReturnCount] = useState(0);
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

	const loadProductList = (filter: ICurrentFilter) => {
		// console.log('loadProductList() called: ', filter);
		getFilteredProducts(skip, itemDisplayCount, filter.filters).then((response) => {
			if (response.error) {
				setErrorMessage(response.error);
			} else {
				setProducts(response.data);
				setItemsReturnCount(response.size);
				setSkip(0);
			}
		});
	};

	const loadMoreProducts = () => {
		const toSkip = skip + itemDisplayCount;
		getFilteredProducts(toSkip, itemDisplayCount, currentFilter).then((response) => {
			if (response.error) {
				setErrorMessage(response.error);
			} else {
				console.log('loadMoreProducts() size: ', response.size);
				console.log(response.data);
				setProducts([...products, ...response.data]);
				setItemsReturnCount(response.size);
				setSkip(toSkip);
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

	const displayLoadMoreButton = () => {
		return (
			<>
				{itemsReturnCount > 0 && itemsReturnCount >= itemDisplayCount && (
					<button onClick={loadMoreProducts} className="btn btn-warning mb-5">
						Load More
					</button>
				)}
			</>
		);
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
		// console.log('current filter: ', JSON.stringify(currentFilter));

		loadProductList(newFilters);
	};

	useEffect(() => {
		loadCategoryFilterList();
		loadPriceRangeFilterList();
		loadProductList(currentFilter);
	}, []);

	return (
		<>
			<Layout title="Shop Page" description="Search and find products of your choice" className="container-fluid">
				<div className="row">
					<div className="col-4">
						{displayCategoryFilters()}
						{displayPriceRangeFilters()}
					</div>
					<div className="col-8">
						{displayProductList()}
						<hr />
						{displayLoadMoreButton()}
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Shop;
