import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import PaginationItem from './Pagination';
class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			id: '',
			first_name: '',
			last_name: '',
			...this.props.data
		}
	}

	render() {
		const { user, handleClick, handleModal } = this.props;
		return (
			<div>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Avatar</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{user.map((subitem, index) =>
							<>
								<tr key={index} >
									<td>{subitem.id}</td>
									<td>{subitem.first_name}</td>
									<td>{subitem.last_name}</td>
									<td><img src={subitem.avatar} alt="usr" /></td>
									<td>
										<Link to={`/list/new/${subitem.id}`} onClick={e => handleClick(subitem.id, subitem.first_name, subitem.last_name, e)}>Edit</Link>|
										<Link to={`/list`}><span onClick={e => handleModal(subitem.id, subitem.first_name, subitem.last_name, e)}>Delete</span></Link>
									</td>
								</tr>
							</>)
						}
					</tbody>
				</Table>
				<PaginationItem user_more={this.props.user_more} />
			</div>)
	}
}
export default List;