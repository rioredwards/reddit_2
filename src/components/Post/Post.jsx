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
import { useUser } from '../../context/UserContext.js';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import '../../App.css';

export function formatDate(timestamp) {
  let date = new Date(timestamp);
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  let year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

export default function Post({ view, postData }) {
  const { id, title, body, username, user_id: userId, created_at: createdAt } = postData;
  const { user } = useUser();
  let match = useRouteMatch();

  const owner = user?.id === userId;

  return (
    <ListGroup.Item
      as={view === 'detail' ? 'div' : 'li'}
      className="post-container w-100 lead mb-2"
    >
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
                  {view === 'list' && (
                    <NavLink
                      to={`${match.path}/${id}`}
                      className="postLink"
                      data-testid={`postLink${id}`}
                    >
                      <h3 className="my-1">{`${title}`}</h3>
                    </NavLink>
                  )}
                  {view === 'detail' && <h3 className="my-1">{`${title}`}</h3>}
                  <p className="fs-6 my-1">{`u/${username}`}</p>
                  {view === 'detail' && (
                    <p className="fs-6 my-1">{`posted on: ${formatDate(createdAt)}`}</p>
                  )}
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
                        <FontAwesomeIcon
                          icon={faTrash}
                          size="xs"
                          title="deleteIcon"
                          alt="deleteIcon"
                        />
                      </Link>
                      <Link to={`${match.url}/${id}/edit`}>
                        <FontAwesomeIcon
                          icon={faPencil}
                          size="xs"
                          title="editIcon"
                          alt="editIcon"
                        />
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
