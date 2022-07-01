


/////Cursor Attributes
const CURSOR = {
    limit: 20
}


///// Calculate Cursor Position
const getCursor = (page) => {
    var cursorPos = {
        skip: 0,
        limit: CURSOR.limit
    }

    if (parseInt(page) != 1) cursorPos.skip = (parseInt(page) - 1) * CURSOR.limit;
    return cursorPos
}


module.exports = {
    getCursor
}