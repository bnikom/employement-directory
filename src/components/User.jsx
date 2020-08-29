import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardImg, CardTitle, CardText, Row, Col } from 'reactstrap';
import ReactLoading from 'react-loading';
import moment from 'moment';

import { isEmpty } from 'lodash';
import { fetchUser } from '../actions/user.actions';

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (isEmpty(user)) {
      dispatch(fetchUser());
    }
  }, []);

  if (isEmpty(user.data)) {
    return <ReactLoading type={'spin'} color={'#0000'} height={667} width={375} />
  }

  const {
    name: {
      first,
      last,
      title
    },
    picture: {
      large,
      thumbnail,
      medium,
    },
    dob: {
      date
    }
  } = user.data.results[0]

  console.log('USER: ', user.data.results[0])


  const name = `${title} ${first} ${last}`;
  const dob = moment(date).format('MMMM Do YYYY');;

  return (
    <Row>
      <Col xs={3}>
      </Col>
      <Col xs={6}>
        <Card
          className="d-flex justify-content-center align-items-center flip-card"
        >
          <div className="inner">
            <CardBody className="front">
              <CardImg
                top
                className="rounded-circle user-image"
                src={large}
                alt={`${name} Personal Photo`}
                srcSet={`${thumbnail} 1x, ${medium} 2x, ${large} 3x`}
              />
            </CardBody>
            <CardBody className="back">
              <CardText>Name: {name}</CardText>
              <CardText>DOB: {dob}</CardText>
            </CardBody>
          </div>
        </Card>
      </Col>
      <Col xs={3}></Col>
    </Row>
  );
};

export default User;
