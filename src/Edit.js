import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Route, Redirect } from "react-router-dom";
import axios from 'axios';
import List from './List';
class Edit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectref: false,
			...this.props.data
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmitEdit = (e) => {
		axios.put(`https://reqres.in/api/users/${this.props.id}`,
			{
				first_name: this.state.first_name || this.props.first_name,
				last_name: this.state.last_name || this.props.last_name,
			})
			.then(response => this.setState({ user_more: response.data }))
			.then(
				this.setState({
					redirectref: true
				})
			)
			.catch(function (error) {
				console.log(error);
			})
			.finally(function () {
				//	console.log("");
			})
	}

	render() {
		const { first_name, last_name, handleClose } = this.props;
		if (this.state.redirectref) {
			return <Redirect to="/list" />
		}
		return (
			<>
				<h4>Edit User</h4>
				<div className="col-md-6 add">
					<Form onSubmit={this.handleSubmitEdit} >
						<Form.Group md="6" controlId="validationCustom01">
							<Form.Label>First name</Form.Label>
							<Form.Control required type="text" name="first_name" defaultValue={first_name} onChange={e => this.handleChange(e)} placeholder="First name" />
							<Form.Label>Last name</Form.Label>
							<Form.Control required type="text" name="last_name " defaultValue={last_name} onChange={e => this.handleChange(e)} placeholder="Last name" />
						</Form.Group>
						<Button variant="primary" type="submit" onClick={this.handleSubmitEdit}> Submit </Button>
						<Button variant="primary" onClick={handleClose}> Cancel </Button>
					</Form>
				</div>
				<Route exact path="/list" component={List} />
			</>
		)
	}
}
export default Edit;