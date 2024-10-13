import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import { authReducer } from "./Authentication/Reducer";

import {thunk} from "redux-thunk"
import restaurantReducer from "./Restaurant/Reducer";
import menuItemsReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
// import orderReducer from "./Order/Reducer";
import restaurantsOrderReducer from "./Restaurant Order/Reducer";
import ingredientReducer from "./Ingredients/Reducer";
import orderReducer from "./order/Reducer";
// import orderReducer from "./Order/Reducer";
// import { orderReducer } from "./order/Reducer";
// import cartReducer from "./order/Reducer";
const rootReducer=combineReducers(
    {
        auth:authReducer,
        restaurant:restaurantReducer,
        menu:menuItemsReducer,
        cart:cartReducer,
        restaurantOrder:restaurantsOrderReducer,
        ingredients:ingredientReducer,
        order:orderReducer

    }
)


export const store=legacy_createStore(rootReducer,applyMiddleware(thunk));