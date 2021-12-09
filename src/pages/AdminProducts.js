import React from 'react'
import {Fragment, useState, useEffect, useContext} from 'react'
import {Table, Button, FloatingLabel, Form, FormControl, Modal} from 'react-bootstrap'
import {Navigate} from 'react-router-dom'
import styled from 'styled-components'

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

	//to get specific product for modal
	const[specProduct, setSpecProduct] = useState(null)

	//to show and hide the modal
	const [modalShow, setModalShow] = useState(false)

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
	},[])

	// Edit Product Modal

	function MyVerticallyCenteredModal(props) {
	  return (
	    <Modal
	      {...props}
	      size="lg"
	      aria-labelledby="contained-modal-title-vcenter"
	      centered
	    >
	      <Modal.Header closeButton>
	        <Modal.Title id="contained-modal-title-vcenter">
	          Edit Product: 
	        </Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
	       	
	      </Modal.Body>
	      <Modal.Footer>
	        <Button onClick={props.onHide}>Close</Button>
	      </Modal.Footer>
	    </Modal>
	  );
	}

	return (
		(user.isAdmin === false) ? 
		<Navigate to = "/" /> :
		<Fragment>
			<ContainerMain>
				<MyVerticallyCenteredModal
				  show={modalShow}
				  onHide={() => setModalShow(false)}
				/>

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
				
				<Table striped bordered hover variant="dark">
				  <thead>
				    <tr>
				      <th>Product ID</th>
				      <th>Product Name</th>
				      <th>Price</th>
				      <th>Stocks</th>
				      <th>Added</th>
				      <th>Updated</th>
				      <th>Status</th>
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
				  	  <td>by: {item.addedBy} on: {item.addedOn}</td>
				  	  <td>{(item.updatedBy == null) ?
				  	  	`Not yet updated before.` :
				  	  	`by: ${item.updatedBy} on: ${item.updatedOn}`
				  	  }</td>
				  	  <td>{(item.isActive)? `Active` : `Archived`}</td>
				  	  <td>
				  	  	<Button 
				  	  		variant="secondary"
				  	  		onClick={()=> setModalShow(true)}>
				  	  		Update Product
				  	  	</Button>
				  	  </td>
				  	</tr>
				  ))}
				  </tbody>
				</Table>
			</ContainerMain>
		</Fragment>
	)
}

export default AdminProducts