import {IPriceList} from '../shared/PriceRangeList';

export const PriceRange: IPriceList[] = [
	{
		_id: 0,
		name: 'Any',
		range: []
	},
	{
		_id: 1,
		name: 'P0 to P9',
		range: [0, 9]
	},
	{
		_id: 2,
		name: 'P10 to P19',
		range: [10, 19]
	},
	{
		_id: 3,
		name: 'P20 to P29',
		range: [20, 29]
	},
	{
		_id: 4,
		name: 'P30 to P39',
		range: [30, 39]
	},
	{
		_id: 5,
		name: 'More than P40',
		range: [40, 99]
	}
];
