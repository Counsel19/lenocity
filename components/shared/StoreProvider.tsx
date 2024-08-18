"use client"

import { store } from "@/lib/redux/store";
import { FC } from "react";
import { Provider } from "react-redux";

interface StoreProviderProps {
  children: React.ReactNode;
}
const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children} </Provider>;
};

export default StoreProvider;
