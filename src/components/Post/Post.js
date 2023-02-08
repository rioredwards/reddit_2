import './Post.css';
import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencil,
  faTrash,
  faArrowUp,
  faArrowDown,
  faShare,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';

export default function Post({ title, body }) {
  return (
    <ListGroup.Item as={'li'} className="post-container w-100 lead">
      <Container className="p-3">
        <Row>
          <Col
            xs={1}
            className="d-flex flex-column align-content-center justify-content-start gx-0"
          >
            <FontAwesomeIcon icon={faArrowUp} />
            <p className="fs-6 m-0 text-center">47</p>
            <FontAwesomeIcon icon={faArrowDown} />
          </Col>
          <Col xs={11}>
            <Container>
              <Row className="align-items-center">
                <Col className="gx-0">
                  <h3 className="my-1">{`${title}`}</h3>
                </Col>
              </Row>
              <Row className="d-flex align-content-start">
                <Col className="gx-0">
                  <p className="mt-1">{`${body}`}</p>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex align-items-center justify-content-end gap-4">
                  <FontAwesomeIcon icon={faTrash} size="xs" />
                  <FontAwesomeIcon icon={faPencil} size="xs" />
                  <FontAwesomeIcon icon={faShare} size="xs" />
                  <FontAwesomeIcon icon={faEllipsis} size="xs" />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
}
