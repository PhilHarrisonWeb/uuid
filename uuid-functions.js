// check for data held in local storage

const getSavedNotes = () => {

    const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch {
        return []
    }

}

// Save Notes To Local Storage

const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}


// removeNote function 

const removeNote = (id) => {

    const noteIndex = notes.findIndex((item) => item.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}



// generate DOM for each note

function generateNoteDOM(item) {

    // create all elements 
    const noteEl = document.createElement('div')
    const button = document.createElement('button')
    const textEl = document.createElement('a')

    // set up remove button
    button.textContent = 'x'
    noteEl.appendChild(button)
    button.addEventListener('click', () => {
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

const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }

        })
    } else if (sortBy === 'alphabetical') {
        notes.sort((a, b) => {
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

const renderNotes = (arrayToBeSearched, filterArray) => {

    // call sortNotes function

    notes = sortNotes(notes, filters.sortBy)

    // dynamically filter notes
    const filteredNotes = arrayToBeSearched.filter((item) => item.title.toLowerCase().includes(filterArray.searchText.toLowerCase()))

    // clear contents of DIV

    document.querySelector('#noteDiv').innerHTML = ''

    filteredNotes.forEach((item) => {
        const noteEl = generateNoteDOM(item)
        document.querySelector('#noteDiv').appendChild(noteEl)

    })
}

// Generate the last edited message 
const lastEditMessage = (timestamp) => `Last edited ${moment(timestamp).fromNow()} ago`