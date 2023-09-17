import { APIkey } from "@/data";
import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export enum Currency {
    RUB = '₽',
    EUR = '€',
    GBP = '£',
    JPY = '¥',
    USD = '$'
}

export interface BookType {
    cover: string,
    authors: string,
    title: string,
    rating?: number,
    reviews?: number,
    description: string,
    price?: number,
    id: string,
    currency?: Currency
}

export interface BookInTheCartType extends BookType {
    quantity: number
}

export const theCart = createEntityAdapter<BookInTheCartType>()

export const booksSlice = createSlice({
    name: 'books',
    initialState: theCart.getInitialState({
        category: 'Architecture'
    }),
    reducers: {
        toggleCart(state, action: PayloadAction<BookType>) {
            const book = action.payload
            if (state.ids.includes(book.id)) {
                theCart.removeOne(state, book.id)
            } else {
                theCart.addOne(state, {...book, quantity: 1})
            }
        },
        changeBookQuantity(state, action: PayloadAction<{ id: string, changes: {quantity: number}}>) {
            theCart.updateOne(state, action)
            if (action.payload.changes.quantity === 0) {
                theCart.removeOne(state, action.payload.id)
            }
        },
        changeCategory(state, action: PayloadAction<string>) {
            state.category = action.payload
        },
    },
})

export const { toggleCart, changeBookQuantity, changeCategory } = booksSlice.actions
