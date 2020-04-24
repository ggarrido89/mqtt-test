import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SignIn from "./components/signin/signin";
import SignUp from "./components/signup/signup";
import Dashboard from "./components/dashboard/dashboard";
import Settings from "./components/settings/settings";
import NewDevice from "./components/dashboard/new-device/new-device";
import EditDevice from "./components/dashboard/edit-device/edit-device";

class AppRoutes extends Component {
    render(){
        return (
            <BrowserRouter>
                {/* <Route path="/" component={SignIn} /> */}
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/" exact component={Dashboard} />
                <Route path="/add" exact component={NewDevice} />
                <Route path="/edit/:id" exact component={EditDevice} />
                <Route path="/settings" component={Settings} />
            </BrowserRouter>
        )
    }
}
export default AppRoutes;