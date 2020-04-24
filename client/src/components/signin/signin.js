import React, { Component } from "react";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { api_url } from "../../global";
import { Redirect } from "react-router-dom";
import { signedIn, setData } from "../../services/auth";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      status: "",
      message: "",
    };
  }

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleLogin();
    }
  };
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleLogin = () => {
    let user = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post(`${api_url}/user/login`, user)
      .then((res) => {
          const {data}=res;
          console.log(data.data);
          setData(data.data)
          this.setState({signedIn:true})
      })
      .catch((err) => {
        this.setState({signedIn:false})
      });
  };

  render() {
    if (signedIn() || this.state.signedIn) {
      return <Redirect to="/"></Redirect>;
    } else {
      return (
        <Container maxWidth="xs">
          <Grid container spacing={3}>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                type="text"
                label="User"
                variant="outlined"
                fullWidth
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
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
                onClick={this.handleLogin}
                size="large"
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12}>
              <a href="/signup">Not registered? Sign Up!</a>
            </Grid>
          </Grid>
        </Container>
      );
    }
  }
}
export default SignIn;
