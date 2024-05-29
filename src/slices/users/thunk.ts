import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getUserList as getUserListApi,
    addUserList as addUserListApi,
    updateUserList as updateUserListApi,
    deleteUserList as deleteUserListApi,
} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const getUserList = createAsyncThunk("users/getUserList", async () => {
    try {
        const response = getUserListApi();
        return response;
    } catch (error) {
        return error;
    }
});
export const addUserList = createAsyncThunk("users/addUserList", async (event: any) => {
    try {
        const response = addUserListApi(event);
        const data = await response;
        toast.success("User Added Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("User Added Failed", { autoClose: 2000 });
        return error;
    }
});
export const updateUserList = createAsyncThunk("users/updateUserList", async (event: any) => {
    try {
        const response = updateUserListApi(event);
        const data = await response;
        toast.success("User updated Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("User updated Failed", { autoClose: 2000 });
        return error;
    }
});
export const deleteUserList = createAsyncThunk("users/deleteUserList", async (event: any) => {
    try {
        const response = deleteUserListApi(event);
        toast.success("User deleted Successfully", { autoClose: 2000 });
        return response;
    } catch (error) {
        toast.error("User deleted Failed", { autoClose: 2000 });
        return error;
    }
});
