import {token} from "../stores/authStore.js";
let tokenValue;
token.subscribe(value => {
    tokenValue = value;
})

export function isLoggedIn() {
    return tokenValue!==null || undefined;
}

export function isBidValid(bid, currentPrice) {
    return bid > currentPrice;
}