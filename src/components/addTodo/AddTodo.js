import React, { useState, useEffect } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import "./AddTodo.css";
// import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../../actions";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function AddTodo(props) {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [dueBy, setDueBy] = useState(new Date());
  const [priority, setPriority] = useState("none");

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    let filterTodo = todos.filter((todo) => todo.id === props.id);

    if (filterTodo[0] !== undefined) {
      var dateString = filterTodo[0].dueBy;
      var dateParts = dateString.split("/");
      var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
      setSummary(filterTodo[0].summary);
      setDescription(filterTodo[0].description);
      setPriority(filterTodo[0].priority);
      setDueBy(dateObject);
    }
  }, [props.id, todos]);

  const saveTodo = () => {
    if (!validate()) {
      return false;
    }
    var id = props.id === "" ? "t" + (todos.length + 1) : props.id;
    let data = {
      id: id,
      summary: summary,
      description: description,
      priority: priority,
      CreatedOn: convertDate(new Date()),
      dueBy: convertDate(dueBy),
      status: false,
    };

    props.id === "" ? dispatch(addTodo(data)) : dispatch(updateTodo(data));
    cleardata();
  };
  function cleardata() {
    setSummary("");
    setDescription("");
    setPriority("none");
    setDueBy("");
  }
  const validate = () => {
    if (summary === "") {
      alert("Please Enter ToDo Summary!!");
      return false;
    }
    if (description === "") {
      alert("Please Enter ToDo Description!!");
      return false;
    }
    if (dueBy === "") {
      alert("Please Choose Date!!");
      return false;
    }
    return true;
  };
  const handleChange = (date) => {
    setDueBy(date);
  };

  const convertDate = (date) => {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    date = dd + "/" + mm + "/" + yyyy;
    console.log(date);
    return date;
  };
  return (
    <Modal {...props} dialogClassName="modal-80w">
      <Modal.Body>
        <h5>Edit Task</h5>
        <Row>
          <Col>Summary</Col>
        </Row>
        <Row>
          <Col className="summary-input">
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            ></input>
          </Col>
        </Row>
        <Row>
          <Col>Description</Col>
        </Row>
        <Row>
          <Col className="summary-input">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </Col>
        </Row>
        <Row>
          <Col>
            Date
            <br />
            <DatePicker
              id="date-picker"
              selected={dueBy}
              onChange={(date) => handleChange(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Choose Date"
            />
          </Col>
          <Col className="summary-input">
            Priority
            <br />
            <select
              name="priority"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="none">None</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button
          onClick={() => {
            saveTodo();
            props.onHide();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default AddTodo;
