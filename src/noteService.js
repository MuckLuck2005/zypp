/**
 * Створення нової нотатки
 * @param {string} title
 * @param {string} content
 * @returns {object}
 */
function createNote(title, content) {
  if (!title || title.trim().length < 3) {
    throw new Error("Title must contain at least 3 characters");
  }

  if (!content || content.trim().length < 5) {
    throw new Error("Content must contain at least 5 characters");
  }

  return {
    id: Date.now(),
    title: title.trim(),
    content: content.trim(),
    createdAt: new Date().toISOString()
  };
}

/**
 * Оновлення існуючої нотатки
 * @param {object} note
 * @param {string} newTitle
 * @param {string} newContent
 * @returns {object}
 */
function updateNote(note, newTitle, newContent) {
  if (!note) {
    throw new Error("Note does not exist");
  }

  if (newTitle && newTitle.trim().length < 3) {
    throw new Error("New title is too short");
  }

  if (newContent && newContent.trim().length < 5) {
    throw new Error("New content is too short");
  }

  return {
    ...note,
    title: newTitle ? newTitle.trim() : note.title,
    content: newContent ? newContent.trim() : note.content,
    updatedAt: new Date().toISOString()
  };
}

/**
 * Пошук нотаток за ключовим словом
 * @param {Array} notes
 * @param {string} query
 * @returns {Array}
 */
function searchNotes(notes, query) {
  if (!Array.isArray(notes)) {
    throw new Error("Notes must be an array");
  }

  if (!query || query.trim().length === 0) {
    return [];
  }

  const q = query.toLowerCase();

  return notes.filter(
    n =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q)
  );
}

module.exports = {
  createNote,
  updateNote,
  searchNotes
};
