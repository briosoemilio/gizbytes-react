/*import React from 'react'
import {Fragment, useEffect, useState} from 'react'
import { Container, Row, Col } from 'react-grid-system';
import "../App.css";

const HotProducts = () => {
	const[hotProductIds, setHotProductIds] = useState([])	
	const[products, setProducts] = useState([])

	useEffect(() => {
		fetch('https://fathomless-beyond-35679.herokuapp.com/orders/hotOrders')
		.then(res => res.json())
		.then(data => {
			let sliced = data.slice(0,8)
			setHotProductIds(sliced)
		})
	}, [])

	return (
		<Fragment>				
			<Container style={{marginTop: "20px", marginBottom: "20px"}}>
				<Row style={{marginTop: "20px", marginBottom: "20px"}}>
				{ products.map(item => (
					<Col sm={3}>{item}</Col>
					))}											
				</Row>
			</Container>
		</Fragment>
	)
}

export default HotProducts*/