"use client";

import { store } from "@/lib/redux/store";
import { SessionProvider } from "next-auth/react";
import { FC } from "react";
import { Provider } from "react-redux";

interface StoreProviderProps {
  children: React.ReactNode;
}
const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
};

export default StoreProvider;
