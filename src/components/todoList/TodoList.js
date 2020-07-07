import React, { useState } from "react";
import { Row, Col, Tabs, Tab, Button, Modal } from "react-bootstrap";
import "./TodoList.css";
import Edit from "@material-ui/icons/EditTwoTone";
import Delete from "@material-ui/icons/Delete";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "../../actions";
import AddTodo from "../addTodo/AddTodo";

function TodoList() {
  const [searchText, setSearchText] = useState("");
  const [searchStatus, setSearchStatus] = useState(false);

  var tableData = useSelector((state) => state.todos);

  var tableData1 = tableData.filter(
    (todo) =>
      todo.summary.toLowerCase().includes(searchText.toLowerCase()) ||
      todo.priority.toLowerCase().includes(searchText.toLowerCase())
  );
  var pendingTodoList = tableData.filter((todo) => todo.status === true);
  var completedTodoList = tableData.filter((todo) => todo.status === false);

  const search = (val) => {
    setSearchText(val);
    if (val === "") {
      setSearchStatus(false);
    } else {
      setSearchStatus(true);
    }
  };

  return (
    <div>
      <Row>
        <Col>
          Group By:
          <br />
          <select name="groupBy" id="group-by">
            <option value="none">None</option>
            <option value="createdOn">Created On</option>
            <option value="prndingOn">PendingOn</option>
            <option value="priprity">Priority</option>
          </select>
        </Col>
        <Col className="search-col">
          Search
          <br />
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => search(e.target.value)}
          ></input>
        </Col>
      </Row>
      <br></br>

      <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
        <Tab eventKey="all" title="All">
          <TodoTable tableData={searchStatus ? tableData1 : tableData} />
        </Tab>
        <Tab eventKey="pending" title="Pending">
          <TodoTable tableData={pendingTodoList} />
        </Tab>
        <Tab eventKey="Completed" title="Completed">
          <TodoTable tableData={completedTodoList} />
        </Tab>
      </Tabs>
    </div>
  );
}
function TodoTable(props) {
  const [modalShow, setModalShow] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({});

  const dispatch = useDispatch();

  const toggle = (id) => {
    dispatch(toggleTodo(id));
  };
  return (
    <div>
      <Row>
        <Col>
          <table
            id="example"
            className="table table-striped table-bordered todo-table"
          >
            <thead>
              <tr>
                <th>Summary</th>
                <th>Priority</th>
                <th>Created On</th>
                <th>Due By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.tableData.map((data) => (
                <tr key={data.id}>
                  <td>{data.status ? data.summary : <s> {data.summary}</s>}</td>
                  <td>
                    {data.status ? data.priority : <s> {data.priority}</s>}
                  </td>
                  <td>
                    {data.status ? data.CreatedOn : <s>{data.CreatedOn}</s>}
                  </td>
                  <td>{data.status ? data.dueBy : <s> {data.dueBy}</s>}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setModalShow(true);
                        setDataToEdit(data);
                      }}
                    >
                      <Edit />
                    </button>
                    <button
                      className={
                        data.status ? "state-btn-done" : "state-btn-pending"
                      }
                      onClick={() => toggle(data.id)}
                    >
                      {data.status ? "DONE" : "Re-open"}
                    </button>
                    <DeleteButtonWithAlert id={data.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
      <AddTodo
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={dataToEdit.id}
      />
    </div>
  );
}

export default TodoList;

function DeleteButtonWithAlert(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  return (
    <>
      <button className="delete-btn" onClick={handleShow}>
        <Delete />
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Alert!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you Want To Delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
          <Button
            variant="danger"
            onClick={() => dispatch(deleteTodo(props.id))}
          >
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
