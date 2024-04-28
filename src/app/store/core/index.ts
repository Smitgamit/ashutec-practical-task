import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../../features/userSlice";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  type TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useAppDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
