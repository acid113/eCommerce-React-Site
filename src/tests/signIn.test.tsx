import React from 'react';
import ReactDom from 'react-dom';
import {getQueriesForElement} from '@testing-library/dom';

import SignIn from '../user/SignIn';

test('renders correct SignIn content', () => {
	const root = document.createElement('div');
	ReactDom.render(<SignIn />, root);

	const {getByText, getByLabelText} = getQueriesForElement(root);

	// expect(getByText('Email')).not.toBeNull();
	expect(getByLabelText('Email')).not.toBeNull();
});
