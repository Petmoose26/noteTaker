const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const port = 8080;
app.use(express.json());

//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  const rawNotesString = fs.readFileSync("./db/db.json", { encoding: "utf-8" });
  const notes = JSON.parse(rawNotesString);
  console.log(typeof notes);
  res.json(notes);
});
//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", (req, res) => {
  // get the new note data from the req body.
  const newNote = req.body;
  // uses uuid to add a random id to each note's data, but also removes dashes
  const ID = uuidv4();
  const formatedID = ID.replace(/[-\s]/g, "");
  newNote.id = formatedID + 1;
  // read existing notes.
  const rawNotesString = fs.readFileSync("./db/db.json", { encoding: "utf-8" });
  // parse the raw data (array!!!).
  const notes = JSON.parse(rawNotesString);
  // create new array that holds old data and the new.
  const newNotes = [...notes, newNote];
  console.log(newNotes);
  console.log(...newNotes);
  // write new data to add to existing file.
  fs.writeFileSync("./db/db.json", JSON.stringify(newNotes));
  res.json(newNotes);
});
//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete("/api/notes/:id", (req, res) => {
  // get the deleted data request from user
  const deleteNote = req.params.id;
  // read current file
  const rawNotesString = fs.readFileSync("./db/db.json", { encoding: "utf-8" });
  // parse raw data
  const newNotes = JSON.parse(rawNotesString);
  // oop through all notes.
  console.log(newNotes);
  for (var i = 0; i < newNote.length; i++) {
    // create new array that holds data minus deleted index
    if (newNotes[i].id == id) {
      deleteNote.splice(i, 1);
    }
    console.log(newNotes);
  }
  // write updated data to file
  res.json(deletedNotes);
});

//* GET `/notes` - Should return the `notes.html` file.
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/notes.html"));
});

//* GET `*` - Should return the `index.html` file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
