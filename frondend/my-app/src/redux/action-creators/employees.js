import axios from "axios";
import { history } from "../../App";

export function requestStart() {
  return {
    type: "LIST_USER_FETCH_START"
  };
}
function requestSuccess(data) {
  return {
    type: "LIST_USER_FETCH_SUCCESS",
    data
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

function getManagerListStart() {
  return {
    type: "GET_MANAGER_LIST_START"
  };
}
function getManagerListFail(err) {
  return {
    type: "GET_MANAGER_LIST_FAIL",
    err
  };
}
function getManagerListSuccess(data) {
  return {
    type: "GET_MANAGER_LIST_SUCCESS",
    data
  };
}

function allEmployeeListStart() {
  return {
    type: "ALL_EMPLOYEE_LIST_START"
  };
}
function allEmployeeListFail(error) {
  return {
    type: "ALL_EMPLOYEE_LIST_FAIL",
    error
  };
}
function allEmployeeListSuccess(data) {
  return {
    type: "ALL_EMPLOYEE_LIST_SUCCESS",
    data
  };
}
export function addEmployees(formData) {
  return (dispatch, getState) => {
    axios
      .post("/users/addUser", formData)
      .then(reponse => {
        console.log("post sucess");
        dispatch(addEmployeeSuccess());
        dispatch(requestStart());
        history.push("/");
      })
      .catch(err => {
        dispatch(addEmployeeFail(err));
      });
  };
}

export function employeeList() {
  return (dispatch, getState) => {
    dispatch(allEmployeeListStart());
    axios
      .get("/users/employeeList")
      .then(reponse => {
        console.log("post sucess");
        // dispatch(updatePages());
        console.log(reponse.data);
        dispatch(allEmployeeListSuccess(reponse.data));
      })
      .catch(err => {
        dispatch(allEmployeeListFail(err));
      });
  };
}
export function editManagerList(id) {
  return (dispatch, getState) => {
    dispatch(getManagerListStart());
    axios
      .get("/users/editEmployeeList", {
        params: {
          id
        }
      })
      .then(reponse => {
        console.log(reponse.data);
        dispatch(getManagerListSuccess(reponse.data));
      })
      .catch(err => {
        dispatch(getManagerListFail(err));
      });
  };
}

export function allEmployees(defaultData) {
  return dispatch => {
    const {
      orderBy = "name",
      order = "asc",
      page = 0,
      limit = 5
    } = defaultData;
    console.log(defaultData, "defaultData");
    axios
      .get("/users/allEmployees", {
        params: {
          orderBy,
          order,
          page,
          limit
        }
      })
      .then(reponse => {
        console.log("post sucess");
        console.log(reponse.data, "resposnse data");
        dispatch(requestSuccess(reponse.data));
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

export function updateEmployee(formdata, defaultData) {
  console.log(formdata.get("id"), "editEmployee");
  return (dispatch, getState) => {
    axios
      .put("/users/updateEmployee?id=" + formdata.get("id"), formdata)

      .then(reponse => {
        requestStart();
        dispatch(allEmployees(defaultData));
        console.log(reponse);
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}
