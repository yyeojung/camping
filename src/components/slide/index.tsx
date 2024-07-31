import React from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div style={{ height: "2rem", border: "1px solid red" }}>
        <h3>1</h3>
      </div>
      <div style={{ height: "2rem", border: "1px solid red" }}>
        <h3>2</h3>
      </div>
      <div style={{ height: "2rem", border: "1px solid red" }}>
        <h3>3</h3>
      </div>
      <div style={{ height: "2rem", border: "1px solid red" }}>
        <h3>4</h3>
      </div>
      <div style={{ height: "2rem", border: "1px solid red" }}>
        <h3>5</h3>
      </div>
      <div style={{ height: "2rem", border: "1px solid red" }}>
        <h3>6</h3>
      </div>
    </Slider>
  );
}
