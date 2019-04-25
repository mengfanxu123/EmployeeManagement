import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { InputLabel, Input } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { editManagerList } from "../redux/action-creators/employees";
import NumberFormat from "react-number-format";

class Edit extends Component {
  constructor(props) {
    super(props);
    const { employeeDetail } = props;

    this.state = {
      avatar: null,
      name: employeeDetail.name,
      sex: employeeDetail.sex,
      title: employeeDetail.title,
      id: employeeDetail._id,
      startDate: employeeDetail.startDate,
      email: employeeDetail.email,
      newManager: employeeDetail.manager ? employeeDetail.manager._id : null,
      sms: employeeDetail.sms,
      previewURL: employeeDetail.avata ? employeeDetail.avatar.data : null,
      cellPhone: employeeDetail.cellPhone,
      numberOfDr: employeeDetail.numberOfDr
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(editManagerList(this.state.id));
  }

  handleAvatar = e => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ avatar: file, previewURL: reader.result });
    };
    reader.readAsDataURL(file);
  };

  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in this.state) {
      if (key !== "previewURL") {
        formData.append(key, this.state[key]);
      }
    }
    const { employeeDetail } = this.props;
    formData.append(
      "oldManager",
      employeeDetail.manager ? employeeDetail.manager._id : null
    );
    this.props.updateEmployee(formData);
    this.props.closeEdit();
  };

  handleManagerChange = e => this.setState({ newManager: e.target.value });

  render() {
    const { previewURL, name, newManager } = this.state;
    const { editManagerList } = this.props;
    return (
      <div className="editForm">
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
                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                    alt="loading..."
                  />
                )}
                <span>
                  <div>Please select a photo as avatar:</div>
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
              <TextValidator
                label="email"
                onChange={e => this.setState({ email: e.target.email })}
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
                format="+1(###)###-####"
                mask="_"
                label="officePhone"
                value={this.state.officePhone}
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
                name="sms"
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
                onChange={this.handleManagerChange}
                margin="normal"
                value={newManager}
              >
                <MenuItem>None</MenuItem>
                {editManagerList.map(employee => (
                  <MenuItem key={employee.id} value={`${employee._id}`}>
                    {employee.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={this.props.closeEdit}
            >
              Cancel
            </Button>
          </div>
        </ValidatorForm>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { editManagerList: state.employees.managerList };
};

export default connect(mapStateToProps)(Edit);
