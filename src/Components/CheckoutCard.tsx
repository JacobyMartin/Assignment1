import type { CartItem } from "./ThriftHappens";

export default function CheckoutCard({
  name,
  image,
  price,
  quantity,
  total,
}: CartItem) {
  return (
    <div className="CheckoutCard">
      <h2>{name}</h2>
      <img src={image} alt="" width="50"></img>
      <p>Quantity: {quantity} </p>
      <p>price: {price.toFixed(2)}$</p>
      <p>total: {total.toFixed(2)}$</p>
      <button> Remove </button>
    </div>
  );
}
