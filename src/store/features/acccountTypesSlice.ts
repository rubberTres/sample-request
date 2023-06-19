import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DataState, Nullable } from "types/types";


export type AccountTypeData = {
	id: string
	title: string
}

const initialState: DataState<Nullable<AccountTypeData[]>> = {
	loading: false,
	data: null,
	error: false,
}

const requestURL = "https://recruitmentdb-508d.restdb.io/rest/accounttypes";

const config = {
	headers: {
		"x-apikey": "5d9f48133cbe87164d4bb12c"
	}
};

export const fetchAccountTypes = createAsyncThunk(
	"fetchAccountType",
	async () => {
		const response = await axios.get<AccountTypeData[]>(requestURL, config);
		return response.data;
	}
)

const { reducer: accountTypesReducer } = createSlice({
	name: "Account types",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAccountTypes.pending, (state) => {
			state.loading = true;
		})
		builder.addCase(fetchAccountTypes.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.error = false;
		})
		builder.addCase(fetchAccountTypes.rejected, (state, action) => {
			console.error("Error", action.payload);
			state.loading = false;
			state.error = true;
		});
	},
});

export default accountTypesReducer;