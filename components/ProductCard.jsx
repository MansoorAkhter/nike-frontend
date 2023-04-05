import React from "react";
import { getDiscountedPricePercentage } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";


const ProductCard = ({ data: { attributes: p, id } }) => {

    return (
        <Link href={`/product/${p.slug}`}
            className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
        >
            <Image
                width={500}
                height={500}
                src={p.thumbnail.data.attributes.url}
                alt={p?.name}
            />
            <div className="text-black/90 p-4">
                <h2 className="text-lg font-medium">{p.name}</h2>
                <div className="flex items-center text-black/50">

                    <h3 className="text-lg font-semibold mr-2">${p.price}</h3
                    >
                    {p.original_price && (
                        <>
                            <h3 className="text-base font-medium line-through">${p.original_price}</h3>
                            <h3 className="ml-auto text-base font-medium text-green-500">
                                {getDiscountedPricePercentage(p.price, p.original_price)}% off
                            </h3>
                        </>
                    )}

                </div>
            </div>
        </Link>


    );
};

export default ProductCard;
