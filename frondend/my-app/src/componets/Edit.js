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
  state = {
    avatar: null,
    name: this.props.employeeDetail.name,
    sex: this.props.employeeDetail.sex,
    title: this.props.employeeDetail.title,
    id: this.props.employeeDetail._id,
    startDate: this.props.employeeDetail.startDate,
    email: this.props.employeeDetail.email,
    manager: this.props.employeeDetail.manager,
    sms: this.props.employeeDetail.sms,
    previewURL: this.props.employeeDetail.avata
      ? this.props.employeeDetail.avatar.data
      : null,
    cellPhone: this.props.employeeDetail.cellPhone
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(editManagerList(this.state.id));
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
    //console.log(this.state);
    const formData = new FormData();
    for (let key in this.state) {
      if (key !== "previewURL") {
        formData.append(key, this.state[key]);
        //console.log(formData);
      }
    }
    //console.log(formData);
    this.props.updateEmployee(formData);
    this.props.closeEdit();
  };
  render() {
    const { previewURL, name } = this.state;
    const { editManagerList } = this.props;
    const employee = this.props.employeeDetail;
    console.log(employee);

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
                    src="https://static.standard.co.uk/s3fs-public/thumbnails/image/2017/08/15/12/smileyfaceemoji1508a.jpg?w968"
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
                label="Select"
                defaultValue={this.state.manager}
                onChange={e => this.setState({ manager: e.target.value })}
                margin="normal"
              >
                <MenuItem>None</MenuItem>
                {editManagerList.data.map(employee => (
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
  return { editManagerList: state.employees };
};

export default connect(mapStateToProps)(Edit);
