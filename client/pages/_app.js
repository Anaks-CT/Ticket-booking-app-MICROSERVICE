import "bootstrap/dist/css/bootstrap.css";

export default ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

// if you want any gloabal css for all the pages we import it in here.
// all the pages comes here and theis app.js will return the componenet from here so the css will be applied