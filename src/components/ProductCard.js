import React from 'react'
import {Fragment} from 'react'
import {Card, Button} from 'react-bootstrap'
import ReactImageMagnify from 'react-image-magnify'
import ImageGallery from 'react-image-gallery';

import image1 from '../ProductPhotos/product1/1.jpg'
import image2 from '../ProductPhotos/product1/1L.jpg'
import image3 from '../ProductPhotos/product1/1S.jpg'

import image4 from '../ProductPhotos/product1/2.jpg'
import image5 from '../ProductPhotos/product1/2L.jpg'
import image6 from '../ProductPhotos/product1/2S.jpg'

import image7 from '../ProductPhotos/product1/3.jpg'
import image8 from '../ProductPhotos/product1/3L.jpg'
import image9 from '../ProductPhotos/product1/3S.jpg'

import image10 from '../ProductPhotos/product1/4.jpg'
import image11 from '../ProductPhotos/product1/4L.jpg'
import image12 from '../ProductPhotos/product1/4S.jpg'

import image13 from '../ProductPhotos/product1/5.jpg'
import image14 from '../ProductPhotos/product1/5L.jpg'
import image15 from '../ProductPhotos/product1/5S.jpg'

const ProductCard = () => {

	const images = [
	  {
	    original: image1,
	    thumbnail: image3,
	  },
	  {
	    original: image4,
	    thumbnail: image6,
	  },
	  {
	    original: image7,
	    thumbnail: image9,
	  },
	  {
	    original: image10,
	    thumbnail: image12,
	  },
	  {
	    original: image13,
	    thumbnail: image15,
	  },
	];
	
	return (
		<Fragment>			
			<div style = {{width: '400px'}}>
				<ReactImageMagnify {...{
				    smallImage: {
				        alt: 'Wristwatch by Ted Baker London',
				        isFluidWidth: true,
				        src: image1
				    },
				    largeImage: {
				        src: image2,
				        width: 1600,
				        height: 1600
				    }
				}} />
			</div>
		</Fragment>
	)
}

export default ProductCard