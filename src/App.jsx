import { useState } from "react";
import Option from "./components/Option";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [newCandidateName, setNewCandidateName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [voteHistory, setVoteHistory] = useState([]);
  const [nextId, setNextId] = useState(1); // Contador de IDs autoincrementável

  const addCandidate = (e) => {
    e.preventDefault();
    if (newCandidateName.trim()) {
      setCandidates([
        ...candidates,
        { id: nextId, name: newCandidateName, votes: 0 },
      ]);
      setNewCandidateName("");
      setNextId(nextId + 1); // Incrementa o próximo ID
    }

    //exibe o id do candidato
    console.log(nextId);
  };

  const removeCandidate = (id) => {
    setCandidates(candidates.filter((candidate) => candidate.id !== id));
    setVoteHistory(voteHistory.filter((entry) => entry.id !== id));
  };

  const incrementVote = (id) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === id
          ? { ...candidate, votes: candidate.votes + 1 }
          : candidate
      )
    );
    const candidate = candidates.find((candidate) => candidate.id === id);
    setVoteHistory([
      ...voteHistory,
      { action: "increment", id, name: candidate.name, timestamp: new Date() },
    ]);
  };

  const decrementVote = (id) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === id && candidate.votes > 0
          ? { ...candidate, votes: candidate.votes - 1 }
          : candidate
      )
    );
    const candidate = candidates.find((candidate) => candidate.id === id);
    setVoteHistory([
      ...voteHistory,
      { action: "decrement", id, name: candidate.name, timestamp: new Date() },
    ]);
  };

  const editCandidateName = (id, newName) => {
    setCandidates((prevCandidates) => {
      const updatedCandidates = prevCandidates.map((candidate) =>
        candidate.id === id ? { ...candidate, name: newName } : candidate
      );
      console.log(`Candidate ID: ${id}, New Name: ${newName}`);
      console.log("Updated Candidates:", updatedCandidates);
      return updatedCandidates;
    });
  };

  const totalVotes = candidates.reduce(
    (total, candidate) => total + candidate.votes,
    0
  );
  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header className="header">
        <h1>Voting App</h1>
      </header>
      
      <div className="container">
        <div className="form-container">
          <form onSubmit={addCandidate}>
            <input
              type="text"
              value={newCandidateName}
              onChange={(e) => setNewCandidateName(e.target.value)}
              placeholder="Add Candidate Name"
              required
            />
            <button type="submit">Add</button>
          </form>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Candidate"
            aria-label="Search Candidate"
            className="search-input"
          />
        </div>

        <div className="candidates-grid">
          {filteredCandidates.map((candidate) => (
            <Option
              key={candidate.id}
              candidate={candidate}
              incrementVote={() => incrementVote(candidate.id)}
              decrementVote={() => decrementVote(candidate.id)}
              removeCandidate={() => removeCandidate(candidate.id)}
              editCandidateName={editCandidateName}
            />
          ))}
        </div>

        <div className="vote-history">
          <h2>Total votes: {totalVotes}</h2>
          <h2>Votes History</h2>
          <ul>
            {voteHistory.map((entry, index) => (
              <li key={index}>
                <strong>{entry.name}</strong>:{" "}
                {entry.action === "increment" ? "+" : "-"}1 vote
                <br />
                <small>{entry.timestamp.toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
