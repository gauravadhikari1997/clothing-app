import React from "react";

import { HomePageComponent } from "./homepage.styles";

import Directory from "../../components/directory/directory.component";

const HomePage = () => (
  <HomePageComponent>
    <h1>Welcome to Homepage</h1>
    <Directory />
  </HomePageComponent>
);

export default HomePage;
