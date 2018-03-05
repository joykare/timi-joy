# Assessment Repo

Consumes Marvel API https://developer.marvel.com

### How to get it up
- Clone project
- On the project root run npm install 
- Create mlab db substitute my DB_URI's with yours
- To start backend
  - If you have `nodemon` installed: `npm start:bend`
  - Else run `node index.js`
- To start frontend npm run start:dev-fend
- Create marvel account on `https://developer.marvel.com`
- Create a .env file with the following variables from your account on marvel:
   - API_KEY=[your-public-api-key]
   - API_PRIVATE_KEY=[your-private-api-key]

SIDENOTE: Currently there isn't a sign-up page
- To get a user to login fire up `Postman` post to endpoint: `http://localhost:3000/api/users` supply a valid `email address` and `password`
OR
- Add one manually to your db


### TODO
- Tests
- Sign-Up Form
- Automate start-up
