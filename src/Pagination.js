import React from 'react';
import { Pagination } from 'react-bootstrap';

class PaginationItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.data
		}
	}

	render() {
		let active = this.props.user_more.page;
		let items = [];
		for (let number = 1; number <= 5; number++) {
			items.push(
				<Pagination.Item key={number} active={number === active}>
					{number}
				</Pagination.Item>,
			);
		}
		return (
			<div>
				<Pagination>{items}</Pagination>
			</div>
		);
	}
}
export default PaginationItem;