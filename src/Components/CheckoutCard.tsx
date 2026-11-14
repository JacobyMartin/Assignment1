import type { CartItem } from "./ThriftHappens";

interface CheckoutCardProps extends CartItem {
  removeCheckoutItem: (cartItem: CartItem) => void;
}

export default function CheckoutCard({
  removeCheckoutItem,
  ...cartItem
}: CheckoutCardProps) {
  return (
    <div className="CheckoutCard">
      <h2>{cartItem.name}</h2>
      <img src={cartItem.image} alt="" width="50"></img>
      <p>Quantity: {cartItem.quantity} </p>
      <p>price: {cartItem.price.toFixed(2)}$</p>
      <p>total: {cartItem.total.toFixed(2)}$</p>
      <button onClick={() => removeCheckoutItem(cartItem)}> Remove </button>
    </div>
  );
}
