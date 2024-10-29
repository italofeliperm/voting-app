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

  // Efeito para atualizar newName quando o candidato é editado
  useEffect(() => {
    setNewName(candidate.name);
  }, [candidate.name]);

  const handleEdit = () => {
    if (newName.trim()) {
      // Garantir que o novo nome não seja vazio
      editCandidateName(candidate.id, newName); // Mude aqui
      setIsEditing(false);
    }

    console.log(candidate.name);
    console.log(newName);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px 0",
        textAlign: "center",
      }}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New Candidate Name"
            required
          />

          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h2>{candidate.name}</h2>
          <p>Votes: {candidate.votes}</p>
          <button onClick={incrementVote}>+</button>
          <button onClick={decrementVote}>-</button>
          <button onClick={removeCandidate}>Remove</button>
          <button onClick={() => setIsEditing(true)}>Edit Name</button>
        </>
      )}
    </div>
  );
}

export default Option;