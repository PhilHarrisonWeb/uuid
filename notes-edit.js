// 1. Add a DOM element between the title and the body inputs (using span)
// 2. Set text value - 'Last edited x minutes/hours ago
// 3. Update the value on title/body/storage change






const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const lastEditedElement = document.querySelector('#last-edit-text')

const noteID = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find(function (item) {
    return item.id === noteID
})

// functonality to redirect home if nothing is found

if (note === undefined) {
    location.assign('/index.html')
}

// update  title and body inputs with 'found' item and calculate last edited
titleElement.value = note.title

lastEditedElement.textContent = lastEditMessage(note.updatedAt)

bodyElement.value = note.text

// 1.Setup input event for title
titleElement.addEventListener('input', function (e) {
    // 2. Update note object and save notes list
    note.title = e.target.value

    // update note.updatedAt with moment() before saving to localStorage below

    note.updatedAt = moment().valueOf()

    // update last edited message on change

    lastEditedElement.textContent = lastEditMessage(note.updatedAt)


    saveNotes(notes)
})

// 3. Repeat steps 1-2 for body
bodyElement.addEventListener('input', function (e) {
    note.text = e.target.value

    // update note.updatedAt with moment() before saving to localStorage below

    note.updatedAt = moment().valueOf()

    // update last edited message on change

    lastEditedElement.textContent = lastEditMessage(note.updatedAt)


    saveNotes(notes)
})

// 4. Set up a remove button that removes notes and sends users back to home page
removeElement.addEventListener('click', function () {
    removeNote(noteID)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', function (e) {
    // newValue from the storage event (listens for modification of localStorage) is parsed and assigned to notes global
    notes = JSON.parse(e.newValue)

    // reassigns the note variable to the note matching the id retrieved via the hash
    let note = notes.find(function (item) {
        return item.id === noteID
    })

    // update last edited message on change

    lastEditedElement.textContent = lastEditMessage(note.updatedAt)

    // functonality to redirect home if nothing is found

    if (note === undefined) {
        location.assign('/index.html')
    }
    // updates the dom elements dynamically across different tabs
    titleElement.value = note.title
    bodyElement.value = note.text


})