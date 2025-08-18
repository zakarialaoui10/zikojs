import { timeout } from "./timeout.js";
export const sleep = (ms) => timeout(ms).promise;

// use it with await 