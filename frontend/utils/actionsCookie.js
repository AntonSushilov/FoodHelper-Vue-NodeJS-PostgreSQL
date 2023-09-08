export const setCookie = (key, value) => {
  document.cookie = `${key}=${JSON.stringify(value)}`
}

export const getCookie = (name) => {
  var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
  result && (result = JSON.parse(result[1]));
  return result;
}
