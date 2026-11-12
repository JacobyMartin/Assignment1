import type { ClothingProduct } from "../data/data";
import type { ProductInfo, CartItem } from "./ThriftHappens";

interface ProductCardProps extends ClothingProduct {
  productInfo: ProductInfo;
  handleQuantityAdjust: (delta: number) => void;
  handleAddToCart: (cartItem: CartItem) => void;
}

export default function ItemCard({
  name,
  image, //add necessary fields as laid out by blackboard
  productInfo,
  handleQuantityAdjust,
  handleAddToCart,
}: ProductCardProps) {
  return (
    <div className="ItemCard">
      <h2> {name} </h2>
      <img src={image} alt="" height="100px" />
      <p> {productInfo} </p> //display necessary fields as per blackboard here
      <button onClick={() => handleQuantityAdjust(-1)}>{" - "}</button>
      <span>{productInfo.quantity}</span>
      <button onClick={() => handleQuantityAdjust(+1)}>{" - "}</button>
      <p>
        Total Price: {(productInfo.quantity * productInfo.price).toFixed(2)}$
      </p>
      <button
        onClick={() =>
          handleAddToCart({
            id: crypto.randomUUID(),
            name,
            price: productInfo.price,
            quantity: productInfo.quantity,
            total: productInfo.quantity * productInfo.price,
          })
        }
      >
        Add To Cart
      </button>
    </div>
  );
}
