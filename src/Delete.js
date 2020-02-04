import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

class Delete extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectref: false,
			isLoading: true,
			...this.props.data
		}
	}
	handleSubmitDelete = e => {
		e.preventDefault();
		console.log(this.props.id);
		axios.delete(`https://reqres.in/api/users/${this.props.id}`)
			.then(res => {
				this.setState({
					user_more: res.data,
					show: false
				});
			})
			.then(
				setTimeout(
					this.props.handleClose()
					, 200)
			)
			.catch(function (error) {
				console.log(error);
			})
			.finally(function () {
				//	console.log("");
			})
	}
	render() {
		const { show, handleClose } = this.props
		return (
			<>
				<div>
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Delete User</Modal.Title>
						</Modal.Header>
						<Modal.Body>Are you sure you want to delet user??</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								No
          	  </Button>
							<Button variant="primary" type="submit" onClick={e => this.handleSubmitDelete(e)}>
								Yes
         		  </Button>
						</Modal.Footer>
					</Modal>
				</div>
			</>

		)
	}
}
export default Delete;