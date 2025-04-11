//This component creates a global state for managing the toy store application using React's Context API. It provides data and utility functions that can be accessed by other components.//
import { createContext, useEffect, useState } from "react";
import {menu_list} from "../toyAssets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    
    const url = "http://localhost:5175"
    const [toy_list, setToyList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("")
    const currency = "Lei";
    const deliveryCharge = 20;

    //Updates the cartItems state, adding or incrementing the quantity of an item.//
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    //If a token is available, it synchronizes the cart update with the backend via a POST request.//
        if (token) {
            try {
                const response = await fetch(`${url}/api/cart/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                    body: JSON.stringify({ itemId }),
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Failed to add to cart:", errorData.message);
                   
                }
            } catch (error) {
                console.error("Error adding to cart:", error);
             
            }
        }
    };
//Decrements the item quantity in cartItems.//
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    //Synchronizes the update with the backend if a token is available.//
        if (token) {
            try {
                const response = await fetch(`${url}/api/cart/remove`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                    body: JSON.stringify({ itemId }),
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Failed to remove item from cart:", errorData.message);
                   
                }
            } catch (error) {
                console.error("Error removing item from cart:", error);
                
            }
        }
    };
        

//Calculates the total price of items in the cart by multiplying their price and quantity.//
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            try {
              if (cartItems[item] > 0) {
                let itemInfo = toy_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }  
            } catch (error) {
                
            }
            
        }
        return totalAmount;
    }
//Fetches the list of toys from the backend and updates the toy_list state.//
    const fetchToyList = async () => {
        try {
            const response = await fetch(`${url}/api/toy/list`);
            
            if (response.ok) {
                
                const result = await response.json();
                console.log(response);
                setToyList(result.data);
            } else {
                console.error("Failed to fetch toy list");
            }
        } catch (error) {
            console.error("Error fetching toy list:", error);
        }
    };
    //Loads the user's cart data from the backend if they are authenticated.//
    const loadCartData = async (token) => {
        try {
            const response = await fetch(`${url}/api/cart/get`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                body: JSON.stringify({}), // Sending an empty body as per the original code
            });
    
            if (response.ok) {
                const result = await response.json();
                setCartItems(result.cartData);
            } else {
                console.error("Failed to load cart data");
            }
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };
    //Fetches the toy list and checks for a stored token on app load.Sets the token state if one is found in localStorage.//
    useEffect(() => {
        async function loadData() {
            await fetchToyList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
            }
            // const storedToken = localStorage.getItem("token");
            // if (storedToken) {
            //     setToken(storedToken);
            //     await loadCartData(storedToken);
            }
        
        loadData();
    }, []);

        const contextValue = {
        url,
        toy_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
        currency,
        deliveryCharge
    };
//Wraps props.children (all child components) in the StoreContext.Provider.
// Makes the contextValue available to all descendant components.//

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;