import React, {useState} from 'react';

interface ICheckboxItems {
	_id: string;
	name: string;
}

interface ICheckboxProps {
	items: ICheckboxItems[];
	handleFilters: (filters: string[]) => void;
}

const CheckboxList = (props: ICheckboxProps) => {
	const {items, handleFilters} = props;
	const [checkedIds, setCheckedIds] = useState<string[]>([]); // * will store checked items

	const handleToggle = (id: string) => () => {
		const currentIdIndex = checkedIds.indexOf(id);
		const newCheckedIds = [...checkedIds];

		if (currentIdIndex === -1) {
			newCheckedIds.push(id); // * add to list of checked items if 'id' is not found
		} else {
			newCheckedIds.splice(currentIdIndex, 1); // * remove
		}

		// console.log(newCheckedIds);
		setCheckedIds(newCheckedIds);
		handleFilters(newCheckedIds); // * need to send selected Id's array to parent component
	};

	return (
		<>
			{items.map((item, index) => (
				<li className="list-unstyle" key={index}>
					<input type="checkbox" className="form-check-input" value={(checkedIds.indexOf(item._id) === -1).toString()} onChange={handleToggle(item._id)} />
					<label className="form-check-label">{item.name}</label>
				</li>
			))}
		</>
	);
};

export default CheckboxList;
