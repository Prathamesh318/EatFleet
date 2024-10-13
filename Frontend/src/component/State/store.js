import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import { authReducer } from "./Authentication/Reducer";

import {thunk} from "redux-thunk"
import restaurantReducer from "./Restaurant/Reducer";
import menuItemsReducer from "./Menu/Reducer";
const rootReducer=combineReducers(
    {
        auth:authReducer,
        restaurant:restaurantReducer,
        menu:menuItemsReducer

    }
)


export const store=legacy_createStore(rootReducer,applyMiddleware(thunk));