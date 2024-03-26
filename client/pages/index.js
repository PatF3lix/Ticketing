import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);

  return <h1>Landing Page</h1>;
};

/**
 * if we ever want to fetch some data with nextJs during the server side rendering
 * process, we are going to define this getInitialprop function.
 *
 * This function is going to be executed during the server side rendering process.
 * this function is where we're going to attempt to fetch some data specifically
 *  for doing some initial rendering of the app.
 */
LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    // we are on the server!
    // requests should be made to http://ingress-nginx.ingress-nginx-svc.local
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );
    console.log("server side");
    return data;
  } else {
    // we are on the browser!
    // requests can be made with a base url of ""
    const { data } = await axios.get("/api/users/currentuser");
    console.log("browser side");
    return data;
  }
};

export default LandingPage;
