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

class EditDevice extends Component {
  tagId;
  constructor() {
    super();

    // fetch(`https://api.twitter.com/user/${handle}`)
    //   .then((user) => {
    //     this.setState(() => ({ user }))
    //   })

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

  componentDidMount() {
    this.tagId = this.props.match.params.id;
    axios.get(`${api_url}/tag/${this.tagId}`).then((res) => {
      console.log(res);
      const tag = res.data.data;
      this.setState({
        tag: tag.tag,
        name: tag.name,
        variable: tag.variable,
        unity: tag.unity,
        desc: tag.desc,
        color: tag.color,
        min_alarm: tag.min_alarm,
        max_alarm: tag.max_alarm,
        user: localStorage.getItem("ID"),
      });
    });
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
      min_alarm: this.state.min_alarm,
      max_alarm: this.state.max_alarm,
      user: localStorage.getItem("ID"),
    };
    axios
      .put(`${api_url}/tag/${this.tagId}`, tag)
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
                value={this.state.tag}
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
                value={this.state.name}
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
                  value={this.state.variable}
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
                value={this.state.unity}
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
                value={this.state.desc}
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
                value={this.state.min_alarm}
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
                value={this.state.max_alarm}
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
                value={this.state.color}
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
                component={Link}
                to="/"
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
                component={Link}
                to="/"
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
export default EditDevice;
