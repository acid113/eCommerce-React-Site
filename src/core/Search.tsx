import React, {useEffect, useState} from 'react';

import {ICategoryOutput, IProductOutput} from '../models/OutputInterfaces';
import {getCategories, list} from './apiCore';

import Card from './Card';

const Search = () => {
	const [data, setData] = useState({
		categories: [],
		category: '',
		search: '',
		results: [],
		isSearch: false
	});

	const {categories, category, search, results, isSearch} = data;

	const loadCategories = () => {
		getCategories().then((response) => {
			if (response.error) {
				console.log(response.error);
			} else {
				setData({...data, categories: response});
			}
		});
	};

	const displayCategories = () => {
		if (categories.length > 0) {
			return (
				<>
					{categories.map((category: ICategoryOutput, index) => (
						<option key={index} value={category._id}>
							{category.name}
						</option>
					))}
				</>
			);
		}
	};

	const handleChange = (searchType: string) => (e: any) => {
		// console.log(`${searchType}: ${e.target.value}`);
		setData({...data, [searchType]: e.target.value, isSearch: false});
	};

	const searchData = () => {
		// console.log(`category: ${category}, search: ${search}`);
		if (search) {
			list({search: search, category: category}).then((response): any => {
				if (response.error) {
					console.log('search error: ', response.error);
				} else {
					setData({...data, results: response, isSearch: true});
				}

				// console.log(data);
			});
		}
	};

	const displaySearchResults = (products: any) => {
		// ! this is called multiple times on initial load
		// console.log('search results: ', products);

		return (
			<>
				<div className="row">
					{products.map((product: any, index: number) => (
						<Card key={index} product={product} />
					))}
				</div>
			</>
		);
	};

	const submitForm = (e: any) => {
		e.preventDefault();
		searchData();
	};

	const displaySearchForm = () => {
		return (
			<>
				<form onSubmit={submitForm}>
					<span className="input-group-text">
						<div className="input-group input-group-lg">
							<div className="input-group-prepend">
								<select className="btn mr-2" onChange={handleChange('category')}>
									<option value="All">Pick category</option>
									{displayCategories()}
								</select>
							</div>
							<input type="search" className="form-control" onChange={handleChange('search')}></input>
						</div>
						<div className="btn input-group-append" style={{border: 'none'}}>
							<button type="submit" className="input-group-text">
								Search
							</button>
						</div>
					</span>
				</form>
			</>
		);
	};

	useEffect(() => {
		loadCategories();
	}, []);

	return (
		<>
			{/* {JSON.stringify(categories)}; */}
			<div className="row">
				<div className="container mb-3">{displaySearchForm()}</div>
				<div className="container-fluid mb-3">{displaySearchResults(results)}</div>
			</div>
		</>
	);
};

export default Search;
