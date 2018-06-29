console.log('Starting app.js....');
const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');
const yargs = require('yargs');

const titleOptions = {
			describe: 'Title',
			demand: true,
			alias: 't'
		}

const bodyOptions = {
			describe: 'Body of note',
			demand: true,
			alias: 'b'
		}
				
// const argv = yargs.argv;
const argv = yargs
	.command('add', 'Add a new note', {
		title: titleOptions,
		body: bodyOptions,
	})
	.command('list', 'List all notes', {
	})
	.command('read', 'Fetch a note', {
		title: titleOptions,
	})
	.command('remove', 'Remove a note', {
		title: titleOptions
	})
	.help()
	.argv;
var command = argv._[0];

if (command === 'add'){
	var note = notes.addNote(argv.title, argv.body);
	if (note){
		console.log('Title ' + note.title);
		console.log('Body ' + note.body);
	} else {
		console.log('Duplicate note!!!');
	}
} else if (command === 'list') {
	var all_notes = notes.getAll();
  	all_notes.forEach((note) => {
  		notes.logNote(note);
  	});
} else if (command === 'read')
{
	var filtered_note = notes.getNote(argv.title);
	if (filtered_note) {
		console.log('Note found!!!');
		console.log('Title ' + filtered_note.title);
		console.log('Body ' + filtered_note.body);
	} else {
		console.log('Note not found!!!');
	}
} else if (command === 'remove')
{
	var note_removed = notes.removeNote(argv.title);
	if (note_removed){
		console.log('Removed note!!!');
	} else {
		console.log('Failed to remove note!!!');
	}
} else {
	console.log('Not recognized');
}



// console.log(_.isString(true));
// console.log(_.isString('TT'));
// console.log(_.isString(11));
// console.log(_.uniq([11, 23, 11, 'triveni', 'triveni', 'sdaa']));
// var res = notes.add(4, 5);
// console.log(res);

// var user = os.userInfo();

// fs.appendFile('greetings.txt', `Hello World ${user.username} You are ${notes.age}.`, function(err){
// 	if(err){
// 		console.log('Error!!!');
// 	}
// });
