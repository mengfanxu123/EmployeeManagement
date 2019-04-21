import React, { Component } from "react";
import { connect } from "react-redux";
import { addEmployees, employeeList } from "../redux/action-creators/employees";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { InputLabel, Input } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

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
    this.setState({ numberOfDr: 1 });
    const { dispatch } = this.props;
    dispatch(employeeList());
  }
  handleAvatar = e => {
    let file = e.target.files[0];
    console.log(file, "test files");
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ avatar: file, previewURL: reader.result });
    };
    reader.readAsDataURL(file);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true }, () => {
      //   const {
      //     name,
      //     title,
      //     sex,
      //     startDate,
      //     officePhone,
      //     cellPhone,
      //     numberOfDr,
      //     sms,
      //     email,
      //     manager,
      //     avatar
      //   } = this.state;
      //   const employee = {
      //     name,
      //     title,
      //     sex,
      //     startDate,
      //     officePhone,
      //     cellPhone,
      //     sms,
      //     email,
      //     manager,
      //     numberOfDr,
      //     avatar
      //   };
      const formData = new FormData();
      for (let key in this.state) {
        formData.append(key, this.state[key]);
      }
      const { dispatch } = this.props;
      dispatch(addEmployees(formData));
      setTimeout(() => this.setState({ submitted: false }), 10);
    });
  };

  render() {
    // const { classes } = this.props;
    const { previewURL, name } = this.state;
    const { employees } = this.props;
    return (
      <div className="addform">
        <h1>PLease Add Employee</h1>
        <ValidatorForm
          ref="from"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
          <div>
            <div className="imgForm">
              <div>
                {previewURL ? (
                  <img src={previewURL} alt="loading" />
                ) : (
                  <img
                    src="https://static.standard.co.uk/s3fs-public/thumbnails/image/2017/08/15/12/smileyfaceemoji1508a.jpg?w968"
                    alt="loading..."
                  />
                )}
                <span>
                  Please select a photo as avatar:
                  <div>
                    <input type="file" onChange={this.handleAvatar} />
                  </div>
                </span>
              </div>
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
              <div>
                <InputLabel htmlFor=""> Gender </InputLabel>
              </div>
              <Select
                value={this.state.sex}
                onChange={e => this.setState({ sex: e.target.value })}
                input={<Input name="sex" id="sex-help" />}
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
                format="+1 (###) ###-####"
                mask="_"
                onChange={e => this.setState({ officePhone: e.target.value })}
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
                label="Select"
                value={this.state.manager}
                onChange={e => this.setState({ manager: e.target.value })}
                //   SelectProps={{
                //     MenuProps: {
                //       className: classes.menu
                //     }
                //   }}
                margin="normal"
              >
                <MenuItem>None</MenuItem>
                {employees.data.map(employee => (
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

// addEmployee.prototype = {
//   classes: PropTypes.object.isRequired
// };
// const mapStateToProps = state => ({
//   employees: state.employees
// });

const mapStateToProps = function(state) {
  return { employees: state.employees };
};

export default connect(mapStateToProps)(addEmployee);
