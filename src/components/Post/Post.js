import React, { useState } from 'react';
import { Col, Container, ListGroup, Row, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencil,
  faTrash,
  faArrowUp,
  faArrowDown,
  faShare,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../../context/UserContext.js';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import '../../App.css';
import DeletePost from './DeletePost.js';
import { usePosts } from '../../hooks/usePosts.js';

export default function Post({ id, title, body, username, user_id }) {
  const { user } = useUser();
  let match = useRouteMatch();

  const owner = user.id === user_id;

  return (
    <ListGroup.Item as={'li'} className="post-container w-100 lead mb-2">
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
                  <p className="fs-6 my-1">{`u/${username}`}</p>
                </Col>
              </Row>
              <Row className="d-flex align-content-start">
                <Col className="gx-0">
                  <p className="mt-1">{`${body}`}</p>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex align-items-center justify-content-end gap-4">
                  {owner && (
                    <>
                      <Link to={`${match.url}/${id}/delete`}>
                        <FontAwesomeIcon icon={faTrash} size="xs" />
                      </Link>
                      <Link to={`${match.url}/${id}/edit`}>
                        <FontAwesomeIcon icon={faPencil} size="xs" />
                      </Link>
                    </>
                  )}
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
