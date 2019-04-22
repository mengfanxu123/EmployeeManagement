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

function deleteEmployeeSuccess() {
  return {
    type: "DELETE_EMPLOYEE_SUCCESS"
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

export function addEmployees(formData) {
  return (dispatch, getState) => {
    axios
      .post("/users/addUser", formData)
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
    const { orderBy = "name", order = "asc" } = defaultData;
    axios
      .get("/users/allEmployees", {
        params: {
          orderBy,
          order
        }
      })
      .then(reponse => {
        console.log("post sucess");
        // dispatch(updatePages());
        console.log(reponse.data.docs);
        dispatch(requestSuccess(reponse.data.docs));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}

export function deleteEmployee(employeeId, curData) {
  console.log("deleteEmployee", employeeId);
  return (dispatch, getState) => {
    axios
      .delete("/users/delete?id=" + employeeId)
      .then(reponse => {
        dispatch(deleteEmployeeSuccess());
        console.log(reponse);
      })
      .then(reponse => {
        dispatch(allEmployees(curData));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}
