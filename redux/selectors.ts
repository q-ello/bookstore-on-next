import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from ".";
import { theCart } from "./BookSlice";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const loggedInSelector = (state: RootState) => state.user.logged_in
export const emailSelector = (state: RootState) => state.user.user.email
export const nameSelector = (state: RootState) => state.user.defaultName

export const cartSelector = theCart.getSelectors<RootState>((state) => state.books)
export const categorySelector = (state: RootState) => state.books.category