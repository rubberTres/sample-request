import { useAppSelector } from "store/hooks";
import { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import { AccountData } from "store/features/accountsSlice";
import Table from "components/Table";
import Loader from "components/Loader";

function AccountsDisplayer() {

	const {
		accounts,
		accountTypes,
	} = useAppSelector(state => state);

	const getAccountType = (accountType: string) => {
		return accountTypes.data?.find(singleAccountType => singleAccountType.id === accountType)?.title || accountType;
	}

	const getData = () => {
		if (accountTypes.loading || accounts.loading || accounts.error) return [];
		return accounts.data || [];
	}

	const columns: MUIDataTableColumnDef[] = [
		{
			name: "Name",
			options: {
				filter: false,
				sort: true,
				sortCompare: order => (a: { data: AccountData }, b: { data: AccountData }) => {
					if (order === "asc") {
						return a.data.name.localeCompare(b.data.name);
					} else {
						return b.data.name.localeCompare(a.data.name);
					}
				},
				customBodyRender: ({ name }: AccountData) => <div>{ name }</div>
			},
		},
		{
			name: "Profit & Loss",
			options: {
				filter: false,
				sort: true,
				sortCompare: order => (a: { data: AccountData }, b: { data: AccountData }) => {
					if (order === "asc") {
						return a.data.profitLoss - b.data.profitLoss;
					} else {
						return b.data.profitLoss - a.data.profitLoss;
					}
				},
				customBodyRender: ({ currency, profitLoss }: AccountData) => <div>{ `${ currency } ${ profitLoss }` }</div>
			},
		},
		{
			name: "Account Type",
			options: {
				filter: false,
				sort: true,
				hint: accountTypes.error ? "There was a problem fetching account types" : undefined,
				sortCompare: order => (a: { data: AccountData }, b: { data: AccountData }) => {
					if (order === "asc") {
						return a.data.accountType.localeCompare(b.data.accountType);
					} else {
						return b.data.accountType.localeCompare(a.data.accountType);
					}
				},
				customBodyRender: ({ accountType }: AccountData) => <div>{ getAccountType(accountType) }</div>
			},
		},
	];

	const tableOptions: MUIDataTableOptions = {
		search: false,
		filter: false,
		viewColumns: false,
		textLabels: {
			body: {
				noMatch: accounts.error ? "Error fetching accounts" : <Loader/>,
			},
		}
	};

	return (
		<Table
			title={ "Accounts" }
			data={ getData() }
			columns={ columns }
			wrapperHeight={ 900 }
			options={ tableOptions }
		/>
	);
}

export default AccountsDisplayer;