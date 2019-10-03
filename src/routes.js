import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import New from "./pages/New";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/new" component={New}></Route>
      </Switch>
    </BrowserRouter>
  );
}
