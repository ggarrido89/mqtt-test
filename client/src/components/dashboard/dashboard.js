// CORE
import React, { Component, Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

// COMPONENTS
import { api_url } from "../../global";
import { signedIn } from "../../services/auth";
import Tag from "./tag/tag";
import Nav from "../nav/nav";

//MATERIAL
import { Container, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

//ICONS
import AddIcon from "@material-ui/icons/Add";

//REDUX
import {counterApp} from '../../reducers/index';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Historic from "./historic/historic";

class Dashboard extends Component {
  store;

  constructor() {
    super();
    this.state = {
      tagList: null,
      tagCount: null,
    };
    this.store=createStore(counterApp)
    this.getTag();
  }

  getTag = () => {
    axios
      .get(`${api_url}/tag/user/${localStorage.getItem("ID")}`)
      .then((res) => {
        this.setState({
          tagList: res.data.data,
          tagCount: res.data.count,
        });
      })
      .catch((err) => {
        this.setState({
          tagList: [],
          tagCount: 0,
        });
      });
  };
  deleteTag = (tagId) => {
    axios.delete(`${api_url}/tag/${tagId}`)
    .then((res)=>{
        this.getTag();
    })
    .catch((err)=>{
        console.error(err);
    })
  };
  render() {
    if (!signedIn()) {
      return <Redirect to="/signin"></Redirect>;
    } else {
      return (
        <div>
          <Nav title="Ideal Monitor - Dashboard" />

          <Container maxWidth="xl">
            <Grid container spacing={3}>
              {this.state.tagCount ? (
                <Fragment>
                  {/* Históricos */}
                  <Grid item xs={12} md={12} lg={4} xl={3}>
                    <Historic tagList={this.state.tagList} />
                  </Grid>
                  {/* Variables */}
                  <Grid item xs={12} md={12} lg={8} xl={9}>
                    <Grid container spacing={2}>
                      {this.state.tagList.map((element, index) => (
                        <Grid item xs={6} md={4} lg={3} xl={2} key={index}>
                          <Tag data={element} delete={this.deleteTag.bind(this,element._id)}></Tag>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Fragment>
              ) : null}
              {this.state.tagCount <= 10 ? (
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    startIcon={<AddIcon />}
                    fullWidth
                    component={Link}
                    to="/add"
                  >
                    New Device
                  </Button>
                </Grid>
              ) : null}
            </Grid>
          </Container>
        </div>
      );
    }
  }
}
export default Dashboard;
