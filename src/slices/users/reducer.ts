import { createSlice } from "@reduxjs/toolkit";
import {
    getUserList,
    addUserList,
    updateUserList,
    deleteUserList,
} from './thunk';

export const initialState = {
    userList: [],
    userGrid: [],
    errors: {}
};

const UsersSlice = createSlice({
    name: 'Users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // List
        builder.addCase(getUserList.fulfilled, (state: any, action: any) => {
            state.userList = action.payload;
        });
        builder.addCase(getUserList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(addUserList.fulfilled, (state: any, action: any) => {
            state.userList.unshift(action.payload);
        });
        builder.addCase(addUserList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(updateUserList.fulfilled, (state: any, action: any) => {
            state.userList = state.userList.map((list: any) =>
                list.id === action.payload.id
                    ? { ...list, ...action.payload }
                    : list
            );
        });
        builder.addCase(updateUserList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(deleteUserList.fulfilled, (state: any, action: any) => {
            state.userList = state.userList.filter(
                (userList: any) => userList.id.toString() !== action.payload.toString()
            );
        });
        builder.addCase(deleteUserList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

    }
});

export default UsersSlice.reducer;