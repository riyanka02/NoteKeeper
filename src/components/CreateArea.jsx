import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState({}); // State to store validation errors

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function validateForm() {
    let newErrors = {}; // Initialize empty errors object

    if (!note.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!note.content.trim()) {
      newErrors.content = "Content is required.";
    }

    setErrors(newErrors); // Update errors state
    return Object.keys(newErrors).length === 0; // Return true if no errors
  }

  function submitNote(event) {
    event.preventDefault();

    if (!validateForm()) {
      // Display error messages if validation fails (implementation not shown here)
      return; // Prevent form submission
    }

    props.onAdd(note); // Call the provided onAdd function with the validated note
    setNote({ title: "", content: "" }); // Reset form after successful submission
  }

  return (
    <div>
      
      <form onSubmit={submitNote}>
        <div className="form-group">
          <br></br>
        <label htmlFor="title">Title:</label>
        <br></br>
        <br></br>
          <input
            type="text"
            name="title"
            id="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Title"
          
            className={errors.title ? "error" : ""} // Add error class if title error exists
          />
          <br></br>
          {errors.title && <span className="error-message">{errors.title}</span>} {/* Display error message */}
        </div>
        <div className="form-group">
          <br></br>
          <label htmlFor="content">Content:</label>
          <br></br>
          <br></br>
          <textarea
            name="content"
            id="content"
            value={note.content}
            onChange={handleChange}
            placeholder="Take a note..."
            rows="3"
            className={errors.content ? "error" : ""} // Add error class if content error exists
          />
          {errors.content && <span className="error-message">{errors.content}</span>} {/* Display error message */}
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
