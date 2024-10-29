import { useState } from 'react';
import Option from './components/Option';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [newCandidateName, setNewCandidateName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [voteHistory, setVoteHistory] = useState([]);

  const addCandidate = (e) => {
    e.preventDefault(); // Prevenir o reload da página ao enviar o form
    if (newCandidateName.trim()) {
      setCandidates([...candidates, { name: newCandidateName, votes: 0 }]);
      setNewCandidateName('');
    }
  };

  const removeCandidate = (name) => {
    setCandidates(candidates.filter(candidate => candidate.name !== name));
    setVoteHistory(voteHistory.filter(entry => entry.name !== name));
  };

  const incrementVote = (name) => {
    setCandidates(
      candidates.map(candidate =>
        candidate.name === name ? { ...candidate, votes: candidate.votes + 1 } : candidate
      )
    );
    setVoteHistory([...voteHistory, { action: 'increment', name, timestamp: new Date() }]);
  };

  const decrementVote = (name) => {
    setCandidates(
      candidates.map(candidate =>
        candidate.name === name && candidate.votes > 0
          ? { ...candidate, votes: candidate.votes - 1 }
          : candidate
      )
    );
    setVoteHistory([...voteHistory, { action: 'decrement', name, timestamp: new Date() }]);
  };

  const editCandidateName = (oldName, newName) => {
    setCandidates(
      candidates.map(candidate =>
        candidate.name === oldName ? { ...candidate, name: newName } : candidate
      )
    );
  };

  const totalVotes = candidates.reduce((total, candidate) => total + candidate.votes, 0);
  const filteredCandidates = candidates.filter(candidate =>
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
        {filteredCandidates.map((candidate, index) => (
          <Option
            key={index}
            candidate={candidate}
            incrementVote={() => incrementVote(candidate.name)}
            decrementVote={() => decrementVote(candidate.name)}
            removeCandidate={() => removeCandidate(candidate.name)}
            editCandidateName={(newName) => editCandidateName(candidate.name, newName)}
          />
        ))}
      </div>

      <h2>Total votes: {totalVotes}</h2>

      {/* Histórico de Votos */}
      <h2>Votes History</h2>
      <ul>
        {voteHistory.map((entry, index) => (
          <li key={index}>
            {entry.action === 'increment' ? 'Increased' : 'Decreased'} vote for {entry.name} at {entry.timestamp.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
