import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { updateCart, removefromCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";


const CartItem = ({ data }) => {
    const p = data.attributes;
    const dispatch = useDispatch();


    const updateCartItem = (e, key) => {
        let payload = {
            key,
            val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
            id: data.id
        };
        dispatch(updateCart(payload));
    }

    return (
        <div className="flex py-5 gap-3 md:gap-5 border-b ">
            {/* PRODUCT IMAGE */}
            <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
                <Image src={p.thumbnail.data.attributes.url}
                    alt={p.name}
                    width={120}
                    height={120}
                    className="rounded-lg" />
            </div>

            <div className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row justify-between">
                    {/* Product Title */}
                    <div className="text-lg md:text-2xl font-semibold text-black/80">{p.name}</div>

                    {/* Subtitle */}
                    <div className="text-sm md:text-lg font-medium text-black/50 block md:hidden">{p.subtitle}</div>

                    {/* PRODUCT PRICE */}
                    <div className="text-sm md:text-lg font-bold text-black/50 mt-2">
                        ${p.price}
                    </div>
                </div>

                {/* Subtitle */}
                <div className="text-lg font-medium text-black/50 hidden md:block">{p.subtitle}</div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 md:gap-10 text-black/50 text-sm md:text-lg">
                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Size:</div>
                            <select className="hover:text-black" onChange={(e) => updateCartItem(e, "selectedSize")}>
                                {p.size.data.map((item, index) => (
                                    <option
                                        key={index}
                                        value={item.size}
                                        selected={data.selectedSize === item.size}
                                        disabled={!item.enabled ? true : false}
                                    >
                                        {item.size}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Quantity:</div>
                            <select className="hover:text-black" onChange={(e) => updateCartItem(e, "quantity")}>
                                {Array.from({ length: 10 }, (_, index) => index + 1).map((q, i) => {
                                    return (
                                        <option
                                            key={i}
                                            value={q}
                                            selected={data.quantity === q}
                                        >
                                            {q}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    <RiDeleteBin6Line
                        onClick={() => dispatch(removefromCart({ id: data.id }))}
                        className="cursor-pointer text-black/50 hover:text-black text-[16px] md:text-[20px]" />
                </div>

            </div>
        </div>
    );
};

export default CartItem;
