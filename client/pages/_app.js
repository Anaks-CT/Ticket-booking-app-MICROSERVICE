import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </>
  );
};
// NOTE
// if we call getInitialProps in the _app.js then the child getInitialProps wont get called on server
AppComponent.getInitialProps = async (appContext) => {
  // console.log('This will be called in the server')
  const { data } = await buildClient(appContext.ctx).get(
    "/api/users/currentuser"
  );

  // calling the getInitialProps function of the component
  let pageProps;
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return {
    // passing down data for the required component as props
    pageProps,
    // passing down data for app
    ...data,
  };
};

export default AppComponent;

// getInitialProps will be called in the server not when in the browser
// but it will get called in the browser at a particular point in time i.e;
// when we go to one route to another route from the react application itself

// if you want any gloabal css for all the pages we import it in here.
// all the pages comes here and theis app.js will return the componenet from here so the css will be applied
