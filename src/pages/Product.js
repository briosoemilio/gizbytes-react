import React from 'react'
import {Fragment, useState, useEffect, } from 'react'
import ProductCard from '../components/ProductCard'
import { Container, Row, Col } from 'react-grid-system';
import {Form, Button} from 'react-bootstrap'
import Swal from 'sweetalert2'
import {useParams} from 'react-router-dom'
import "../App.css";

const Product = () => {

	//Construct necessary hooks
	const {productId} = useParams()

	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState(0)
	const [stock, setStock] = useState(0)
	const [quantity, setQuantity] = useState(1)
	const [total, setTotal] = useState(0)
	const [image1, setImage1] = useState('')
	const [image2, setImage2] = useState('')



	useEffect(() => {
		console.log(productId)

		fetch(`https://fathomless-beyond-35679.herokuapp.com/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			setName(data.productName)
			setDescription(data.description)
			setPrice(data.price)
			setStock(data.stocks)
			setTotal(data.price)			
			setImage1(data.productImage1)					
			setImage2(data.productImage2)					
		})
	}, [productId])

	useEffect(()=>{
		setTotal(price * quantity)
		if(quantity < 1) {
			setQuantity(1)
		} else if (quantity > stock) {
			setQuantity(stock)
		}

	}, [quantity, price])

	let props = {
		image1: image1,
		image2: image2
	}

	// Add to cart Function
	function addToCart(e) {
		e.preventDefault();

		fetch(`https://fathomless-beyond-35679.herokuapp.com/orders/${productId}/addtocart`, {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json',
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				productName: name,			
				price: price,	
				quantity: quantity,	
				totalAmount: total,	
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data !== true) {
				Swal.fire({
					title: 'Add to cart failed!',
					icon: 'error',
					text: 'Login first before adding to cart'
				})
			} else {
				Swal.fire({
					title: 'Item added to cart successfully!',
					icon: 'success',
					text: 'Click to view your cart'
				}).then(redirect => {
					window.location="/cart"
				})
			}
		})
	}

	return (
		<Fragment>
				<Container>
					<Row>
						<Col sm={12} className="text-center mt-5">
							<h1>{name}</h1>
						</Col>
					</Row>
					<Row>
						<Col sm={10} lg={6}>
							<div 
								style={{
								  display: "flex",
								  justifyContent: "end",
								}}>
								<ProductCard {...props}/>
							</div>
						</Col>
						<Col sm={10} lg={6} className="text-center">
							<div id="items-product">
							  <h1 id="price-productsolo">???{price}</h1>
							</div>
							<h3 id="productsolo">Stocks Left: {stock} </h3>
							<h3 id="productsolo">Quantity : </h3>
								<Form onSubmit={(e) => addToCart(e)} className="text-center">
									<Form.Group>
										<Form.Control
											id="qty-form"
											className="text-center mb-4"
											type="number"
											value={quantity}
											onChange = {e => setQuantity(e.target.value)}/>
									</Form.Group>
									<Button id="product-button"	type='submit'>Add To Cart
									</Button>
								</Form>
								<h3 id="productsolototal">Total Price: ???{total}</h3>						
						</Col>
						</Row>						
				</Container>
		</Fragment>
	)
}

export default Product