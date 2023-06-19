import React from "react";
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { rest } from "msw";
import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import accountsReducer, { fetchFakeAccounts } from "store/features/accountsSlice";
import accountTypesReducer from "store/features/acccountTypesSlice";

const server = setupServer(
	rest.get("/api", (req, res, ctx) => {
		return res(ctx.json({
			loading: false,
			data: {
				accountType: "IGSB",
				currency: "$",
				default: true,
				funds: 10000,
				id: 1,
				isDemo: false,
				name: "Fake name",
				profitLoss: 0.23,
			},
			error: false,
		}))
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const expectedData = {
	loading: false,
	data: {
		accountType: "IGSB",
		currency: "$",
		default: true,
		funds: 10000,
		id: 1,
		isDemo: false,
		name: "Fake name",
		profitLoss: 0.23,
	},
	error: false,
}

test('Request', async () => {
	const postSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce(expectedData);
	const store = configureStore({
		reducer: {
			accounts: accountsReducer,
			accountTypes: accountTypesReducer,
		}
	});
	await store.dispatch(fetchFakeAccounts());
	expect(postSpy).toBeCalledWith("/api");
	const state = store.getState().accounts;
	expect(state).toStrictEqual(expectedData);
});
