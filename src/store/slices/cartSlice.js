import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.products.find(item => item.id === newItem.id);
            if (!existingItem) {
                state.products.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }

            state.totalQuantity++;
            state.totalPrice += newItem.price;
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.products.find(item => item.id === id);

            if (existingItem) {

                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.totalPrice;

                state.products = state.products.filter(item => item.id !== id);
            }
        },
        incrementQuantity(state, action) {
            const id = action.payload;
            const existingItem = state.products.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += existingItem.price;
                state.totalQuantity++;
                state.totalPrice += existingItem.price;
            }
        },
        decrementQuantity(state, action) {
            const id = action.payload;
            const existingItem = state.products.find(item => item.id === id);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
                state.totalQuantity--;
                state.totalPrice -= existingItem.price;
            }
        },
        clearCart(state) {
            state.products = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addItem, removeItem, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;