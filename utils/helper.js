export const getDiscountedPricePercentage = (originalPrice, discountedPrice) => {

    // Calculate Discount
    const discount = originalPrice - discountedPrice;
    const discountPrecentage = [discount / originalPrice] * 100;

    return discountPrecentage.toFixed(2)
}