import "bootstrap/dist/css/bootstrap.css";

const app = ({ Component, pageProps }) => {
  return (
    <div>
      <header>Header!</header>
      <Component {...pageProps} />;
    </div>
  );
};

export default app;
