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
  //productId links to original product id instead of unique UUID for transactions
  productId: number;
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
      quantity: data.itemQuantity, //selected quantity
      remQuantity: data.quantity, //stock quantity
      price: data.price,
    })),
  );

  //start with empty cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // HANDLERS //////////////////////////////////////

  //delta represents the change in value for the cart/add to btn... not remQuantity which is how much stock there is
  //this function uses the latest state, creates a new array using map,
  // and spreads copies only matching the object being clicked
  function handleQuantityAdjust(id: number, delta: number) {
    setProductInfo((prevData) =>
      prevData.map((info) =>
        info.id === id
          ? {
              ...info,
              quantity: Math.max(
                //handles validation of stock/quant adjuster
                0,
                Math.min(info.remQuantity, info.quantity + delta),
                //treated as second num of mathMax, which returns the lowest of either stock
                //quantity or what the user selects. so if they try to click counter past
                //remaining stock the button will still show according to how much stock there is
              ),
            }
          : info,
      ),
    );
  }
  //spreads a new array and copies the submitted CartItem snapshot
  function handleAddToCart(cartItem: CartItem) {
    if (cartItem.quantity === 0) {
      return;
    } //checks if there is zero stock, if there is, nothing is added to cart

    setCartItems((prevCart) => {
      const existingCartItem = prevCart.find(
        (item) => item.productId === cartItem.productId,
      ); // function to find if the cartItem is already in the cart,,, if it is we will increment the existing item if it isn't then add it
      if (existingCartItem) {
        return prevCart.map((item) =>
          item.productId === cartItem.productId
            ? {
                ...item,
                quantity: item.quantity + cartItem.quantity, //if existingCartItem is found, merge quantites and total
                total: item.total + cartItem.total,
              }
            : item,
        );
      }
      return [...prevCart, { ...cartItem }];
    });

    setProductInfo((prevData) =>
      prevData.map((info) =>
        info.id === cartItem.productId
          ? {
              ...info,
              remQuantity: info.remQuantity - cartItem.quantity,
              quantity: 0,
            }
          : info,
      ),
    );
  }

  function handleRemoveCartItem(cartItem: CartItem) {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== cartItem.id),
    );

    setProductInfo((prevData) =>
      prevData.map((info) =>
        info.id === cartItem.productId
          ? {
              ...info,
              remQuantity: info.remQuantity + cartItem.quantity,
            }
          : info,
      ),
    );
  }

  function handleEmptyCart(items: CartItem[]) {
    setProductInfo((prevData) =>
      prevData.map((info) => {
        const cartItem = items.find((item) => item.productId === info.id); //finds cartItems with ids that match stock/catalog

        //returns cartItems quantity back to the total stock count
        return cartItem
          ? {
              ...info,
              remQuantity: info.remQuantity + cartItem.quantity,
            }
          : info;
      }),
    );

    setCartItems([]); // fresh cart array
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
      <CheckoutContainer
        cartData={cartItems}
        handleRemoveCartItem={handleRemoveCartItem}
        handleEmptyCart={handleEmptyCart}
      />
    </div>
  );
}
