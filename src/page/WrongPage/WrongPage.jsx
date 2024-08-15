import { NavLink } from 'react-router-dom';

const WrongPage = () => {
  return (
    <>
      <h2>Ooops, we haven't found the page you were looking for</h2>
      <NavLink to="/">Go back to Home page</NavLink>
    </>
  );
};

export default WrongPage;
