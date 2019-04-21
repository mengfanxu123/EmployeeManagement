import axios from "axios";
import { history } from "../../App";

function requestStart() {
  return {
    type: "LIST_USER_FETCH_START"
  };
}
function requestSuccess(employees) {
  return {
    type: "LIST_USER_FETCH_SUCCESS",
    employees
  };
}
function requestFail(error) {
  return {
    type: "LIST_USER_FETCH_FAIL",
    error
  };
}
function addEmployeeStart() {
  return {
    type: "ADD_MANAGER_START"
  };
}
function addEmployeeFail(err) {
  return {
    type: "ADD_MANAGER_FAIL",
    err
  };
}
function addEmployeeSuccess() {
  return {
    type: "ADD_MANAGER_SUCCESS"
  };
}

// export function updatePages(page = 0, limit = 5) {
//   return (dispatch, getState) => {
//     console.log("updatepages!!");
//     axios
//       .get("/users/pages?page=" + page + "&limit=" + limit)
//       .then(response => {
//         console.log("update pages in response");
//         dispatch(requestSuccess(response.data));
//       })
//       .catch(err => {
//         dispatch(requestFail(err));
//       });
//   };
// }

export function addEmployees(employee) {
  return (dispatch, getState) => {
    axios
      .post("/users/addUser", employee)
      .then(reponse => {
        console.log("post sucess");
        dispatch(addEmployeeSuccess());
        history.push("/");
      })
      .catch(err => {
        dispatch(addEmployeeFail(err));
      });
  };
}

export function employeeList() {
  return (dispatch, getState) => {
    axios
      .get("/users/employeeList")
      .then(reponse => {
        console.log("post sucess");
        // dispatch(updatePages());
        console.log(reponse.data);
        dispatch(requestSuccess(reponse.data));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}

export function allEmployees(defaultData) {
  return (dispatch, getState) => {
    axios
      .get("/users/allEmployees", defaultData)
      .then(reponse => {
        console.log("post sucess");
        // dispatch(updatePages());
        console.log(reponse.data);
        dispatch(requestSuccess(reponse.data));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}
