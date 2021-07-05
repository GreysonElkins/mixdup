export const baseUrl =
  process.env.NODE_ENV !== 'development'
    ? 'https://mixdup-microservice.herokuapp.com'
    : 'http://localhost:8000'
