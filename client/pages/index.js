import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log("Im on the browser", currentUser);
  return <div>{currentUser?.email ? currentUser?.email : "LandingPage"}</div>;
};

LandingPage.getInitialProps = async ({req}) => {
  if (typeof window === "undefined") {
    // we are on server
    const {data} = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
      headers: req.headers
    })
    return data
  } else {
    // we are on browser
    const { data } = await axios
      .get("/api/users/currentuser")
      .catch((err) => console.log(err));
    return data;
  }
};

// getInitialProps will be called in the server not when in the browser
// but it will get called in the browser at a particular point in time i.e;
// when we go to one route to another route from the react application itself

export default LandingPage;
