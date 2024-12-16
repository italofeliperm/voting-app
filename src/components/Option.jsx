/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

function Option({
  candidate,
  incrementVote,
  decrementVote,
  removeCandidate,
  editCandidateName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(candidate.name);

  useEffect(() => {
    setNewName(candidate.name);
  }, [candidate.name]);

  const handleEdit = () => {
    if (newName.trim()) {
      editCandidateName(candidate.id, newName);
      setIsEditing(false);
    }
  };

  return (
    <div className="candidate-card">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New Candidate Name"
            required
          />
          <div className="button-group">
            <button onClick={handleEdit}>Save</button>
            <button className="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2>{candidate.name}</h2>
          <p className="votes">Votes: {candidate.votes}</p>
          <div className="button-group">
            <button 
              onClick={incrementVote}
              style={{ gridColumn: "1 / 2" }}
            >
              +
            </button>
            <button 
              onClick={decrementVote}
              style={{ gridColumn: "2 / 3" }}
            >
              -
            </button>
            <button 
              className="secondary" 
              onClick={() => setIsEditing(true)}
              style={{ gridColumn: "1 / 2" }}
            >
              Edit
            </button>
            <button 
              className="secondary" 
              onClick={removeCandidate}
              style={{ gridColumn: "2 / 3" }}
            >
              Remove
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Option;