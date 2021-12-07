import React from 'react'
import {Fragment, useState, useEffect, useContext} from 'react'
import {Table, Button, InputGroup, Form} from 'react-bootstrap'
import styled from 'styled-components'

const Container = styled.div`
	height: 100vh;
	display: flex;
	align-items: start;
	justify-content: center;
	flex-direction:column;
`

const Cart = () => {

	//Orders
	const[orders, setOrders] = useState([])
	const[isEmpty, setIsEmpty] = useState(false)
	const[totalPrice, setTotalPrice] = useState(0)
	let newTotal = 0
	
	useEffect(()=> {
		fetch(`http://localhost:4000/orders/myOrders`, {
			method: 'GET',
			headers: {
				'Content-Type' : 'application/json',
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if (data.length == 0){
				setIsEmpty(true)
			} else {
				setOrders(data)
			}
		})
	},[])

	useEffect(()=>{
		orders.map(item => {
			newTotal = newTotal + item.totalAmount
			setTotalPrice(newTotal)
		})
	}, [orders])


	//Check out Function
	function checkOut(e) {
		e.preventDefault();
	}
	

	return (
		<Fragment>
			<Container>
				{ (isEmpty == true) ?
				<Fragment>
					<h1>Your Cart is Empty</h1>
					<h1>Click <a href="/products">here</a> to shop now</h1>
				</Fragment> :
				<Fragment>
					<h1>Your Cart</h1>	
					<Form onSubmit={(e) => checkOut(e)}>			
						<Table striped bordered hover>
						  <thead>
						    <tr>					       
						      <th colSpan="2">Product</th>
						      <th>Product Id</th>
						      <th>Unit Price</th>
						      <th>Quantity</th>
						      <th>Total</th>
						      <th>Status</th>
						    </tr>
						  </thead>
						  <tbody>
						  {orders.map(item => (
						  	<tr>				  							  
						  	  <td><Form.Check type="checkbox"/></td>
						  	  <td>{item.productName}</td>
						  	  <td>{item.productId}</td>
						  	  <td>{item.price} PHP</td>
						  	  <td>{item.quantity}</td>
						  	  <td>{item.totalAmount} PHP</td>
						  	  <td>{(item.isPaid)? `Paid` : `Pending Payment`}</td>
						  	</tr>
						  ))}
						    <tr>
						    	<td colSpan="2"><b>Total Price:</b></td>
						    	<td colSpan="5"><b>{totalPrice} PHP</b></td>
						    </tr>
						  </tbody>
						</Table>
						<Button variant="primary" type="submit">Check Out</Button>
					</Form>
				</Fragment>
				}	
			</Container>
		</Fragment>
	)
}

export default Cart