import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

/**
 * if we ever want to fetch some data with nextJs during the server side rendering
 * process, we are going to define this getInitialprop function.
 *
 * This function is going to be executed during the server side rendering process.
 * this function is where we're going to attempt to fetch some data specifically
 *  for doing some initial rendering of the app.
 */
LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default LandingPage;
