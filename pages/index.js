import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchData } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Home({ products }) {
  // const [data, setData] = useState(null);

  // const fetchProducts = async () => {
  //   const { data } = await fetchData('/api/products');
  //   setData(data);
  // }

  // useEffect(() => {
  //   fetchProducts()
  // }, [])


  return (
    <main>
      <HeroBanner />

      <Wrapper>
        {/* Heading & Paragraph Start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Cushioning for Your Miles
          </div>
          <div className="text-md md:text-xl">
            A lightweight Nike ZoomX midsole is combined with
            increased stack heights to help provide cushioning
            during extended stretches of running.
          </div>
        </div>
        {/* Heading & Paragraph End */}

        {/* Product Grid Start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.data?.map((product) => (
            <ProductCard key={product?.id} data={product} />
          ))}
        </div>
        {/* Product Grid End */}

      </Wrapper>
    </main>
  )
}


export async function getStaticProps() {
  const products = await fetchData('/api/products?populate=*');

  // getStaticProps return fetch data as prop
  return {
    props: { products }
  }
}