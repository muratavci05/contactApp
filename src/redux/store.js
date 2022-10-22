import contactsReducer from "./reducers/contactsReducer";

import {createStore,combineReducers} from "redux";

const rootReducers = combineReducers ({
    contactsState: contactsReducer
})

const store = createStore(rootReducers);

export default store;