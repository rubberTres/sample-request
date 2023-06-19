import { Nullable } from "types/types";

export const isNotNull = <T>(object: Nullable<T>): object is T => object !== null && object !== undefined;
export const isNull = <T>(object: Nullable<T>): object is T => object === null || object === undefined;
