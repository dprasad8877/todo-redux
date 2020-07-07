import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import "./MainPage.css";
import AddTodo from "./addTodo/AddTodo";
import TodoList from "./todoList/TodoList";

function Main() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h3>My Todo</h3>{" "}
          </Col>
          <Col className="add-new">
            <Button
              onClick={() => {
                setModalShow(true);
              }}
            >
              +
            </Button>
          </Col>
        </Row>
        <TodoList />
      </Container>
      <AddTodo show={modalShow} onHide={() => setModalShow(false)} id=''/>
    </div>
  );
}
export default Main;
