import type { ClothingProduct } from "../data/data";
import type { ProductInfo } from "./ThriftHappens";
import type { CartItem } from "./ThriftHappens";
import ItemCard from "./ItemCard";

//ItemsContainer organizes cards and forwards actions to ThriftHappens

interface ProductContainerProps {
  data: ClothingProduct[];
  productInfo: ProductInfo[];
  handleQuantityAdjust: (id: number, delta: number) => void;
  handleAddToCart: (cartItem: CartItem) => void;
}

export default function ProductContainer({
  data,
  productInfo,
  handleQuantityAdjust,
  handleAddToCart,
}: ProductContainerProps) {
  return (
    <div className="ProductContainer">
      {data.map((clothes) => {
        const info = productInfo.find((info) => info.id === clothes.id);
        if (!info) return null;

        return (
          <ItemCard
            key={clothes.id}
            {...clothes}
            productInfo={info}
            handleQuantityAdjust={(
              delta: number, //not sure if meant to be any type for delta or declared number but it removed error
            ) => handleQuantityAdjust(clothes.id, delta)}
            handleAddToCart={handleAddToCart}
          />
        );
      })}
    </div>
  );
}
