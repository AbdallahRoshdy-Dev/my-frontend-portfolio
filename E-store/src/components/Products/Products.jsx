import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

export default function Products({ limitValue }) {
  // const [allprods, setAllprods] = useState(null);

  // const getAllProds = () => {
  //    axios
  //     .get(`https://fakestoreapi.com/products?limit=${limitValue}`)
  //     .then(({ data }) => {
  //       console.log(data);
  //       setAllprods(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const getAllProds = () => {
    return axios.get(`https://fakestoreapi.com/products?limit=${limitValue}`);
  };

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProds,
  });

  const productRating = (rate) => {
    const stars = [];
    const fullStarsCount = Math.floor(rate);
    const hasHalf = rate % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStarsCount) {
        stars.push(<FaStar key={i} color="gold" />);
      } else if (i === fullStarsCount + 1 && hasHalf) {
        stars.push(<FaStarHalfAlt key={i} color="gold" />);
      } else {
        stars.push(<FaRegStar key={i} color="gold" />);
      }
    }

    return stars;
  };

  const handleClick = () => {
    toast.success("Product was added to cart successfully");
  };

  // useEffect(() => {
  //   getAllProds();
  // }, []);

  console.log(isLoading,isFetching)

  return (
    <>
      <section className="products container mx-auto my-10">
        <h2 className="relative before:content-[''] before:absolute before:w-5 before:h-10 before:bg-[#DC4245] before:rounded-md before:-top-2.5 before:left-1.25 text-red-500 text-lg ps-10">
          Our products
        </h2>

        <div className="grid grid-cols-12 gap-10 pt-5 ">
          {isLoading ? (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <PulseLoader />
            </div>
          ) : (
            data?.data.map((prod) => (
              <div
                className="md:col-span-4 shadow-2xl p-2 rounded-lg"
                key={prod.id}
              >
                <div className="product-card group  overflow-hidden transition-all duration-300 hover:scale-105 hover:cursor-pointer">
                  <figure className="relative">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="object-cover  w-full h-100 "
                    />

                    <div
                      className="absolute bottom-[-15%] left-0 right-0 opacity-0 
                        on-all duration-300 z-0 group-hover:bottom-[0%] group-hover:z-50 group-hover:opacity-100 "
                    >
                      <p
                        onClick={handleClick}
                        className="bg-gray-800 text-white hover:bg-gray-900 transition-colors 
                        duration-300 py-2 px-4 rounded-md w-full text-center cursor-pointer"
                      >
                        Add to cart
                      </p>
                    </div>
                  </figure>

                  <div className="prod-info py-2 flex flex-col gap-2">
                    <h3 className="text-xl font-bold">
                      {prod.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <p className="">{prod.category}</p>
                    <p className="text-[#5b5b5b]">{prod.price} EGP</p>

                    <p className="flex">{productRating(prod.rating?.rate)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
