import React from 'react';

interface ICheckboxItems {
	_id: string;
	name: string;
}

interface ICheckboxProps {
	items: ICheckboxItems[];
}

const CheckboxList = (props: ICheckboxProps) => {
	const {items} = props;

	return (
		<>
			{items.map((item, index) => (
				<li className="list-unstyle" key={index}>
					<input type="checkbox" className="form-check-input" value={item._id} />
					<label className="form-check-lable">{item.name}</label>
				</li>
			))}
		</>
	);
};

export default CheckboxList;
