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
    <div>
      <h1>Voting App</h1>

      {/* Formulário para Adicionar Candidato */}
      <form onSubmit={addCandidate}>
        <input
          type="text"
          value={newCandidateName}
          onChange={(e) => setNewCandidateName(e.target.value)}
          placeholder="Add Candidate Name"
          required
        />
        <button type="submit">Add Candidate</button>
      </form>

      {/* Campo de Pesquisa */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Candidate"
        aria-label="Search Candidate"
      />

      {/* Lista de Candidatos */}
      <div>
        {filteredCandidates.map((candidate) => (
          <Option
            key={candidate.id} // use o id como chave
            candidate={candidate}
            incrementVote={() => incrementVote(candidate.id)} // use o id aqui
            decrementVote={() => decrementVote(candidate.id)} // use o id aqui
            removeCandidate={() => removeCandidate(candidate.id)} // use o id aqui
            editCandidateName={editCandidateName} // passe a função diretamente
          />
        ))}
      </div>

      <h2>Total votes: {totalVotes}</h2>

      {/* Histórico de Votos */}
      <h2>Votes History</h2>
      <ul>
        {voteHistory.map((entry, index) => (
          <li key={index}>
            {entry.action === "increment" ? "Increased" : "Decreased"} vote for{" "}
            {entry.name} at {entry.timestamp.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
