import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DataState, Nullable } from "types/types";

export type AccountData = {
	accountType: string
	currency: string
	default: boolean
	funds: number
	id: number
	isDemo: boolean
	name: string
	profitLoss: number
	_id: string
}

const initialState: DataState<Nullable<AccountData[]>> = {
	loading: false,
	data: null,
	error: false,
}

const requestURL = "https://recruitmentdb-508d.restdb.io/rest/accounts";

const config = {
	headers: {
		"x-apikey": "5d9f48133cbe87164d4bb12c"
	}
};

export const fetchAccounts = createAsyncThunk(
	"fetchAccounts",
	async () => {
		const response = await axios.get<AccountData[]>(requestURL, config);
		return response.data;
	}
)

export const fetchFakeAccounts = createAsyncThunk(
	"fetchFakeAccounts",
	async () => {
		const response = await axios.get<AccountData[]>("/api");
		return response.data;
	}
)

const { reducer: accountsReducer } = createSlice({
	name: "Accounts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAccounts.pending, (state) => {
			state.loading = true;
		})
		builder.addCase(fetchFakeAccounts.pending, (state) => {
			state.loading = true;
		})
		builder.addCase(fetchAccounts.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.error = false;
		})
		builder.addCase(fetchFakeAccounts.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.error = false;
		})
		builder.addCase(fetchAccounts.rejected, (state, action) => {
			console.error("Error", action.payload);
			state.loading = false;
			state.error = true;
		});
		builder.addCase(fetchFakeAccounts.rejected, (state, action) => {
			console.error("Error", action.payload);
			state.loading = false;
			state.error = true;
		});
	},
});

export default accountsReducer;