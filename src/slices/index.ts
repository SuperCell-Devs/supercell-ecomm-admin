import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// login
import LoginReducer from "./auth/login/reducer";

// register
import RegisterReducer from "./auth/register/reducer";

// userProfile
import ProfileReducer from "./auth/profile/reducer";


// Ecommerce
import EcommerceReducer from "./ecommerce/reducer";

// Users
import UsersReducer from "./users/reducer";

const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Login: LoginReducer,
    Register: RegisterReducer,
    Profile: ProfileReducer,
    Ecommerce: EcommerceReducer,
    Users: UsersReducer,
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;