import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import { Button, Modal, Row, Col } from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { isEmpty } from 'lodash';
import { fetchUser } from '../actions/employee.actions';
import EmployeeCard from './EmployeeCard';
import AddEmployee from './AddEmployee';

const Employee = ({ match }) => {
  const dispatch = useDispatch();
  const employee = useSelector(state => state.employee);
  const history = useHistory();
  const [isModalOpen, toggleModal] = useState(false);
  const [formSubmitted, setFormSubmit] = useState(false);

  useEffect(() => {
    dispatch(fetchUser(match.params.userID));
  }, [match, dispatch, formSubmitted]);

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

  return (
    <Fragment>
      <Row className="justify-content-center mb-2 employee-page">
        <Col xs={10} md={6} className="justify-content-center d-flex">
          <EmployeeCard
            date={dob}
            department={department}
            email={email}
            photo={imageUrl}
            name={name}
            phone={phone}
            title={title}
          />
        </Col>
      </Row>
      <Row className="justify-content-center pb-3">
        <Col xs={6} sm={4} className="justify-content-center d-flex">
          <Button onClick={() => deleteEmployee(_id)}>Delete Employee</Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={6} sm={4} className="justify-content-center d-flex">
          <Button onClick={() => toggleModal(!isModalOpen)}>Update Employee</Button>
        </Col>
      </Row>
      <Modal isOpen={isModalOpen} toggle={() => toggleModal(!isModalOpen)}>
        <AddEmployee
          setFormSubmit={setFormSubmit}
          toggleModal={toggleModal}
          dateProp={dob}
          departmentProp={department}
          emailProp={email}
          photoProp={imageUrl}
          nameProp={name}
          phoneProp={phone}
          titleProp={title}
          id={_id}
          type='update'
        />
      </Modal>
    </Fragment>
  );
};

export default Employee;
