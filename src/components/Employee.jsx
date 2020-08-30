import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import moment from 'moment';
import { Row, Col } from 'reactstrap';

import { isEmpty } from 'lodash';
import { fetchUser } from '../actions/employee.actions';
import EmployeeCard from './EmployeeCard';

const Employee = ({ match }) => {
  const dispatch = useDispatch();
  const employee = useSelector(state => state.employee);

  useEffect(() => {
    if (isEmpty(employee)) {
      dispatch(fetchUser(match.params.userID));
    }
  }, []);

  if (isEmpty(employee.data)) {
    return <ReactLoading type={'spin'} color={'#0000'} height={667} width={375} />
  }

  const {
    name,
    dob,
    department,
    title,
    email,
    phone,
    imageUrl,
  } = employee.data.result;

  const date = moment(dob).format('MMM D, YYYY')

  return (
    <Row>
      <Col xs={3}>
      </Col>
      <Col xs={6}></Col>
      <Col>
        <EmployeeCard
          name={name}
          date={date}
          department={department}
          title={title}
          email={email}
          phone={phone}
          imageUrl={imageUrl}
        />
      </Col>
      <Col xs={3}></Col>
    </Row>
  );
};

export default Employee;
