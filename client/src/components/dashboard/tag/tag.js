import React, { Component } from "react";
import * as moment from "moment";
// import axios from "axios";
// import { api_url } from "../../../global";
import mqttService from "../../../services/mqtt.service";

import {
  CardContent,
  Card,
  Typography,
  CardHeader,
  Avatar,
  CardActionArea,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import PowerInputIcon from "@material-ui/icons/PowerInput";
import ScatterPlotIcon from "@material-ui/icons/ScatterPlot";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import WavesIcon from "@material-ui/icons/Waves";
import SpeedIcon from "@material-ui/icons/Speed";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";

function VarIcon(props) {
  var Icon = null;
  if (props.variable === "oxygen") {
    Icon = <BubbleChartIcon />;
  } else if (props.variable === "temperature") {
    Icon = <Brightness7Icon />;
  } else if (props.variable === "conductivity") {
    Icon = <PowerInputIcon />;
  } else if (props.variable === "salinity") {
    Icon = <ScatterPlotIcon />;
  } else if (props.variable === "ph") {
    Icon = <LocalDrinkIcon />;
  } else if (props.variable === "hysterese") {
    Icon = <ShowChartIcon />;
  } else if (props.variable === "flux") {
    Icon = <WavesIcon />;
  } else if (props.variable === "pression") {
    Icon = <SpeedIcon />;
  } else if (props.variable === "luminity") {
    Icon = <WbIncandescentIcon />;
  }
  return Icon;
}

// const [anchorEl, setAnchorEl] = React.useState(null);
class Tag extends Component {
  mqttClient;
  topic;
  styles;

  constructor(props) {
    super(props);
    this.state = {
      color: props.data.color,
      datetime: props.data.datetime
        ? moment(props.data.datetime).format("YYYY-MM-DD HH:mm:ss")
        : "undefined",
      desc: props.data.desc,
      max_alarm: props.data.max_alarm,
      min_alarm: props.data.min_alarm,
      name: props.data.name,
      tag: props.data.tag,
      unity: props.data.unity,
      user: props.data.user,
      value: props.data.value,
      variable: props.data.variable,
      _id: props.data._id,
      menu: false,
    };
    this.client = mqttService.getClient();
    this.topic = `${localStorage.getItem("ID")}/${props.data.tag}`;
    this.styles = {
      card: {
        background: this.state.color,
        // background:`linear-gradient(135deg, ${this.state.color}ff 60%, ${this.state.color}99 99%)`,
        color: this.state.color < "#888888" ? "white" : "#555",
      },
      text: {
        color: this.state.color < "#888888" ? "white" : "#555",
      },
      avatar: {
        background: "transparent",
        color: this.state.color < "#888888" ? "white" : "#555",
      },
    };
    mqttService.subscribe(this.client, this.topic);

    mqttService.onMessage(this.client, (res) => {
      this.updateData(res);
    });
  }

  updateData(res) {
    this.setState({
      value: res,
      datetime: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
  }
  componentWillUnmount() {
    mqttService.unsubscribe(this.client, this.topic);
  }
  handleMenu = () => {
    const menuState = this.state.menu;
    console.log(this.state.menu);
    this.setState({ menu: !this.state.menu });
  };

  render() {
    return (
      <Card style={this.styles.card}>
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar style={this.styles.avatar} aria-label="recipe">
                <VarIcon variable={this.state.variable} />
              </Avatar>
            }
            action={
              <IconButton
                style={this.styles.text}
                aria-label="settings"
                onClick={this.handleMenu}
                onClose={this.handleMenu}
              >
                <MoreVertIcon />
              </IconButton>
            }
            title={this.state.name}
            subheader={`${this.state.tag}`}
          />
          <CardContent>
            <Typography variant="h4" component="h4">
              {`${this.state.value} ${this.state.unity}`}
            </Typography>
            <small>{this.state.datetime}</small>
          </CardContent>
          {/* <CardActions disableSpacing>
          <IconButton
            style={this.styles.card}
            aria-label="Delete Variable"
            onClick={this.props.delete}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            style={this.styles.card}
            aria-label="Edit Variable"
            component={Link}
            to={`/edit/${this.state._id}`}
          >
            <EditIcon />
          </IconButton>
        </CardActions> */}
        </CardActionArea>

        <Menu
          // anchorEl={anchorEl}
          // keepMounted
          open={this.state.menu}
          // onClose={this.handleClose}
        >
          <MenuItem onClick={this.props.delete}>Delete</MenuItem>
          <MenuItem component={Link} to={`/edit/${this.state._id}`}>
            Edit
          </MenuItem>
        </Menu>
      </Card>
    );
  }
}
export default Tag;
