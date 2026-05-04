# Notes-App
Notes App README file

Project Title: Notes App
Project Description
This is a simple mobile application built using *React Native* that allows users to manage their personal notes. It implements basic CRUD (Create, Read, Update, Delete) operations, so users can easily add new notes, view all existing notes, edit note content, and remove notes they no longer need. The app is designed to be lightweight, easy to use, and focuses on core functionality without complex features.

Detailed System Flow
Below is the simplest step-by-step flow of how the application works:

1. Start Up
- User opens the Notes App.
- The app loads and displays the *Home Screen*, which shows all existing saved notes.
- If there are no notes yet, a message like "No notes available" is displayed.

2. Create Operation (Add New Note)
- User taps the *"Add Note"* button.
- The app navigates to the *Add Note Screen*.
- User enters a title and content for the note.
- User taps the *"Save"* button.
- The app stores the new note in local storage or database.

- The app automatically goes back to the Home Screen, and the new note is now shown in the list.

3. Read Operation (View Notes)
- Every time the Home Screen loads or updates, the app fetches all saved notes.
- Notes are displayed as a list or cards showing their title and short preview.
- User can tap any note to view its full details.

4. Update Operation (Edit Note)
- User selects a note from the list and taps the *"Edit"* button.
- The app navigates to the *Edit Note Screen*, where the existing title and content are already filled in.
- User modifies the information as needed.
- User taps the *"Update"* button.
- The app saves the updated data.
- The app returns to the Home Screen, and the list shows the updated note.

5. Delete Operation (Remove Note)
- User selects a note and taps the *"Delete"* button.
- A confirmation prompt may appear asking "Are you sure you want to delete this note?"
- If confirmed, the app removes the note from storage.
- The Home Screen refreshes, and the deleted note is no longer displayed. 

Name of members: John Cedric Tabios
                 Jane Resare
		             Denmark Tanael

