import { useState } from "react";
import { Button, Space, Input } from 'antd';
import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons';

const { TextArea } = Input; //to allow usage of the "TextArea" tag.

export default function Task(props) {
  const { addTask, deleteTask, moveTask, task } = props;

  const [urgencyLevel, setUrgencyLevel] = useState(task.urgency);
  const [collapsed, setCollapsed] = useState(task.isCollapsed);
  const [formAction, setFormAction] = useState("");

  function setUrgency(event) {
    setUrgencyLevel(event.target.attributes.urgency.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formAction === "save") {
      if (collapsed) {
        setCollapsed(false);
      } else {
        let newTask = {
          id: task.id,
          title: event.target.elements.title.value,
          description: event.target.elements.description.value,
          urgency: urgencyLevel,
          status: task.status,
          isCollapsed: true,
        };

        addTask(newTask);
        setCollapsed(true);
      }
    }

    if (formAction === "delete") {
      deleteTask(task.id);
    }
  }

  function handleMoveLeft() {
    let newStatus = "";

    if (task.status === "In Progress") {
      newStatus = "Not Started";
    } else if (task.status === "Completed") {
      newStatus = "In Progress";
    }

    if (newStatus !== "") {
      moveTask(task.id, newStatus);
    }
  }

  function handleMoveRight() {
    let newStatus = "";

    if (task.status === "Not Started") {
      newStatus = "In Progress";
    } else if (task.status === "In Progress") {
      newStatus = "Completed";
    }

    if (newStatus !== "") {
      moveTask(task.id, newStatus);
    }
  }

  return (
    <div className={`task ${collapsed ? "collapsedTask" : ""}`}>
        <Space wrap>
            <Button onClick={handleMoveLeft} className="button moveTask" type="primary"><CaretLeftFilled /></Button>
        </Space>
      <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
        <Input 
          type="text"
          className="title input"
          name="title"
          placeholder="Enter Title"
          disabled={collapsed}
          defaultValue={task.title}
        />
        <TextArea
          rows="2"
          className="description input"
          name="description"
          length="2"
          placeholder="Enter Description"
          defaultValue={task.description}
        />
        <div>
          <label className={`low ${urgencyLevel === "low" ? "selected" : ""}`}>
            <Input
              urgency="low"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            low
          </label>
          <label
            className={`medium ${urgencyLevel === "medium" ? "selected" : ""}`}
          >
            <input
              urgency="medium"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            medium
          </label>
          <label
            className={`high ${urgencyLevel === "high" ? "selected" : ""}`}
          >
            <input
              urgency="high"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            high
          </label>
        </div>
  
        <button type="primary" onClick={() => {setFormAction("save");}}>{collapsed ? "Edit" : "Save"}</button>
        {collapsed && (
          <button
            onClick={() => {
              setFormAction("delete");
            }}
            className="button delete"
          >
            X
          </button>
        )}
      </form>
        <Space wrap>
            <Button onClick={handleMoveRight} className="button moveTask" type="primary"><CaretRightFilled /></Button>
        </Space>
    </div>
  );
}
