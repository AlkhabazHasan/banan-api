const devConfig = {
  MONGO_URL: 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1',
  JWT_SECRET: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM1MTcwN2I5YWZjNzgzMjM5NjdhNjUiLCJpYXQiOjE2OTA2MzgwODd9.lQA7EAuVPIUzNZMmY0jDIjFtm_VSv-E2KESJrJ_Jg_U',
  WHATSAPP_TOKEN: 'Bearer EAAHR1TBuVfYBO3Se7ytUl4wZCBmy7GR2bTuxoZCKHjLzPCs1A11bh1EdZAH9hyHn7lRgdggcuXqKguBrQJL7g1Jy5BsI6iunPzHCI60TpDF0fCvlLlVV2I96khc9M3OBNdGLIGcTJUckvXkOGKhZCpGLvgdf7Maj9LOP6drotlA1AykIPgzesUOMF2oIMrTHS1FTqq9vaw7qZBquiDZBDDvPElnZBQZD',
  APP_SECRET: 'bc0e62caf2524ac3769ed5e4a4ab874f',
  VERIFY_TOKEN: 'Hello_World'
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/db-test',
};
const prodConfig = {
  MONGO_URL: 'mongodb://localhost/db-prod',
};
const defaultConfig = {
  PORT: process.env.PORT || 3000,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

// Take defaultConfig and make it a single object 
// So, we have concatenated two objects into one 
const config = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

module.exports = config;
