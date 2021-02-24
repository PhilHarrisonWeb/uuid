const notes = getSavedNotes()

// set up filters

const filters = {
    searchText: '',
}

renderNotes(notes, filters)


// push empty object onto array when 'create note' is clicked

document.querySelector('#create-note').addEventListener('click', function () {
    notes.push({
        id: uuidv4(),
        title: '',
        text: ''
    })
    saveNotes(notes)
    renderNotes(notes, filters)
})


// eventListener to update filters on each input

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})