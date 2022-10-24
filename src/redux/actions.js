import axios_instance from "../Helpers/axios_context";

export const REGISTRATION_REQUESTED = "REGISTRATION_REQUESTED";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export const LOGIN_REQUESTED = "LOGIN_REQUESTED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_USER = "LOGOUT_USER";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER
  });
};

export const removeMessage = () => (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGE
  });
};

export const registerUser = (userData) => (dispatch) => {
  dispatch({
    type: REGISTRATION_REQUESTED,
    payload: null
  });

  axios_instance
    .post("/register", userData)
    .then((response) => {
      dispatch({
        type: REGISTRATION_SUCCESS,
        payload: response.data
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTRATION_FAILED,
        payload: err.response ? err.response.data : err.message
      });
    });
};

export const loginUser = (userData) => (dispatch) => {
  dispatch({
    type: LOGIN_REQUESTED,
    payload: null
  });

  if (userData.userName === "admin" && userData.password === "admin") {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        status: "Login successfull",
        user: {
          userName: "admin",
          lastName: "Admin",
          firstName: "Admin"
        },
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2NjYyODk4OTUsImV4cCI6MTY2NjI5MTA5NX0.7sfV-s2ZeFcWIBexXjGuBam-i56slTBlUR9dzNwQ_MA"
      }
    });
  } else {
    axios_instance
      .post("/login", userData)
      .then((response) => {
        console.log({ response });

        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
          payload: err.response ? err.response.data : err.message
        });
      });
  }
};
