import type { CartItem } from "./ThriftHappens";
import CheckoutCard from "./CheckoutCard";

interface CheckoutContainerProps {
  cartData: CartItem[];
  handleRemoveCartItem: (cartItem: CartItem) => void;
  handleEmptyCart: (cartItem: CartItem[]) => void; //array of obj not obj
}

export default function CheckoutContainer({
  cartData,
  handleRemoveCartItem,
  handleEmptyCart,
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
      <button onClick={() => handleEmptyCart(cartData)}> Empty Cart</button>
    </div>
  );
}
