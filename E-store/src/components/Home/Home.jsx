import { BiDevices } from "react-icons/bi";
import { GiClothes, GiLinkedRings } from "react-icons/gi";
import { Link } from "react-router-dom";
import SliderModule from "react-slick";
const Slider = SliderModule.default || SliderModule;

import clothes from "../../assets/images/clothes.jpg";
import electronics from "../../assets/images/electronics.jpg";
import furniture from "../../assets/images/furniture.jpg";
import shoes from "../../assets/images/shoes.jpg";
import Products from "./../Products/Products";

const imgInfo = [
  { imgSrc: clothes, imgAlt: "Clothes category" },
  { imgSrc: electronics, imgAlt: "Electronics category" },
  { imgSrc: furniture, imgAlt: "Furniture category" },
  { imgSrc: shoes, imgAlt: "Shoes category" },
];

export default function Home() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <>
      <div className="container mx-auto">
        <header className="">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <Slider {...settings}>
                {imgInfo.map((img, index) => (
                  <picture key={index}>
                    <img
                      src={img.imgSrc}
                      className="mt-7.5 w-full h-125 object-cover rounded-[30px]"
                      alt={img.imgAlt}
                    />
                  </picture>
                ))}
              </Slider>
            </div>
          </div>
        </header>

        <section className="categories my-10">
          <h2 className="relative before:content-[''] before:absolute before:w-5 before:h-10 before:bg-[#DC4245] before:rounded-md before:-top-2.5 before:left-1.25 text-red-500 text-lg ps-10">
            Categories
          </h2>

          <h2 className="mt-5 text-3xl font-medium- exo-font">
            Browse By Category
          </h2>

          <div className="grid grid-cols-12 gap-2 my-5">
            <div className=" md:col-span-4">
              <Link
                to={"products/men's clothing"}
                className="text-[#212529] transition-all duration-300 
                hover:bg-[#212529] hover:text-white no-underline  border border-gray-200
                flex flex-col items-center rounded-md py-4 cursor-pointer"
              >
                <GiClothes className=" my-3 text-[7rem] " />
                <h2 className="roboto-font text-xl font-bold">Clothes</h2>
              </Link>
            </div>

            <div className=" md:col-span-4">
              <Link
                to={"products/electronics"}
                className="text-[#212529] transition-all duration-300 
                hover:bg-[#212529] hover:text-white no-underline border border-gray-200 
                flex flex-col items-center rounded-md py-4 cursor-pointer"
              >
                <BiDevices className=" my-3 text-[7rem]" />
                <h2 className="roboto-font text-xl font-bold">Electronics</h2>
              </Link>
            </div>

            <div className=" md:col-span-4">
              <Link
                to={"products/jewelery"}
                className="text-[#212529] transition-all duration-300 
                hover:bg-[#212529] hover:text-white no-underline border border-gray-200 
                flex flex-col items-center rounded-md py-4 cursor-pointer"
              >
                <GiLinkedRings className=" my-3 text-[7rem]" />
                <h2 className="roboto-font text-xl font-bold">Jewelery</h2>
              </Link>
            </div>
          </div>
        </section>

        <section className="products">
          <Products limitValue={6} />

          <div className="allProds-btn flex justify-center py-5">
            <Link
              to={"/products"}
              className="text-center rounded-md bg-red-600 text-white 
            hover:bg-red-700 transition-colors duration-300 px-4 w-1/4 py-2 text-xl"
            >
              All Products
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
