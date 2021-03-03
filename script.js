let notes = getSavedNotes()

// set up filters

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)


// push empty object onto array when 'create note' is clicked

document.querySelector('#create-note').addEventListener('click', function () {
    const id = uuidv4()
    const timestamp = moment().valueOf()
    notes.push({
        id: id,
        title: '',
        text: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes(notes)
    location.assign(`/edit.html#${id}`)
})


// eventListener to update filters on each input

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', function (e) {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', function (e) {
    if (e.key === notes) {
        // 1. Parse the new data and update the notes

        // Firstly, update the notes global variable with the parsed newValue value from the event object
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})

// 1. Add createdAt and updatedAt to the new notes (store timestamps)
// added to push method above

// 2. Update updatedAt when someone edits a title or body
// this is done on the note-edit.js page on the input event listener for both title and body

// set localStorage with new timestamp
// how do we know if a note has been edited?




// 3. Delete all old notes before testing