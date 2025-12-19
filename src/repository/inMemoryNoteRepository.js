// src/repository/inMemoryNoteRepository.js
function createInMemoryRepo() {
  const data = [];

  return {
    save(record) {
      const saved = { id: data.length + 1, ...record };
      data.push(saved);
      return saved;
    },
    all() {
      return [...data];
    }
  };
}

module.exports = { createInMemoryRepo };
