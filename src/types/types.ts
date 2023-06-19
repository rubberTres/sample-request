export type Nullable<T> = null | undefined | T;

export interface DataState<T> {
	loading: boolean
	data: T
	error: boolean
}