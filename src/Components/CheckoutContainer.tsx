import type { CartItem } from "./ThriftHappens";
import CheckoutCard from "./CheckoutCard";

interface CheckoutContainerProps {
  cartData: CartItem[];
  handleRemoveCartItem: (cartItem: CartItem) => void;
}

export default function CheckoutContainer({
  cartData,
  handleRemoveCartItem,
}: CheckoutContainerProps) {
  return (
    <div className="CheckoutContainer">
      {cartData.map((item) => (
        <CheckoutCard
          key={item.id}
          {...item}
          removeCheckoutItem={handleRemoveCartItem}
        />
      ))}
      <h2>
        {cartData.length > 0
          ? `Cart total: ${cartData.reduce((acc, item) => acc + item.total, 0).toFixed(2)}$`
          : "Cart is empty"}
      </h2>
      <button> Empty Cart</button>
    </div>
  );
}
