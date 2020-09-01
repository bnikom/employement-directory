This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app client-side and server-side in parallel in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view the client side application.<br />
Open [http://localhost:8080](http://localhost:8080) to view any APIs in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn prod:build`

Runs server-side Node code and Create React App in production mode.
Make sure you've bundled your React code. (See `yarn build`)<br />
Open [http://localhost:8080](http://localhost:8080) to view the application.

Make sure to uncomment: <br />
`app.use(express.static('build'));` in the **server.js** file

### `yarn client`

Runs the client side React app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn server`

Runs the server side Node code in development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view APIs in the browser.<br />
Will update in real-time if you make edits.

Make sure to uncomment: <br />
`app.use(express.static('public'));` in the **server.js** file

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

---

## Main Technologies Used:

- **Express:** A framework for Node to run the back end portion of the application.
- **ESM:** ES6 module loader for Node.
- **Reactstrap:** React Components styled using Bootstrap 4. Saves tons of time on building components.
- **Bootstrap 4:** CSS Framework that saves tons of time on styling and it uses flexbox!
- **Axios:** Promise-based HTTP client that is super easy to use and has great out-of-the-box features in its API.
- **MongoDB:** Popular nonrelational DB used to store the employees.
- **Mongoose:** Easy-to-use MongoDB schema model. 
- **Multer:** File uplaod library.

---

## To add for future development
1. **TESTING:** I did not have time to fully implement all of the testing features I wanted. Unfortunately I learned that I can't do Node API testing with jest in this app because create-react-app does not allow changing the jest testing environment in package.json.
   
2. **VALIDATION:** I did not include any validation in the form for adding or updating an employee. In the future, I would need validation for submitting the required fields, date validation etc. to make this a fully functioning directory. There's some validation in how Mongoose accepts values into the schema, but I could always improve it.
   
3. **IMG DATABASE:** If I wanted to be fancy I could have made another database to store the images uploaded, but I felt storing images on the server worked just fine.
   
4. **PROP-TYPES:** Usually I prefer utilizing some sort of type checker, but due to time constraints I did not. In the future it would be useful.

5. **ERROR HANDLING:** There is not much error handling for bad data or potentially broken api calls. A complete 404 page for for the client-side portion of the app would also be useful.
   
6. **RESPONSIVENESS:** Improve the responsiveness of the site by adding more media queries for a uniform UI experience would be nice.