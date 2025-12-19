// tests/integration/noteFlow.int.test.js
const { createEncryptedNote } = require("../../src/services/noteIntegrationService");
const cryptoProvider = require("../../src/crypto/cryptoProvider");
const { createInMemoryRepo } = require("../../src/repository/inMemoryNoteRepository");

describe("Integration: Note flow (create -> encrypt -> store)", () => {
  test("IT-1: stores only encrypted content", () => {
    const repo = createInMemoryRepo();
    const key = Buffer.alloc(32, 7);

    const saved = createEncryptedNote({
      title: "My note",
      content: "Secret content",
      key,
      cryptoProvider,
      repo
    });

    expect(saved.ciphertext).toBeDefined();
    expect(saved.iv).toBeDefined();
    expect(saved.authTag).toBeDefined();
    expect(saved.ciphertext).not.toContain("Secret");
    expect(repo.all().length).toBe(1);
  });

  test("IT-3: tampering ciphertext must fail decrypt", () => {
    const repo = createInMemoryRepo();
    const key = Buffer.alloc(32, 8);

    const saved = createEncryptedNote({
      title: "Note",
      content: "Top secret",
      key,
      cryptoProvider,
      repo
    });

    // tamper 1 char in base64 ciphertext
    const tampered = { ...saved, ciphertext: saved.ciphertext.slice(0, -2) + "AA" };

    expect(() => cryptoProvider.decrypt(tampered, key)).toThrow();
  });

  test("IT-4: repo.save failure (Mock) propagates error", () => {
    const repo = { save: jest.fn(() => { throw new Error("DB down"); }) };
    const key = Buffer.alloc(32, 9);

    expect(() => createEncryptedNote({
      title: "Note",
      content: "Valid content",
      key,
      cryptoProvider,
      repo
    })).toThrow("DB down");

    expect(repo.save).toHaveBeenCalledTimes(1);
  });

  test("IT-5: crypto.encrypt is called (Spy)", () => {
    const repo = createInMemoryRepo();
    const key = Buffer.alloc(32, 10);
    const spy = jest.spyOn(cryptoProvider, "encrypt");

    createEncryptedNote({
      title: "Spy note",
      content: "Spy content",
      key,
      cryptoProvider,
      repo
    });

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
