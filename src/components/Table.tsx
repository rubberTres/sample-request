import MUIDataTable, { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { useEffect, useRef, useState } from "react";
import { isNotNull } from "types/typeguards";

type Props =
	{
		title: string | JSX.Element,
		data: any[],
		className?: string,
		columns: MUIDataTableColumnDef[],
		options?: MUIDataTableOptions,
		cellHeight?: number,
		wrapperHeight: number
		defaultPage?: (rowsPerPage: number) => number
	}

function Table(props: Props) {

	const tableRef = useRef<HTMLDivElement>(null);

	const {
		data,
		columns,
		className = "",
		options,
		title,
		cellHeight = 53,
		wrapperHeight,
		defaultPage
	} = props;

	const [ rowsPerPage, setRowsPerPage ] = useState<MUIDataTableOptions["rowsPerPage"]>(1);

	useEffect(() => {
		if (!tableRef.current) return;

		const titleHeight = 64;
		const theadHeight = 69;
		const footerHeight = 53;
		const rowsPerPage = Math.floor((wrapperHeight - titleHeight - theadHeight - footerHeight) / cellHeight);
		if (rowsPerPage > 0) {
			setRowsPerPage(Math.min(rowsPerPage, data.length));
		}
	}, [ wrapperHeight, data.length ]);

	const defaultOptions: MUIDataTableOptions = {
		filterType: "dropdown",
		responsive: "simple",
		print: false,
		rowsPerPage: rowsPerPage,
		rowsPerPageOptions: rowsPerPage ? [ 10, 25, 50, rowsPerPage ].sort((a, b) => a - b) : undefined,
		selectableRows: "none",
		searchPlaceholder: "Search",
		selectToolbarPlacement: "none",
		download: false
	};

	if (isNotNull(defaultPage) && isNotNull(rowsPerPage)) {
		defaultOptions[ "page" ] = defaultPage(rowsPerPage);
	}

	const _getData = () => data.reduce((prev, next) => {
		const row = new Array(columns.length).fill(next);
		prev.push(row);
		return prev;
	}, []);

	const _getTheme = () => createTheme({
		typography: {
			fontFamily: "'Montserrat', Helvetica, Arial, serif"
		},
	});

	return (
		<div className={ className } style={ { height: "100%" } } ref={ tableRef }>
			<MuiThemeProvider theme={ _getTheme() }>
				<MUIDataTable
					title={ title }
					data={ _getData() }
					columns={ columns }
					options={ { ...defaultOptions, ...options } }
				/>
			</MuiThemeProvider>
		</div>
	);
}

export default Table;
