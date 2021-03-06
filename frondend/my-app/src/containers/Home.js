import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import { BrowserRouter } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import {
  allEmployees,
  deleteEmployee,
  updateEmployee,
  requestStart
} from "../redux/action-creators/employees";
import Edit from "../componets/Edit";
import ReactDOM from "react-dom";
// import { AlertError } from "material-ui/svg-icons";

const rows = [
  { id: "avatar", numeric: false, disablePadding: false, label: "avatar" },
  { id: "name", numeric: false, disablePadding: false, label: "name" },
  { id: "title", numeric: false, disablePadding: false, label: "title" },
  { id: "sex", numeric: false, disablePadding: false, label: "sex" },
  {
    id: "startDate",
    numeric: false,
    disablePadding: false,
    label: "startDate"
  },
  {
    id: "officePhone",
    numeric: false,
    disablePadding: false,
    label: "officePhone"
  },
  // {
  //   id: "cellPhone",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "cellPhone"
  // },
  {
    id: "numberOfDr",
    numeric: true,
    disablePadding: false,
    label: "NumberOfDr"
  },
  { id: "sms", numeric: false, disablePadding: false, label: "sms" },
  { id: "manager", numeric: true, disablePadding: false, label: "manager" },
  { id: "email", numeric: true, disablePadding: false, label: "email" }
];
class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;
    return (
      <div>
        <TableHead>
          <TableRow>
            {rows.map(
              row => (
                <TableCell
                  key={row.id}
                  align={row.numeric ? "right" : "left"}
                  padding={row.disablePadding ? "none" : "default"}
                  sortDirection={orderBy === row.id ? order : false}
                >
                  <Tooltip
                    title="Sort"
                    placement={row.numeric ? "bottom-end" : "bottom-start"}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              ),
              this
            )}
          </TableRow>
        </TableHead>
      </div>
    );
  }
}
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

class Home extends Component {
  state = {
    edit: false,
    employee: null,
    total: 0,
    order: "asc",
    orderBy: "name",
    page: 0,
    searchVal: "",
    oldEmployee: "",
    isDisplayAllEmployee: true
    // curEmployee: []
  };

  eventListenerAdded = false;

  componentDidMount() {
    const { dispatch } = this.props;
    const defaultData = {
      order: this.state.order,
      orderBy: this.state.orderBy,
      page: this.state.page,
      limit: this.state.rowsPerPage
    };
    dispatch(allEmployees(defaultData));
  }

  componentDidUpdate() {
    const { employeeList } = this.props;
    if (!this.eventListenerAdded && !employeeList.isFetching) {
      this.eventListenerAdded = true;
      ReactDOM.findDOMNode(
        this.refs["table-body"]
      ).parentNode.parentNode.addEventListener("scroll", e => {
        const { srcElement } = e;
        const { clientHeight, scrollHeight, scrollTop } = srcElement;
        console.log(employeeList);
        if (
          !employeeList.isFetching &&
          employeeList.hasNextPage &&
          clientHeight + scrollTop === scrollHeight
        ) {
          this.nextPage();
        }
      });
    }
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy, page: 0 }, () => {
      const { dispatch } = this.props;
      const defaultData = {
        order: this.state.order,
        orderBy: this.state.orderBy,
        page: this.state.page,
        limit: this.state.rowsPerPage
      };
      dispatch(requestStart());
      dispatch(allEmployees(defaultData));
    });
  };

  nextPage = () => {
    const { page, isDisplayAllEmployee, employee } = this.state;
    const { dispatch } = this.props;
    this.setState({ page: page + 1 }, () => {
      if (isDisplayAllEmployee) {
        const defaultData = {
          order: this.state.order,
          orderBy: this.state.orderBy,
          page: this.state.page,
          limit: this.state.rowsPerPage
        };
        dispatch(allEmployees(defaultData));
      } else {
        const curData = {
          order: this.state.order,
          orderBy: this.state.orderBy,
          page: this.state.page,
          limit: this.state.rowsPerPage,
          managerId: employee._id
        };
        dispatch(allEmployees(curData));
      }
    });
  };

  handleChangeSearchVal = event => {
    this.setState({
      searchVal: event.target.value
    });
  };

  handleEdit = employee => {
    this.setState({ edit: true });
    console.log(employee);
    this.setState({ oldManager: employee.manager });
    this.setState({ employee: employee });
  };

  handleCloseEdit = () => {
    this.setState({ edit: false });
  };

  handleDelete = id => {
    this.setState({ page: 0 }, () => {
      const { dispatch } = this.props;
      const curData = {
        order: this.state.order,
        orderBy: this.state.orderBy,
        page: this.state.page,
        limit: this.state.rowsPerPage
      };
      dispatch(requestStart());
      dispatch(deleteEmployee(id, curData));
    });
  };
  handleUpdateEmployee = employee => {
    this.setState({ page: 0 }, () => {
      const { dispatch } = this.props;
      const curData = {
        order: this.state.order,
        orderBy: this.state.orderBy,
        page: this.state.page,
        limit: this.state.rowsPerPage
      };
      dispatch(updateEmployee(employee, curData));
    });
  };
  hanldeShowDr = employee => {
    this.setState({ page: 0, employee, isDisplayAllEmployee: false }, () => {
      if (employee.numberOfDr <= 0) {
        alert("NO DR");
      } else {
        const curData = {
          order: this.state.order,
          orderBy: this.state.orderBy,
          page: this.state.page,
          limit: this.state.rowsPerPage,
          managerId: employee._id
        };
        // console.log(curData, "curData");
        const { dispatch } = this.props;
        dispatch(requestStart());
        dispatch(allEmployees(curData));
      }
    });
  };
  handleReset = e => {
    this.setState(
      { page: 0, employee: null, isDisplayAllEmployee: true },
      () => {
        const { dispatch } = this.props;
        const defaultData = {
          order: this.state.order,
          orderBy: this.state.orderBy,
          page: this.state.page,
          limit: this.state.rowsPerPage
        };
        dispatch(allEmployees(defaultData));
      }
    );
  };

  render() {
    const { order, orderBy, searchVal } = this.state;
    const { employeeList } = this.props;
    console.log(employeeList.data, "employeeList");
    let usersUI;
    if (employeeList.isFetching) {
      usersUI = <p>Loading</p>;
    } else if (employeeList.error !== "") {
      usersUI = (
        <div>
          <div>
            <Button
              onClick={e => {
                this.handleReset();
              }}
            >
              Reset
            </Button>
          </div>
          <div>
            <TextField
              id="standard-search"
              label="Search for name"
              type="search"
              onChange={this.handleChangeSearchVal}
              value={this.state.searchVal}
            />
          </div>
          <BrowserRouter>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={employeeList.data.length}
            />
            <div style={{ overflow: "auto", height: "300px" }}>
              <Table style={{ tableLayout: "fixed" }}>
                <TableBody ref="table-body">
                  {employeeList.data.map((employee, index) => {
                    const lowerCaseName = employee.name.toLowerCase();
                    const lowerCaseSearchVal = searchVal.toLowerCase();
                    if (lowerCaseName.includes(lowerCaseSearchVal)) {
                      return (
                        <TableRow>
                          <TableCell>
                            {employee.avatar ? (
                              <Avatar alt="avatar" src={employee.avatar.data} />
                            ) : (
                              <Avatar
                                alt="avatar"
                                src={
                                  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                                }
                              />
                            )}
                          </TableCell>
                          <TableCell>{employee.name}</TableCell>
                          <TableCell>{employee.title}</TableCell>
                          <TableCell>{employee.sex}</TableCell>
                          <TableCell>{employee.startDate}</TableCell>
                          <TableCell>
                            <a href={`tel: ${employee.officePhone}`}>
                              {employee.officePhone}
                            </a>
                          </TableCell>
                          <TableCell
                            onClick={e => {
                              this.hanldeShowDr(employee);
                            }}
                          >
                            {employee.numberOfDr}
                          </TableCell>
                          <TableCell>{employee.sms}</TableCell>
                          <TableCell>
                            {employee.manager ? employee.manager.name : ""}
                          </TableCell>
                          <TableCell>
                            <a href={`mailto:${employee.email}`}>
                              {employee.email}
                            </a>
                          </TableCell>
                          <Button
                            variant="contained"
                            color="default"
                            onClick={e => {
                              this.handleDelete(employee._id);
                            }}
                          >
                            {/* <DeleteIcon /> */}
                            Delete
                          </Button>
                          <Button
                            onClick={e => {
                              this.handleEdit(employee);
                            }}
                          >
                            Edit
                          </Button>
                          {/* <Button
                            onClick={e => {
                              this.hanldeShowDr(employee);
                            }}
                          >
                            show DR
                          </Button> */}
                          <Dialog
                            open={this.state.edit}
                            aria-labelledby="form-dialog-title"
                          >
                            <DialogTitle id="form-dialog-title">
                              PLEASE EDIT INFORMATION
                            </DialogTitle>
                            <DialogContent>
                              <div>
                                <Edit
                                  buttonHandleEdit={this.handleEdit}
                                  employeeDetail={this.state.employee}
                                  updateEmployee={this.handleUpdateEmployee}
                                  closeEdit={this.handleCloseEdit}
                                />
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableRow>
                      );
                    } else {
                      return null;
                    }
                  })}
                </TableBody>
              </Table>
            </div>
          </BrowserRouter>
          {/* <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
          /> */}
        </div>
      );
    }
    return <div>{usersUI}</div>;
  }
}
const mapStateToProps = state => ({
  employeeList: state.employees
});

export default connect(mapStateToProps)(Home);
