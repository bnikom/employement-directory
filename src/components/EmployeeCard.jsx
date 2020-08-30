import React from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText, Row, Col } from 'reactstrap';

const EmployeeCard = ({
  name,
  date,
  department,
  title,
  email,
  phone,
  imageUrl
}) => (
    <Card
      className="d-flex justify-content-center align-items-center flip-card"
    >
      <div className="inner">
        <CardBody className="front">
          <CardImg
            top
            className="rounded-circle user-image"
            src={`https://cors-anywhere.herokuapp.com/${imageUrl}`}
            alt={`${name} Personal Photo`}
            crossOrigin="anonymous"
          />
        </CardBody>
        <CardBody className="back">
          <CardText>Name: {name}</CardText>
          <CardText>DOB: {date}</CardText>
          <CardText>Department: {department}</CardText>
          <CardText>Title: {title}</CardText>
          <CardText>Email: {email}</CardText>
          <CardText>Phone Number: {phone}</CardText>
        </CardBody>
      </div>
    </Card>
  );

export default EmployeeCard;