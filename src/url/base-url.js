let BASE_URL;
if (process.env.NODE_ENV === 'development') {
  BASE_URL = `https://api-dev.listenup.kr`;
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = `https://api.listenup.kr`;
} else if (process.env.NODE_ENV === 'local') {
  BASE_URL = `http://localhost:8081`;
}

export default BASE_URL;