import { ThunkAction } from "redux-thunk";
import { RootState } from "slices";
import { Action, Dispatch } from "redux";
import { postRegister as RegisterUser } from "helpers/fakebackend_helper";
import { registerFailed, registerSuccess, resetRegister } from "./reducer";
// import { getFirebaseBackend } from "helpers/firebase_helper";

export interface User {
    email: string;
    username?: string;
    password?: string;
    firstName: string;
    lastName?: string;
}

export const registerUser = (user: User
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
    try {
        // if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
        const response = await RegisterUser(user);
        // } else if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            
        //     // initialize relevant method of both Auth
        //     const fireBaseBackend = getFirebaseBackend();

        //     response = fireBaseBackend.registerUser(user.email, user.password);
        // }
        if (response) {
            dispatch(registerSuccess(response));
        }
    } catch (error) {
        dispatch(registerFailed(error));
    }
};

export const resetRegisterFlag = () => {
    try {
        const response = resetRegister(false);
        return response;
    } catch (error) {
        return error;
    }
};