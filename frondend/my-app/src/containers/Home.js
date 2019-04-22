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
import TablePagination from "@material-ui/core/TablePagination";
import Tooltip from "@material-ui/core/Tooltip";
import {
  BrowserRouter,
  Route,
  Link as RouterLink,
  Switch
} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
// import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import {
  allEmployees,
  deleteEmployee
} from "../redux/action-creators/employees";
import Edit from "../componets/Edit";
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
  {
    id: "cellPhone",
    numeric: false,
    disablePadding: false,
    label: "cellPhone"
  },
  {
    id: "numberOfDr",
    numeric: true,
    disablePadding: false,
    label: "NumberOfDr"
  },
  { id: "sms", numeric: false, disablePadding: false, label: "sms" },
  { id: "manager", numeric: true, disablePadding: false, label: "manager" }
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
    manager: [],
    total: 0,
    order: "asc",
    orderBy: "name",
    page: 0,
    searchVal: ""
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const defaultData = {
      page: this.state.page,
      order: this.state.order,
      orderBy: this.state.orderBy
    };
    dispatch(allEmployees(defaultData));
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy }, () => {
      const { dispatch } = this.props;
      const defaultData = {
        page: this.state.page,
        order: this.state.order,
        orderBy: this.state.orderBy
      };
      dispatch(allEmployees(defaultData));
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page }, () => {
      const { dispatch } = this.props;
      const defaultData = {
        page: this.state.page,
        order: this.state.order,
        orderBy: this.state.orderBy
      };
      dispatch(allEmployees(defaultData));
    });
  };

  handleChangeSearchVal = event => {
    this.setState({
      searchVal: event.target.value
    });
  };

  handleEdit = user => {
    this.setState({ edit: true });
    this.setState({ user: user });
    console.log(this.state.edit, "test Eidt");
  };

  handleCloseEdit = () => {
    this.setState({ edit: false });
  };

  handleDelete = id => {
    console.log("handleDate", id);
    const { dispatch } = this.props;
    const curData = {
      page: this.state.page,
      order: this.state.order,
      orderBy: this.state.orderBy
    };
    dispatch(deleteEmployee(id, curData));
  };

  render() {
    const { order, orderBy, rowsPerPage, page, searchVal, total } = this.state;
    const { employeeList } = this.props;
    let usersUI;
    console.log(this.props.employeeList);
    if (employeeList.isFetching) {
      usersUI = <p>Loading</p>;
    } else if (employeeList.error !== "") {
      usersUI = (
        <div className="tableStyle">
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
            <Table>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={employeeList.data.length}
              />
              <TableBody>
                {employeeList.data.map((employee, index) => {
                  const lowerCaseName = employee.name.toLowerCase();
                  const lowerCaseSearchVal = searchVal.toLowerCase();
                  if (lowerCaseName.includes(lowerCaseSearchVal)) {
                    return (
                      <TableRow>
                        <TableCell>
                          <Avatar alt="avatar" src={employee.avatar.data} />
                        </TableCell>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.title}</TableCell>
                        <TableCell>{employee.sex}</TableCell>
                        <TableCell>{employee.starDate}</TableCell>
                        <TableCell>{employee.officePhone}</TableCell>
                        <TableCell>{employee.numberOfDr}</TableCell>
                        <TableCell>
                          {employee.manager.length === 0
                            ? ""
                            : employee.manager[0].name}
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
                        <Dialog
                          open={this.state.edit}
                          onClose={this.closeEdit}
                          aria-labelledby="form-dialog-title"
                        >
                          <DialogTitle id="form-dialog-title">
                            PLEASE EDIT INFORMATION
                          </DialogTitle>
                          <DialogContent>
                            <div>
                              <Edit
                                buttonHandleEdit={this.handleEdit}
                                userDetail={this.state.employee}
                                // updateUser={this.props.updateUser}
                                closeEdit={this.closeEdit}
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
          </BrowserRouter>
          <TablePagination
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
          />
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
