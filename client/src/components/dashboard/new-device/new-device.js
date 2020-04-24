// CORE
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Nav from "../../nav/nav";

//MATERIAL
import {
  Container,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { api_url } from "../../../global";

class NewDevice extends Component {
  constructor() {
    super();
    this.state = {
      tag: "",
      name: "",
      variable: "",
      unity: "",
      desc: "",
      min_alarm: null,
      max_alarm: null,
      color: "",
    };
  }
  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleSave();
    }
  };
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSave = () => {
    let tag = {
      tag: this.state.tag,
      name: this.state.name,
      variable: this.state.variable,
      unity: this.state.unity,
      desc: this.state.desc,
      color: this.state.color,
      min_alarm:this.state.min_alarm,
      max_alarm:this.state.max_alarm,
      user: localStorage.getItem("ID")
    };
    console.log(tag)
    axios
      .post(`${api_url}/tag`, tag)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        this.setState({ signedIn: false });
      });
  };
  render() {
    return (
      <div>
        <Nav title="Ideal Monitor - New Device" />
        <Container maxWidth="md">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                id="tag"
                name="tag"
                type="text"
                label="Tag"
                variant="outlined"
                fullWidth
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="name"
                name="name"
                type="text"
                label="Name"
                variant="outlined"
                fullWidth
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                variant="filled"
                /* className={classes.formControl} */
                fullWidth
              >
                <InputLabel id="variable-label">Variable</InputLabel>
                <Select
                  labelId="variable-label"
                  id="variable"
                  name="variable"
                  onChange={this.handleChange}
                //   fullWidth
                >
                  <MenuItem value="oxygen">Oxygen</MenuItem>
                  <MenuItem value="temperature">Temperature</MenuItem>
                  <MenuItem value="conductivity">Conductivity</MenuItem>
                  <MenuItem value="ph">pH</MenuItem>
                  <MenuItem value="salt">Salt</MenuItem>
                  {/* <MenuItem value="salt">Salt</MenuItem>
                  <MenuItem value="salt">Salt</MenuItem>
                  <MenuItem value="salt">Salt</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="unity"
                name="unity"
                type="text"
                label="Unity"
                variant="outlined"
                fullWidth
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="desc"
                name="desc"
                type="text"
                label="Description"
                variant="outlined"
                fullWidth
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="min_alarm"
                name="min_alarm"
                type="number"
                label="Min Alarm"
                variant="outlined"
                fullWidth
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="max_alarm"
                name="max_alarm"
                type="number"
                label="Max Alarm"
                variant="outlined"
                fullWidth
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="color"
                name="color"
                type="color"
                label="Color"
                variant="outlined"
                fullWidth
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={this.handleSave}
                size="large"
                component={Link} to="/"
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="warning"
                fullWidth
                size="large"
                component={Link} to="/"
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}
export default NewDevice;
