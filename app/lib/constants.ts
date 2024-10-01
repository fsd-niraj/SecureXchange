import { Connection } from "@solana/web3.js";
import axios from "axios";
const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000;
let LAST_UPDATED: number | null = null;
let prices: { [key: string]: { price: string } } = {};

export let TOKENS: {
  name: string;
  mint: string;
  native: boolean;
}[] = [
  {
    name: "USDC",
    mint: "FSxJ85FXVsXSr51SeWf9ciJWTcRnqKFSmBgRDeL3KyWw",
    native: false,
  },
  {
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
  },
];

export const connection = new Connection("https://api.mainnet-beta.solana.com");

export async function getSupportedTokens() {
  if (
    !LAST_UPDATED ||
    new Date().getTime() - LAST_UPDATED < TOKEN_PRICE_REFRESH_INTERVAL
  ) {
    const response = await axios.get(
      "https://price.jup.ag/v6/price?ids=SOL,USDC,USDT"
    );
    prices = response.data.data;
    LAST_UPDATED = new Date().getTime();
  }
  return TOKENS.map((t) => ({
    ...t,
    price: prices[t.name],
  }));
}

getSupportedTokens();
