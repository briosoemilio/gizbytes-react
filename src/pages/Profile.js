import React from 'react'
import {Fragment, useContext} from 'react'
import UserContext from '../UserContext'
import {Navigate} from 'react-router-dom'
import { Container } from "react-grid-system";
import { Row, Col } from "react-bootstrap";
import Orders from '../components/OrderAccordion'
import "../App.css";

const Profile = () => {

  const { user } = useContext(UserContext)

	return (
		(user.id === null) ? 
		<Navigate to = "/" /> :
		<Fragment>
			<Container>
			<Row>
				<Col sm={12} className="text-center mt-5">
				  <h1 id="profile-header">User Profile</h1>
				</Col>
			</Row>
			<Row>
				<Col sm={12} className="my-4">
				  {" "}
				  <p id="profile-sub">
				    Name: {user.firstName} {user.lastName}
				  </p>
				  <p id="profile-sub">Email: {user.email}</p>
				</Col>
			</Row>
			<p id="profile-sub">Order Summary:</p>
			<Orders/>
		</Container>
		</Fragment>
	)
}

export default Profile