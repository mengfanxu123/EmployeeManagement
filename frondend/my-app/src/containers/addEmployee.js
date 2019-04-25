import React, { Component } from "react";
import { connect } from "react-redux";
import { addEmployees, employeeList } from "../redux/action-creators/employees";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { InputLabel, Input } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";
import "./containers.css";
// import Avatar from "@material-ui/core/Avatar";
// // const styles = theme => ({
//   container: {
//     display: "flex",
//     flexWrap: "wrap"
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//     width: 200
//   },

//   bigAvatar: {
//     margin: 10,
//     width: 60,
//     height: 60
//   }
// });

class addEmployee extends Component {
  state = {
    name: "",
    title: "",
    sex: "male",
    startDate: "2017-05-24",
    officePhone: "",
    cellPhone: "",
    sms: "",
    email: "",
    manager: "",
    numberOfDr: "0",
    avatar: null,
    submitted: "false",
    previewURL: ""
  };
  componentDidMount() {
    this.setState({ numberOfDr: 0 });
    const { dispatch } = this.props;
    dispatch(employeeList());
  }
  handleAvatar = e => {
    let file = e.target.files[0];
    // console.log(file, "test files");
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ avatar: file, previewURL: reader.result });
    };
    reader.readAsDataURL(file);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { manager } = this.state;
    const managerID = manager || "";
    // console.log(managerID);
    console.log(this.state.sex, "test sex");
    this.setState({ submitted: true }, () => {
      const formData = new FormData();
      formData.append("manager", managerID);
      for (let key in this.state) {
        if (key !== "previewURL" && key !== "submitted" && key !== "manager") {
          formData.append(key, this.state[key]);
        }
      }

      const { dispatch } = this.props;
      dispatch(addEmployees(formData));
      setTimeout(() => this.setState({ submitted: false }), 10);
    });
  };

  render() {
    const { previewURL, name } = this.state;
    const { employees } = this.props;
    console.log(this.state.sex, "sex");
    return (
      <div className="addEmployeeForm">
        <h1>PLease Add Employee</h1>
        <ValidatorForm
          ref="from"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
          <div>
            <div className="imgForm">
              <div className="">
                {previewURL ? (
                  <img src={previewURL} alt="loading" />
                ) : (
                  <img
                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                    alt="loading..."
                  />
                )}
              </div>
              <span>
                <div>Please select a photo as avatar:</div>
                <div>
                  <input type="file" onChange={this.handleAvatar} />
                </div>
              </span>
            </div>

            <div>
              <TextValidator
                label="name"
                onChange={e => this.setState({ name: e.target.value })}
                name="name"
                value={name}
                validators={["required"]}
                errorMessages={[" name is required"]}
              />
            </div>
            <div>
              <TextValidator
                label="title"
                onChange={e => this.setState({ title: e.target.value })}
                name="title"
                value={this.state.title}
                validators={["required"]}
                errorMessages={["title is required"]}
              />
            </div>
            <div>
              <TextValidator
                label="email"
                onChange={e => this.setState({ email: e.target.value })}
                name="email"
                value={this.state.email}
                validators={["isEmail"]}
                errorMessages={["email is not valid"]}
              />
            </div>
            <div>
              <div>
                <InputLabel htmlFor=""> Gender </InputLabel>
              </div>
              <Select
                value={this.state.sex}
                onChange={e => this.setState({ sex: e.target.value })}
                // input={<Input name="sex" id="sex-help" />}
              >
                <MenuItem value="None">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </div>
            <TextField
              id="date"
              label="startDate"
              type="date"
              defaultValue={this.state.startDate}
              // className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              onChange={e => this.setState({ startDate: e.target.value })}
            />
            <div />
            <div>
              <NumberFormat
                customInput={TextField}
                format="+1(###)###-####"
                mask="_"
                label="officePhone"
                onChange={e => this.setState({ officePhone: e.target.value })}
                validators={["required"]}
              />
            </div>
            <div>
              <TextValidator
                label="cellPhone"
                onChange={e => this.setState({ cellPhone: e.target.value })}
                name="cellPhone"
                value={this.state.cellPhone}
                validators={["required"]}
                errorMessages={[" cellPhone is required"]}
              />
            </div>
            <div>
              <TextValidator
                label="sms"
                onChange={e => this.setState({ sms: e.target.value })}
                name="SMS"
                value={this.state.sms}
                validators={["required"]}
                errorMessages={[" sms is required"]}
              />
            </div>
            <div>
              <TextField
                id="manager"
                select
                label="manager"
                value={this.state.manager}
                onChange={e => this.setState({ manager: e.target.value })}
                margin="normal"
              >
                <MenuItem value="">None</MenuItem>
                {employees.allEmployeeList.map(employee => (
                  <MenuItem key={employee.id} value={`${employee._id}`}>
                    {employee.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={!this.state.submitted}
            >
              {(!this.state.submitted && "Your form is submitted!") ||
                (this.state.submitted && "Submit")}
            </Button>
          </div>
        </ValidatorForm>
      </div>
    );
  }
}
const mapStateToProps = function(state) {
  return { employees: state.employees };
};

// addEmployee.prototype = {
//   classes: PropTypes.object.isRequired
// };

export default connect(mapStateToProps)(addEmployee);
