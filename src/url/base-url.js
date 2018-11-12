let BASE_URL;
console.log(process.env);

if (process.env.NODE_ENV === 'development') {
  BASE_URL = `https://api-dev.listenup.kr`;
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = `https://api.listenup.kr`;
}

export default BASE_URL;
