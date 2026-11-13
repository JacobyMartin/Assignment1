import type { ClothingProduct } from "../data/data";
import type { ProductInfo, CartItem } from "./ThriftHappens";

interface ProductCardProps extends ClothingProduct {
  productInfo: ProductInfo;
  handleQuantityAdjust: (delta: number) => void;
  handleAddToCart: (cartItem: CartItem) => void;
}
export default function ItemCard({
  name,
  image,
  productInfo,
  handleQuantityAdjust,
  handleAddToCart,
}: ProductCardProps) {
  return (
    <div className="ItemCard">
      <h2> {name} </h2>
      <img src={image} alt="" height="100px" />
      <p>
        <strong>Fit:</strong> {productInfo.fit},
      </p>
      <p>
        <strong>Category:</strong> {productInfo.category}
      </p>
      <p>
        <strong>Color:</strong> {productInfo.color}
      </p>
      <p> {productInfo.description}</p>
      <p>
        <strong>Size:</strong> {productInfo.size}
      </p>
      <p>
        <strong>Quantity:</strong> {productInfo.remQuantity}
      </p>
      <p>
        <strong>Price:</strong> {productInfo.price}
      </p>
      <button onClick={() => handleQuantityAdjust(-1)}>{" - "}</button>
      <span>{productInfo.quantity}</span>
      <button onClick={() => handleQuantityAdjust(+1)}>{" + "}</button>
      <button
        onClick={() =>
          handleAddToCart({
            id: crypto.randomUUID(),
            productId: productInfo.id,
            name,
            image: productInfo.image,
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
