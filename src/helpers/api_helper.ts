import axios from "axios";
import { User } from "slices/thunk";
// import { api } from "../config";

/**
 * Platform instance 
 * 
 * 
 * 
 * 
 * 
 */
const axiosEcommerceInstance = axios.create({
  baseURL: "https://ecom.super-cell-dev.org/api/v1/",
  headers: { 
    post: {
      "Content-Type": "application/json",
    }
  }
});
axiosEcommerceInstance.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      //  handle case 400 (.NET errors)
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);

// content type
const authUser: any = localStorage.getItem("authUser")
const token = JSON.parse(authUser) ? JSON.parse(authUser).token : null;
if (token)
axiosEcommerceInstance.defaults.headers.common["Authorization"] = "Bearer " + token;


class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url: any, params?: any) => {
    let response;

    const paramKeys: any = [];

    if (params) {
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axiosEcommerceInstance.get(`${url}?${queryString}`, params);
    } else {
      response = axiosEcommerceInstance.get(`${url}`, params);
    }

    return response;
  };
  /**
   * post given data to url
   */
  create = (url: any, data: any) => {
    return axiosEcommerceInstance.post(url, data);
  };

  // File upload
  upload = (url: any, data: any) => {
    // Note: we are using Axios automatic serlization.
      return axiosEcommerceInstance.post(
        url,
        {
          name: `${Date.now()}_image`,
          file: data
        }, 
        { 
          headers: {
            'Content-Type': `multipart/form-data;`,
         }
        });
      };
  /**
   * Updates data
   */
  update = (url: any, data: any) => {
    return axiosEcommerceInstance.patch(url, data);
  };

  put = (url: any, data: any) => {
    return axiosEcommerceInstance.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url: any, config: any) => {
    return axiosEcommerceInstance.delete(url, { ...config });
  };
}




/**
 * Authentication instance
 * 
 * 
 * 
 * 
 */
const axiosAuthenticationInstance = axios.create({
  baseURL: "https://auth.super-cell-dev.org/api/",
  headers: { 
    post: {
      "Content-Type": "application/json",
    }
  }
});
axiosAuthenticationInstance.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      //  handle case 400 (.NET errors)
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);


class AuthenticationAPIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url: any, params?: any) => {
    let response;

    const paramKeys: any = [];

    if (params) {
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axiosAuthenticationInstance.get(`${url}?${queryString}`, params);
    } else {
      response = axiosAuthenticationInstance.get(`${url}`, params);
    }

    return response;
  };
  /**
   * post given data to url
   */
  create = (url: any, data: User) => {
    return axiosAuthenticationInstance.post(url, data);
  };

  // File upload
  upload = (url: any, data: any) => {
    // Note: we are using Axios automatic serlization.
      return axiosAuthenticationInstance.post(
        url,
        {
          name: `${Date.now()}_image`,
          file: data
        }, 
        { 
          headers: {
            'Content-Type': `multipart/form-data;`,
         }
        });
      };
  /**
   * Updates data
   */
  update = (url: any, data: any) => {
    return axiosAuthenticationInstance.patch(url, data);
  };

  put = (url: any, data: any) => {
    return axiosAuthenticationInstance.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url: any, config: any) => {
    return axiosAuthenticationInstance.delete(url, { ...config });
  };
}



/**
 * 
 * Helpers
 * 
 */

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: any) => {
  axiosEcommerceInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
};

/**
 * 
 * Get logged user
 * @returns User
 */
const getLoggedUser = () => {

  const user = localStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, AuthenticationAPIClient, setAuthorization, getLoggedUser };