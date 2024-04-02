import React from "react";
import AuthIcon from "pages/AuthenticationInner/AuthIcon";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetRegisterFlag } from "slices/thunk";
import { createSelector } from 'reselect';
import { Link, useNavigate } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik as useFormic } from "formik";

// Image
import logoLight from "assets/images/logo-light.png";
import logoDark from "assets/images/logo-dark.png";
import { RootState } from "slices";

const Register = () => {

    document.title = "Register | Supercell ecommerce adminstaration platform";

    const dispatch = useDispatch<any>();
    const navigation = useNavigate(); // Use the useNavigate hook

    const selectRegister = createSelector(
        (state: RootState) => state.Register,
        (register) => ({
            success: register.success
        })
    )

    const { success } = useSelector(selectRegister)

    const validation: any = useFormic({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: "",
            userName: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required("Please Enter Your Email"),
            userName: Yup.string(),
            password: Yup.string(),
            firstName: Yup.string(),
            lastName: Yup.string(),
            phoneNumber: Yup.string(),
        }),
        onSubmit: (values: any) => {
            dispatch(registerUser(values));
        }
    });

    React.useEffect(() => {

        if (success) {
            navigation('/login')
        }

        setTimeout(() => {
            dispatch(resetRegisterFlag());
        }, 3000);

    }, [dispatch, success, navigation]);

    React.useEffect(() => {
        const bodyElement = document.body;

        bodyElement.classList.add('flex', 'items-center', 'justify-center', 'min-h-screen', 'py-16', 'lg:py-10', 'bg-slate-50', 'dark:bg-zink-800', 'dark:text-zink-100', 'font-public');

        return () => {
            bodyElement.classList.remove('flex', 'items-center', 'justify-center', 'min-h-screen', 'py-16', 'lg:py-10', 'bg-slate-50', 'dark:bg-zink-800', 'dark:text-zink-100', 'font-public');
        }
    }, []);

    return (
        <React.Fragment>
            <div className="relative">

                <AuthIcon />

                <div className="mb-0 w-screen lg:w-[500px] card shadow-lg border-none shadow-slate-100 relative">
                    <div className="!px-10 !py-12 card-body">
                        <Link to="/">
                            <img src={logoLight} alt="" className="hidden h-6 mx-auto dark:block" />
                            <img src={logoDark} alt="" className="block h-6 mx-auto dark:hidden" />
                        </Link>

                        <form action="/" className="mt-10" id="registerForm"
                            onSubmit={(event: any) => {
                                event.preventDefault();
                                validation.handleSubmit();
                                return false;
                            }}>
                            <div className="mb-3">
                                <label htmlFor="email-field" className="inline-block mb-2 text-base font-medium">Email</label>
                                <input
                                    type="text"
                                    id="email-field"
                                    name="email"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    placeholder="Enter email"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.email || ""} />
                                {validation.touched.email && validation.errors.email ? (
                                    <div id="email-error" className="mt-1 text-sm text-red-500">{validation.errors.email}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userName-field" className="inline-block mb-2 text-base font-medium">userName</label>
                                <input
                                    type="text"
                                    id="userName-field"
                                    name="userName"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    placeholder="Enter userName"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.userName || ""} />
                                {validation.touched.userName && validation.errors.userName ? (
                                    <div id="userName-error" className="mt-1 text-sm text-red-500">{validation.errors.userName}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="firstName-field" className="inline-block mb-2 text-base font-medium">First name</label>
                                <input
                                    type="text"
                                    id="firstName-field"
                                    name="firstName"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    placeholder="Enter First name"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.firstName || ""} />
                                {validation.touched.firstName && validation.errors.firstName ? (
                                    <div id="userName-error" className="mt-1 text-sm text-red-500">{validation.errors.firstName}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName-field" className="inline-block mb-2 text-base font-medium">Last name</label>
                                <input
                                    type="text"
                                    id="lastName-field"
                                    name="lastName"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    placeholder="Enter Last name"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.lastName || ""} />
                                {validation.touched.lastName && validation.errors.lastName ? (
                                    <div id="userName-error" className="mt-1 text-sm text-red-500">{validation.errors.lastName}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName-field" className="inline-block mb-2 text-base font-medium">Phone number</label>
                                <input
                                    type="text"
                                    id="phoneNumber-field"
                                    name="phoneNumber"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    placeholder="07xxx"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.phoneNumber || ""} />
                                {validation.touched.phoneNumber && validation.errors.phoneNumber ? (
                                    <div id="phoneNumber-error" className="mt-1 text-sm text-red-500">{validation.errors.phoneNumber}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="inline-block mb-2 text-base font-medium">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    placeholder="Enter password"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.password || ""} />
                                {validation.touched.password && validation.errors.password ? (
                                    <div id="password-error" className="mt-1 text-sm text-red-500">{validation.errors.password}</div>
                                ) : null}
                            </div>
                            <div className="mt-10">
                                <button type="submit" className="w-full text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">Creat Account</button>
                            </div>

                            <div className="mt-10 text-center">
                                <p className="mb-0 text-slate-500 dark:text-zink-200">Already have an account ? <Link to="/login" className="font-semibold underline transition-all duration-150 ease-linear text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500">Login</Link> </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Register;