import { combineReducers } from "redux";
import web3 from "./web3";
import ipfs from "./ipfs";

export default combineReducers({ web3, ipfs });