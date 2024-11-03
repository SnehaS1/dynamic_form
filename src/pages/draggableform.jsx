import React, { useState, useRef, useEffect } from "react";

const DraggableButtonWithForm = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ bottom: 3 });
  const [showForm, setShowForm] = useState(false);
  const buttonRef = useRef(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newBottom = window.innerHeight - e.clientY;
      setPosition({ bottom: newBottom });
    }
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  useEffect(() => {
    // Attach mousemove and mouseup listeners to the window when dragging starts
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      // Remove listeners when dragging stops
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <>
      <div
        className="draggable-button"
        style={{ bottom: `${position.bottom}px` }}
        onMouseDown={handleMouseDown}
        onClick={toggleForm}
        ref={buttonRef}
      >
        Drag Me
      </div>

      {showForm && (
        <div
          className="draggable-form"
          style={{ bottom: `${position.bottom + 50}px` }}
        >
          <form>
            <label>
              Name:
              <input type="text" />
            </label>
            <label>
              Email:
              <input type="email" />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default DraggableButtonWithForm;
