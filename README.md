This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app client-side and server-side in parallel.<br />
Open [http://localhost:3000](http://localhost:3000) to view the client side application.
Open [http://localhost:8080](http://localhost:8080) to view any APIs in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn client`

Runs the client side React app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn server`

Runs the server side Node app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view any APIs in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Technologies Used:

#### Express:
A framework for Node to run the back end portion of the application
#### ESM
ES6 module loader for Node
#### Reactstrap:
React Components styled using Bootstrap 4. Saves me tons of time on building components
#### Bootstrap 4:
Great CSS Framework that again saves me tons of time on styling my components. And it uses flexbox!!
#### Axios:
Promise-based HTTP client that is super easy to use and has great out-of-the-box features in its API.
#### MongoDB:
popular nonrelational DB for storing the employees.
#### Mongoose:
easy to use mongodb schema model. 
#### Multer:
popular file uplaod library

## Things I would add in the future
I did not have time to fully implement all of the testing features I wanted. I unfortunately learned that I can't do Node API testing with jest in this app because create-react-app does not allow changing the jest testing environment in package.json.

I did not include any validation in the form for submitting or updating an employee. In the future you would need validation for submitting the required fields, date validation etc. to make this a fully functioning directory. here's some validation in how Mongoose accepts values into the schema, but I could always improve it. If I wanted to be super fancy I could have made another database to store the images uploaded, but again I felt storing them on the server worked just fine and wanted to put my efforts elsewhere.

Add proptypes

## Things I would improve or change
I don't think I necessarily needed to use Redux in this project, but I already committed to the decision. In the future I would improve the responsiveness of the site. Adding some media queries or a uniform css style would be nice.