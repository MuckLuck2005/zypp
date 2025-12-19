const {
  createNote,
  updateNote,
  searchNotes
} = require("../src/noteService");

describe("ULDA Notes – Unit tests", () => {

  describe("createNote()", () => {
    test("should create note with valid data", () => {
      const note = createNote("My note", "This is note content");

      expect(note).toHaveProperty("id");
      expect(note.title).toBe("My note");
      expect(note.content).toBe("This is note content");
    });

    test("should throw error for short title", () => {
      expect(() => createNote("Hi", "Valid content text"))
        .toThrow("Title must contain at least 3 characters");
    });

    test("should throw error for short content", () => {
      expect(() => createNote("Valid title", "Hey"))
        .toThrow("Content must contain at least 5 characters");
    });
  });

  describe("updateNote()", () => {
    test("should update title and content", () => {
      const original = createNote("Old title", "Old content text");
      const updated = updateNote(original, "New title", "New content text");

      expect(updated.title).toBe("New title");
      expect(updated.content).toBe("New content text");
      expect(updated).toHaveProperty("updatedAt");
    });

    test("should throw error if note is missing", () => {
      expect(() => updateNote(null, "Title", "Content"))
        .toThrow("Note does not exist");
    });
  });

  describe("searchNotes()", () => {
    test("should find notes by keyword", () => {
      const notes = [
        { title: "Shopping", content: "Buy milk" },
        { title: "Study", content: "Prepare for exam" }
      ];

      const result = searchNotes(notes, "shop");
      expect(result.length).toBe(1);
    });

    test("should return empty array for empty query", () => {
      const result = searchNotes([], "");
      expect(result).toEqual([]);
    });
  });

});
