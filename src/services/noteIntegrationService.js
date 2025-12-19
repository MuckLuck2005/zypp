// src/services/noteIntegrationService.js
const { createNote } = require("../noteService");

function createEncryptedNote({ title, content, key, cryptoProvider, repo }) {
  const note = createNote(title, content); // business validation
  const enc = cryptoProvider.encrypt(note.content, key); // crypto layer
  const stored = repo.save({ title: note.title, ...enc }); // persistence
  return stored;
}

module.exports = { createEncryptedNote };
