// logic controller: App>ThriftHappens>Components
// this file will handle cart state logic and run itemCard
// and ItemsContainer.
// main brain of the application
import { useState } from "react";
import type {
  ClothingProduct,
  Fit,
  ClothingCategory,
  ClothingSize,
} from "../data/data";
import ItemsContainer from "./ItemsContainer";
import CheckoutContainer from "./CheckoutContainer";

interface ClothingData {
  data: ClothingProduct[];
}

export interface ProductInfo {
  // Links state entry to clothing catalog independently of array order
  id: number;
  image: string;
  name: string;
  fit: Fit;
  category: ClothingCategory;
  color: string;
  description: string;
  size: ClothingSize;
  //selected quantity
  quantity: number;
  //remaining quantity
  remQuantity: number;
  price: number;
}
//Used when Add To Cart is clicked. Captures what is in the Cart
export interface CartItem {
  // A new UUID identifies each cart entry
  id: string;
  image: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}
export default function ThriftHappens({ data }: ClothingData) {
  const [productInfo, setProductInfo] = useState<ProductInfo[]>(() =>
    data.map((data) => ({
      id: data.id,
      name: data.name,
      image: data.image,
      fit: data.fit,
      category: data.category,
      color: data.color,
      description: data.description,
      size: data.size,
      quantity: data.itemQuantity,
      remQuantity: data.quantity,
      price: data.price,
    })),
  );

  //start with empty cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);



  // HANDLERS //////////////////////////////////////


  //delta represents the change in value for the cart/add to btn...
  //this function uses the latest state, creates a new array using map,
  // and spreads copies only matching the object being clicked
  function handleQuantityAdjust(id: number, delta: number) {
    setProductInfo((prevData) =>
      prevData.map((info) =>
        info.id === id
          ? { ...info, quantity: Math.max(0, Math.min(info.quantity + delta)) }
          : info,
      ),
    );
  }
  //spreads a new array and copies the submitted CartItem snapshot
  function handleAddToCart(cartItem: CartItem) {
    setCartItems((prevCart) => {
      return [...prevCart, { ...cartItem }];
    });
  }

  function handleRemoveCartItem(id:string){
    setCartItems((prevCart) => 
      prevCart.filter((item) => item.id !== id)
  ); 
  }


  ///////////////////////////////////////////////
  //sends info to ItemContainer and CheckoutContainer, div ThriftHappens to adjust layout of page.
  return (
    <div className="ThriftHappens">
      <ItemsContainer
        data={data}
        productInfo={productInfo}
        handleQuantityAdjust={handleQuantityAdjust}
        handleAddToCart={handleAddToCart}
      />
      <CheckoutContainer cartData={cartItems} handleRemoveCartItem={handleRemoveCartItem} />
    </div>
  );
}
