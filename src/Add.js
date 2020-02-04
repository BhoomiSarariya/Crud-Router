import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class Add extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.data
		}
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}
	handleReset = (e) => {
		this.setState({
			first_name: '',
			last_name: ''
		})
	}

	handleSubmitAdd = (e) => {
		e.preventDefault();
		axios.post(`https://reqres.in/api/users`,
			{
				first_name: this.state.first_name,
				last_name: this.state.last_name,
			})
			.then(response => this.setState({ user_more: response.data }))
			.catch(function (error) {
				console.log(error);
			})
			.finally(function () {
				//	console.log("");
			})
	}
	render() {
		return (
			<>
				<h4>Add User</h4>
				<div className="col-md-6 add">
					<Form >
						<Form.Group md="6" controlId="validationCustom01">
							<Form.Label>First name</Form.Label>
							<Form.Control required type="text" name="first_name" onChange={(e) => this.handleChange(e)} placeholder="First name" />
							<Form.Label>Last name</Form.Label>
							<Form.Control required type="text" name="last_name" onChange={(e) => this.handleChange(e)} placeholder="Last name" />
						</Form.Group>
						<Button variant="primary" type="submit" onClick={(e) => this.handleSubmitAdd(e)}> Submit </Button>
						<Button variant="primary" onClick={this.handleReset}> Cancel </Button>
					</Form>
				</div>
			</>
		)
	}
}
export default Add;