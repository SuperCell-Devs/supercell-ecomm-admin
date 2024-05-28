import { postLogin } from "helpers/fakebackend_helper";
import { loginError, loginSuccess, logoutSuccess } from "./reducer";
import { ThunkAction } from "redux-thunk";
import { Action, Dispatch } from "redux";
import { RootState } from "slices";

interface User {
    email: string;
    password: string;
}

export const loginUser = (
    user: User,
    history: any
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
    try {

        const response = await postLogin({
            email: user.email,
            password: user.password,
        });
        localStorage.setItem("authUser", JSON.stringify(response));

        // } else if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        //     const fireBaseBackend = await getFirebaseBackend();

        //     response = await fireBaseBackend.loginUser(
        //         user.email,
        //         user.password
        //     )
        // }

        // if (response) {
            dispatch(loginSuccess(response));
            history("/");
        // }
    } catch (error) {

        dispatch(loginError(error));
    }
};

export const logoutUser = () => async (dispatch: Dispatch) => {
    try {
        localStorage.removeItem("authUser");

        // const fireBaseBackend = await getFirebaseBackend();

        // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            // const response = fireBaseBackend.logout;
            // dispatch(logoutSuccess(response));
        // } else {
            dispatch(logoutSuccess(true));
        // }
    } catch (error) {
        dispatch(loginError(error));
    }
}

