import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ProductDetailCarousel = ({ images }) => {
    return (
        <div className="text-white text-[20px] w-full max-w-7xl mx-auto sticky top-[50px] ">
            <Carousel
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
                thumbWidth={60}
                className="productCarousel"
            >
                {images?.map((item) => (<img key={item.id} src={item.attributes.url} alt={item.attributes.name} />))}
            </Carousel>
        </div>
    );
};

export default ProductDetailCarousel;
