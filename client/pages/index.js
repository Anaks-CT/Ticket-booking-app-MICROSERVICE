import axios from "axios";
import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  console.log("Im on the browser", currentUser);
  return <h1>{currentUser?.email ? currentUser?.email : "LandingPage"}</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const {data} = await buildClient(context).get('/api/users/currentuser');
  console.log(data)
  return data
};

// getInitialProps will be called in the server not when in the browser
// but it will get called in the browser at a particular point in time i.e;
// when we go to one route to another route from the react application itself

export default LandingPage;
