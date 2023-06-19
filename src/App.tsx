import { useAppDispatch } from "store/hooks";
import { fetchAccounts } from "store/features/accountsSlice";
import AccountsDisplayer from "components/AccountsDisplayer";
import { fetchAccountTypes } from "store/features/acccountTypesSlice";
import { useEffect } from "react";

function App() {

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAccounts());
		dispatch(fetchAccountTypes());
	}, [])

	return (
		<AccountsDisplayer/>
	);
}

export default App;