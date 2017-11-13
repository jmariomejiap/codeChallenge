import Cookies from 'universal-cookie';

const cookieValidator = () => {
  const cookies = new Cookies();
  const content = cookies.getAll();
  return content;
};

export default cookieValidator;
