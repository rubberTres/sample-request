import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "store/features/accountsSlice";
import accountTypesReducer from "store/features/acccountTypesSlice";

export const store = configureStore({
	reducer: {
		accounts: accountsReducer,
		accountTypes: accountTypesReducer,
	}
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>