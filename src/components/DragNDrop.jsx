import React, { useRef, useState } from "react";
import "../App.css";

const DragNDrop = () => {
  const [dragging, setDragging] = useState(false);
  const [sourceList, setSourceList] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
  ]);
  const [targetList, setTargetList] = useState([]);

  const dragItem = useRef(null);
  const dragNode = useRef(null);

  const handleDragStart = (e, item, listType) => {
    dragItem.current = { item, listType };
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDrop = (e, listType) => {
    e.preventDefault();
    if (!dragItem.current) return;

    const { item, listType: currentListType } = dragItem.current;

    if (currentListType !== listType) {
      if (listType === "source") {
        setSourceList((oldList) => [...oldList, item]);
        setTargetList((oldList) => oldList.filter((i) => i !== item));
      } else {
        setTargetList((oldList) => [...oldList, item]);
        setSourceList((oldList) => oldList.filter((i) => i !== item));
      }
    }
    setDragging(false);
    dragItem.current = null;
    dragNode.current = null;
  };

  const handleDragEnd = () => {
    setDragging(false);
    if (dragNode.current) {
      dragNode.current.removeEventListener("dragend", handleDragEnd);
    }
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyles = (item) => {
    if (dragItem.current && dragItem.current.item === item) {
      return "dragging";
    }
    return "";
  };

  return (
    <div className="drag-and-drop-container">
      <div
        className="drag-and-drop"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "source")}
      >
        <h2 className="dnd-item-head">Source List</h2>
        {sourceList.map((item, idx) => (
          <div
            key={idx}
            onDragStart={(e) => handleDragStart(e, item, "source")}
            draggable
            className={`dnd-item ${getStyles(item)}`}
          >
            {item}
          </div>
        ))}
      </div>

      <div
        className="drag-and-drop"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "target")}
      >
        <h2 className="dnd-item-head">Target List</h2>
        {targetList.map((item, idx) => (
          <div
            key={idx}
            onDragStart={(e) => handleDragStart(e, item, "target")}
            draggable
            className={`dnd-item ${getStyles(item)}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragNDrop;
