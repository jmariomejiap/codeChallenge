import Cookies from 'universal-cookie';

const removeCookies = (allCookies) => {
  const cookies = new Cookies();
  const arrayCookies = Object.keys(allCookies);
  arrayCookies.map((cookie) => {
    return cookies.remove(cookie);
  });
};

export default removeCookies;
