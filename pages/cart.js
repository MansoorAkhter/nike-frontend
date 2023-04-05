import Image from "next/image";
import Link from "next/link";
import CartItem from "@/components/CartItem";
import Wrapper from "@/components/Wrapper";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
// Stripe Payment
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "@/utils/api";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
    const [loading, setLoading] = useState(false);
    const { cartItems } = useSelector(state => state.cart);



    const subTotal = useMemo(() => {
        return cartItems.reduce((total, val) => total + val.attributes.price, 0)
    }, [cartItems]);



    const handlePayment = async () => {
        try {
            setLoading(true);
            const stripe = await stripePromise;
            const res = await makePaymentRequest("/api/orders", { products: cartItems, });
            await stripe.redirectToCheckout({ sessionId: res.stripeSession.id, });

        } catch (error) {
            setLoading(false);
            console.log("STRIPE ERR------->", error);
        }
    }


    return (
        <div className="w-full md:py-20">
            <Wrapper>
                {cartItems.length > 0 && (<>
                    {/* Heading Start*/}
                    <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                        <h1 className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">Shopping Cart</h1>
                    </div>
                    {/* Heading End*/}

                    {/* CART content Start */}
                    <div className="flex flex-col lg:flex-row gap-12 py-10">
                        {/* Cart Items */}
                        <div className="flex-[2]">
                            <h3 className="text-lg font-bold">Cart Items</h3>
                            {cartItems.map((item) => (
                                <CartItem key={item.id} data={item} />
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="flex-[1]">
                            <h3 className="text-lg font-bold">Summary</h3>

                            <div className="p-5 my-5 bg-black/5 rounded-xl">
                                <div className="flex justify-between">
                                    <div className="uppercase text-sm md:text-lg font-medium text-black">Subtotal</div>
                                    <div className="text-sm md:text-lg font-medium text-black">$: {subTotal}</div>
                                </div>

                                <div className="text-sm md:text-lg py-5 border-t mt-5">
                                    The subtotal reflects the total price of
                                    your order, including duties and taxes,
                                    before any applicable discounts. It does
                                    not include delivery costs and
                                    international transaction fees.
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button onClick={handlePayment} className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center justify-center gap-2">
                                Checkout
                                {loading && <img src="/spinner.svg" />}
                            </button>

                        </div>
                    </div>
                </>)}
                {/* CART content End*/}

                {/* Empty Cart Screen */}
                {cartItems.length < 1 && (<div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
                    <Image
                        src="/empty-cart.jpg"
                        alt="Empty Cart"
                        width={300} height={300}
                        className="w-[300px] md:w-[400px]" />
                    <span className="text-xl font-bold">Your cart is empty</span>
                    <span className="text-center mt-4">
                        Looks like you have not added anything in your cart.
                        <br />
                        Go ahead and explore top categories.
                    </span>

                    <Link href="/" className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8">Continue Shopping</Link>
                </div>)}
            </Wrapper>
        </div>
    );
};

export default Cart;
