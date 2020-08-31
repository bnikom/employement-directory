import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
// import supertest from 'supertest';
import App from './App';
import Home from './components/Home';
import ReactDOM from 'react-dom';
// import app from '../server.js';
// import mongoose from 'mongoose';
// import Employee from '../api/models/employee';
// import employee from 'reducers/employee.reducer'

// const request = supertest(app);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('renders header link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Employee Directory/i);
  expect(linkElement).toBeInTheDocument();
});

test('handles modal opening', async () => {
  fireEvent.click(screen.getByText('Add Employee'))

  await waitFor(() => screen.getByRole('dialog'))

  expect(screen.getByRole('dialog')).toHaveTextContent('Email')
  // const inputNode = screen.getByLabelText('Username')
  expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
})

/**
// Connects to database called avengers
beforeAll(async () => {
  await mongoose.connect(`mongodb+srv://AvrilLavigne:${process.env.MONGO_URI}@employee-directory.jaufd.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
});

it("Should save employee to database", async done => {
  const res = await request.post("/api/employees").send({
    name: "Britney Spears",
    dob: "12-02-1981",
    email: "bspears@yopmail.com",
    phone: "1112223333",
    title: "Lead Sales Associate",
    department: "Sales",
    imageUrl: "2020-08-30T19:07:54.557Zbritney.jpg",
  });

  const employee = await Employee.findOne({ email: "bspears@yopmail.com" });

  expect(res.body.name).toBeTruthy();
  expect(res.body.email).toBeTruthy();

  expect(employee.name).toBeTruthy();
  expect(employee.email).toBeTruthy();


  done();
});

afterAll(async () => {
  Employee.remove({ email: "bspears@yopmail.com" });
  // Closes the Mongoose connection
  await mongoose.connection.close();
});
 */