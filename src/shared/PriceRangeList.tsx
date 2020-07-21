import React, {useState} from 'react';

export interface IPriceList {
	_id: number;
	name: string;
	range: number[];
}

interface IPriceRangeProps {
	items: IPriceList[];
	handleFilters: (filters: any) => void; // ? how did this work with 'any' type?
}

const RadioboxList = (props: IPriceRangeProps) => {
	const {items, handleFilters} = props;
	const [selectedValue, setSelectedValue] = useState(0);

	const handleToggle = (id: any) => () => {
		setSelectedValue(id);
		handleFilters(id); // * pass selected Id back to parent component
	};

	return (
		<>
			{items.map((item, index) => (
				<div key={index}>
					<input type="radio" name="priceRange" className="mr-2 ml-4" value={item._id} onChange={handleToggle(item._id)} />
					<label className="form-check-label">{item.name}</label>
				</div>
			))}
		</>
	);
};

export default RadioboxList;
