import React from "react";
import { LoginScreen, FeedScreen } from "../pages";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/login"} component={LoginScreen} />
        <Route exact path={"/feed"} component={FeedScreen} />
        <Redirect to={"/login"} />
      </Switch>
    </BrowserRouter>
  );
};
