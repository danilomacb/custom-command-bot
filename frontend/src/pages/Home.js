import Navbar from "../components/Navbar";

function Home({ location }) {
  return (
    <>
      <Navbar location={location} />
      <h1>Home Page</h1>
    </>
  );
}

export default Home;
