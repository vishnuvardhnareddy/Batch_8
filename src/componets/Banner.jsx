// src/components/Banner.jsx
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../images/banner1.png';
import img2 from '../images/banner2.png';
import img3 from '../images/banner3.jpg';
// import './Banner.css'; // Ensure your CSS is imported correctly
import "./Banner.css";

function Banner() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img className="d-block w-100" src={img1} alt="Flash cards" />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={img2} alt="Storage" />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={img3} alt="Notes" />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Banner;
