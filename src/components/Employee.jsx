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
    if (isEmpty(employee)) {
      dispatch(fetchUser(match.params.userID));
    }
  }, []);

  if (isEmpty(employee.data)) {
    return <ReactLoading type={'spin'} color={'#0000'} height={667} width={375} />
  }

  const deleteEmployee = async (id) => {
    await axios.delete(`http://localhost:8080/api/employee/${id}`);
    history.push('/');
  }

  const {
    _id,
    name,
    dob,
    department,
    title,
    email,
    phone,
    imageUrl,
  } = employee.data.result;

  return (
    <Fragment>
      <Row className="justify-content-center mb-2">
        <Col xs={6} className="justify-content-center d-flex">
          <EmployeeCard
            size={500}
            fontSize={'1.6rem'}
            name={name}
            date={dob}
            department={department}
            title={title}
            email={email}
            phone={phone}
            imageUrl={imageUrl}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 4, offset: 4 }}>
          <Button onClick={() => deleteEmployee(_id)}>Delete Employee</Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Employee;
