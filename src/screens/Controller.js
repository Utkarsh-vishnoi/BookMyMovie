import React from "react";
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";
import { ThemeProvider } from "@material-ui/styles";

const Controller = () => {
  const baseUrl = "/api/v1/";

  return (
    <Router>
      <div className="main-container">

        <ThemeProvider theme={{
          palette: {
            primary: {
              light: "#303f9f"
            },
          },
          spacing: 4
        }}>
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} baseUrl={baseUrl} />}
          />
          <Route
            path="/movie/:id"
            render={(props) => <Details {...props} baseUrl={baseUrl} />}
          />
          <Route
            path="/bookshow/:id"
            render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
          />
          <Route
            path="/confirm/:id"
            render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
          />
        </ThemeProvider>
      </div>
    </Router>
  );
};

export default Controller;
