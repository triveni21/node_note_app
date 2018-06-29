console.log('Starting notes.js...');
const fs = require('fs');

var fetchNotes = () => {
	try {
		var notes_string = fs.readFileSync('notes-data.json');
		return JSON.parse(notes_string);
	} catch (e) {
		return [];
	}
};

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title: title,
		body: body
	};

	var duplicateNotes = notes.filter((note) => note.title === title );

	if (duplicateNotes.length === 0){
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

var getAll = () => {
  var notes = fetchNotes();
  return notes;
}

var getNote = (title) => {
	notes = fetchNotes();
	var filtered_notes = notes.filter((note) => note.title === title );
	return filtered_notes[0];
}

var removeNote = (title) => {
	notes = fetchNotes();
	var filtered_notes = notes.filter((note) => note.title !== title );
	saveNotes(filtered_notes);
	return notes.length != filtered_notes.length ? true : false;
}

var logNote = (note) => {
	console.log('---')
	console.log('Title ' + note.title);
	console.log('Body ' + note.body);
}

module.exports = {
	addNote: addNote,
	getAll: getAll,
	getNote: getNote,
	removeNote: removeNote,
	logNote
}

module.exports.add = (a, b) => {
	console.log('Add Note!!');
	return a+b;
};