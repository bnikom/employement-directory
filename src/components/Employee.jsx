import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import { Button, Row, Col } from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { isEmpty } from 'lodash';
import { fetchUser } from '../actions/employee.actions';
import EmployeeCard from './EmployeeCard';

const Employee = ({ match }) => {
  const dispatch = useDispatch();
  const employee = useSelector(state => state.employee);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchUser(match.params.userID));
  }, [match, dispatch]);

  if (isEmpty(employee.data)) {
    return <ReactLoading type={'spin'} color={'#0000'} height={667} width={375} />
  }

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employee/${id}`);
      history.push('/');
    } catch (error) {
      console.log(error)
    }
  }

  const {
    _id, 
    dob,
    department,
    imageUrl,
    email,
    name,
    phone,
    title,
  } = employee.data.result;

  console.log(employee.data)

  return (
    <Fragment>
      <Row className="justify-content-center mb-2">
        <Col xs={10} md={6} className="justify-content-center d-flex">
          <EmployeeCard
            date={dob}
            department={department}
            email={email}
            fontSize={'2.3vw'}
            photo={imageUrl}
            name={name}
            phone={phone}
            size={'40vw'}
            title={title}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={6} sm={4} className="justify-content-center d-flex">
          <Button onClick={() => deleteEmployee(_id)}>Delete Employee</Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Employee;
