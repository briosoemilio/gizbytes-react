import React from 'react'
import {Fragment, useState, useEffect, useContext} from 'react'
import {Table, Button, FloatingLabel, Form, FormControl, Modal} from 'react-bootstrap'
import {Navigate, Link} from 'react-router-dom'
import styled from 'styled-components'
import Swal from 'sweetalert2'

import UserContext from '../UserContext'

const ContainerMain = styled.div`
	height: auto;
	display: flex;
	align-items:center;
	justify-content:center;
	padding: 30px;
	flex-direction:column;
`
const ContainerTop = styled.div`
	margin-bottom: 20px;
	display: flex;
	width: 100%;
	justify-content: space-between;
`

const AdminProducts = () => {

	//to set product list
	const[products, setProducts] = useState([])

	//To determine if admin or not
	const {user, setUser} = useContext(UserContext)

	//Get all products
	useEffect(()=> {
		fetch(`http://localhost:4000/products/all`, {
			method: 'GET',
			headers: {
				'Content-Type' : 'application/json'
			}
		})
		.then(res => res.json())
		.then(data => {
			setProducts(data)
		})
	},[products])

	//update product function
	function archiveProduct(x, y) {
		fetch(`http://localhost:4000/products/archive`, {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json',
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				isActive: x,
				productId: y,
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data === true) {
				Swal.fire({
					title: `You've successfully change product status`,
					icon: 'success',
					text: 'Click to return to products page'
				}).then(redirect => {
					window.location="/adminProducts"
				})
			} else {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: 'Something happened.'
				})
			}
		})
	}

	//Modal Source Code

	return (
		(user.isAdmin === false) ? 
		<Navigate to = "/" /> :
		<Fragment>		
			<ContainerMain>
				<ContainerTop>
					<FloatingLabel controlId="floatingSelectGrid" label="Sort Products">
					      <Form.Select aria-label="Floating label select example">
					        <option>Sort this product by</option>
					        <option value="1">Active Products</option>
					        <option value="2">Archived Products</option>
					        <option value="3">Zero Stocks</option>
					        <option value="4">Phone Brand</option>
					      </Form.Select>
					</FloatingLabel>

					<Form className="d-flex">
					        <FormControl
					          type="search"
					          placeholder="Search"
					          className="me-2"
					          aria-label="Search"
					        />
					        <Button variant="outline-success">Search</Button>
					      </Form>
				</ContainerTop>

				<Form>				
				<Table striped bordered hover variant="dark">
				  <thead>
				    <tr>
				      <th>Product ID</th>
				      <th>Product Name</th>
				      <th>Price</th>
				      <th>Stocks</th>
				      <th>Added</th>
				      <th>Updated</th>
				      <th className="col-2">Status</th>
				      <th></th>
				    </tr>
				  </thead>
				  <tbody>
				  {products.map(item => (
				  	<tr>
				  	  <td>{item._id}</td>
				  	  <td>{item.productName}</td>
				  	  <td>{item.price}</td>
				  	  <td>{item.stocks}</td>
				  	  <td>by: {item.addedBy} <br/> on: {item.addedOn}</td>
				  	  <td>{(item.updatedBy == null) ?
				  	  	`Not yet updated before.` :
				  	  	`by: ${item.updatedBy} on: ${item.updatedOn}`
				  	  }</td>
				  	  <td>{(item.isActive)? 
				  	  	<Form.Select
				  	  		type="boolean"
				  	  		onChange ={e => archiveProduct(e.target.value, item._id)}>
				  	  	  <option value ='true'>Active</option>
				  	  	  <option value='false'>Inactive</option>
				  	  	</Form.Select> :
				  	  	<Form.Select
				  	  		type="boolean"
				  	  		onChange ={e => archiveProduct(e.target.value, item._id)}>
				  	  	  <option value='false'>Inactive</option>
				  	  	  <option value='true'>Active</option>
				  	  	</Form.Select>
				  	  }</td>
				  	  <td>
				  	  	<Link 
				  	  		className="btn btn-secondary"
				  	  		to ={`/adminProducts/${item._id}`}>
				  	  		Update Product
				  	  	</Link>
				  	  </td>
				  	</tr>
				  ))}
				  </tbody>
				</Table>
				</Form>
			</ContainerMain>
		</Fragment>
	)
}

export default AdminProducts