import axios from "axios";
import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return <h1>{currentUser?.email ? currentUser?.email : "LandingPage"}</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get("/api/users/currentuser");
  return data;
};

// if we want to call this getInitialProps function we need to call in the Appcontext

export default LandingPage;
