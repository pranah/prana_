import { combineReducers } from "redux";
import web3 from "./web3Reducer.js";
import ipfs from "./ipfsReducer";

export default combineReducers({ web3, ipfs });