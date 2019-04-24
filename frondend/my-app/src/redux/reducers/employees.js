const initState = {
  isFetching: true,
  data: [],
  hasNextPage: false,
  error: null,
  managerList: [],
  isManagerListFetching: true,
  managerListError: null,
  allEmployeeListFetching: true,
  allEmployeeListErr: true,
  allEmployeeList: []
};
const employees = (state = initState, action) => {
  switch (action.type) {
    case "LIST_USER_FETCH_START":
      return {
        ...state,
        error: null,
        data: [],
        hasNextPage: false
      };
    case "LIST_USER_FETCH_FAIL":
      return {
        ...state,
        error: action.error,
        isFetching: false,
        data: [],
        hasNextPage: false
      };
    case "LIST_USER_FETCH_SUCCESS":
      const { data } = action;
      console.log("test", data);
      return {
        ...state,
        isFetching: false,
        error: null,
        data: [...state.data, ...data.docs],
        hasNextPage: data.hasNextPage
      };

    case "ADD_MANAGER_SUCCESS":
      return {
        ...state,
        isFetching: false,
        error: null
      };
    case "DELETE_EMPLOYEE_SUCCESS":
      return {
        ...state,
        isFetching: false,
        error: null
      };
    case "GET_MANAGER_LIST_START":
      return {
        ...state,
        managerListError: null,
        isManagerListFetching: true,
        managerList: []
      };
    case "GET_MANAGER_LIST_FAILED":
      return {
        ...state,
        managerListError: action.error,
        isManagerListFetching: false,
        managerList: []
      };
    case "GET_MANAGER_LIST_SUCCESS":
      return {
        ...state,
        managerListError: null,
        isManagerListFetching: false,
        managerList: action.data
      };
    case "ALL_EMPLOYEE_LIST_START":
      return {
        ...state,
        allEmployeeListErr: null,
        allEmployeeListFetching: true,
        allEmployeeList: []
      };
    case "ALL_EMPLOYEE_LIST_FAIL":
      return {
        ...state,
        allEmployeeListErr: action.error,
        allEmployeeListFetching: false,
        allEmployeeList: []
      };
    case "ALL_EMPLOYEE_LIST_SUCCESS":
      return {
        ...state,
        allEmployeeListErr: null,
        allEmployeeListFetching: false,
        allEmployeeList: action.data
      };
    default:
      return state;
  }
};

export default employees;
