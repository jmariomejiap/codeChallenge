import Cookies from 'universal-cookie';

const removeCookies = () => {
  const cookies = new Cookies();
  const content = cookies.getAll();
  const arrayCookies = Object.keys(content);

  arrayCookies.map((cookie) => {
    cookies.remove(cookie);
    return cookie;
  });
};

export default removeCookies;
