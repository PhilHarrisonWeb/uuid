// check for data held in local storage

const getSavedNotes = function () {

    const notesJSON = localStorage.getItem('notes')

    if (notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

// Save Notes To Local Storage

const saveNotes = function (notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}


// removeNote function 

const removeNote = function (id) {
    const noteIndex = notes.findIndex(function (item) {
        return item.id === id
    })

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}



// generate DOM for each note

const generateNoteDOM = function (item) {

    // create all elements 
    const noteEl = document.createElement('div')
    const button = document.createElement('button')
    const textEl = document.createElement('a')

    // set up remove button

    button.textContent = 'x'
    noteEl.appendChild(button)
    button.addEventListener('click', function () {
        removeNote(item.id)
        saveNotes(notes)
        renderNotes(notes, filters) // wny am i calling this function within the function!?
    })


    // set up note title text

    textEl.setAttribute('href', `/edit.html#${item.id}`)
    if (item.title.length > 0) {
        textEl.textContent = item.title
    } else {
        textEl.textContent = 'This is an unnamed note'
    }

    noteEl.appendChild(textEl)

    return noteEl

}



// sort notes function

const sortNotes = function (notes, sortBy) {
    if (sortBy === 'byEdited') {
        return notes.sort(function (a, b) {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort(function (a, b) {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }

        })

    } else if (sortBy === 'alphabetical') {
        notes.sort(function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })

    } else {
        return notes
    }
}





// renderNotes based on searches

const renderNotes = function (arrayToBeSearched, filterArray) {

    // call sortNotes function

    notes = sortNotes(notes, filters.sortBy)

    // dynamically filter notes
    const filteredNotes = arrayToBeSearched.filter(function (item) {
        return item.title.toLowerCase().includes(filterArray.searchText.toLowerCase())
    })

    // clear contents of DIV

    document.querySelector('#noteDiv').innerHTML = ''

    filteredNotes.forEach(function (item) {
        const noteEl = generateNoteDOM(item)
        document.querySelector('#noteDiv').appendChild(noteEl)

    })
}

// Generate the last edited message 
const lastEditMessage = function (timestamp) {
    return `Last edited ${moment(timestamp).fromNow()} ago`
}