const initState = { isFetching: true, data: [], error: null };
const employees = (state = initState, action) => {
  switch (action.type) {
    case "LIST_USER_FETCH_START":
      return {
        ...state,
        isFetching: true,
        error: null,
        data: []
      };
    case "LIST_USER_FETCH_FAIL":
      return {
        ...state,
        error: action.error,
        isFetching: false,
        data: []
      };
    case "LIST_USER_FETCH_SUCCESS":
      console.log("test:" + action.users);
      const { employees } = action;
      return {
        ...state,
        isFetching: false,
        error: null,
        data: employees.data
      };

    case "ADD_MANAGER_SUCCESS":
      return {
        ...state,
        isFetching: false,
        error: null
      };

    default:
      return state;
  }
};

export default employees;
