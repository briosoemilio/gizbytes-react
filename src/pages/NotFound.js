import React from 'react'
import styled from 'styled-components'

const ContainerMain = styled.div`
	height: 50vh;
	display: flex;
	
	justify-content:center;
	padding: 30px;
	flex-direction:column;
`

const NotFound = () => {
	return (
		<ContainerMain>
			<h1>ERROR 404: PAGE NOT FOUND</h1>
		</ContainerMain>
	)
}

export default NotFound