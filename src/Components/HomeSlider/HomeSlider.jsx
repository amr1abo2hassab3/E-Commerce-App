import Slider from "react-slick";

import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";
export const HomeSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  return (
    <div className="container mx-auto my-12 flex">
      <div className="w-3/4">
        <Slider {...settings}>
          <div>
            <img className="h-[400px] w-full" src={img1} alt="slider img 1" />
          </div>
          <div>
            <img className="h-[400px] w-full" src={img2} alt="slider img 2" />
          </div>
          <div>
            <img className="h-[400px] w-full" src={img3} alt="slider img 3" />
          </div>
        </Slider>
      </div>
      <div className="w-1/4">
        <img className="w-full h-[200px]" src={img1} alt="slider img 1" />
        <img className="w-full h-[200px]" src={img2} alt="slider img 2" />
      </div>
    </div>
  );
};
