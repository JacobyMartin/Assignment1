import type { CartItem } from "./ThriftHappens";

interface CheckoutCardProps extends CartItem{
  removeCheckoutItem: (id:string) => void; 
}

export default function CheckoutCard({
  id,
  name,
  image,
  price,
  quantity,
  total,
  removeCheckoutItem,
}: CheckoutCardProps) {
  return (
    <div className="CheckoutCard">
      <h2>{name}</h2>
      <img src={image} alt="" width="50"></img>
      <p>Quantity: {quantity} </p>
      <p>price: {price.toFixed(2)}$</p>
      <p>total: {total.toFixed(2)}$</p>
      <button onClick={() => removeCheckoutItem(id)}> Remove </button>
    </div>
  );
}
