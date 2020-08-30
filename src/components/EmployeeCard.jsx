import React from 'react';
import { Card, CardBody, CardImg, CardText, Row, Col } from 'reactstrap';
import moment from 'moment';

const EmployeeCard = ({
  name,
  date,
  department,
  title,
  email,
  phone,
  imageUrl,
  size,
  fontSize
}) => (
    <Card
      className="d-flex justify-content-center align-items-center flip-card"
      style={{ width: size, height: size, fontSize }}
    >
      <div className="inner">
        <CardBody className="front">
          <CardImg
            top
            className="rounded-circle user-image"
            src={`http://localhost:8080/${imageUrl}`}
            alt={`${name} Personal Photo`}
            crossOrigin="anonymous"
          />
        </CardBody>
        <CardBody className="back">
          <CardText><span className="font-weight-bold text-uppercase">Name:</span> {name}</CardText>
          <CardText><span className="font-weight-bold text-uppercase">DOB:</span> {moment(date).format('MMM D, YYYY')}</CardText>
          <CardText><span className="font-weight-bold text-uppercase">Department:</span> {department}</CardText>
          <CardText><span className="font-weight-bold text-uppercase">Title:</span> {title}</CardText>
          <CardText><span className="font-weight-bold text-uppercase">Email:</span> {email}</CardText>
          <CardText><span className="font-weight-bold text-uppercase">Phone Number:</span> {phone}</CardText>
        </CardBody>
      </div>
    </Card>
  );

export default EmployeeCard;