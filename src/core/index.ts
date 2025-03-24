import { set, getFromArgs } from "./manipulation";

export * from "./types";
export * from "./constants";
export * from "./detection";
export * from "./browser";

export const setUserAgent = set;
export const getUserAgent = getFromArgs;
