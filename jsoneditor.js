'use strict';

var edit_json = new Object();

/* Given a contaienr for the json and a json (Object, not array), draw the json
 * Return true if it works, false if it doesn't
 */ 
function populate_editor(container_id, data) {
    // Get an hold to the container of the json
    var container = document.getElementById(container_id);
    if (container == null) {
        return false; // No container no party
    };
    // Empy the container
    container.innerHTML = "";
    // Checking the data is an object (but not an array)
    if (typeof data != "object" || Array.isArray(data)) {
        return false;
    };
    // Creating the html tags
    var obj = sort_data("JSON", data);
    // Appending the tags
    container.appendChild(obj);
    return true
}

// Send the data to the correct constructor
function sort_data(key, data) {
    // Create an empty tag in case it doesn't match any type
    var tag;
    // Create a tag based on the type
    if (typeof data == 'object') { // Object
        tag = create_object_tag(key, data);
    } else if (typeof data == 'function'){ // Function
        tag = create_function_tag(key, data);
    } else if (typeof data == 'undefined') { // Undefined
        tag = create_undefined_tag(key, data);
    } else if (typeof data == 'symbol') { // Symbol
        tag = create_symbol_tag(key, data);
    } else { // Primitive
        tag = create_primitive_tag(key, data);
    };
    return tag;
}

/* Loop trought element in an object and put them on tags
 * Called recursively for each nested object
 * Return false if data is incorect
 * Manages both maps and array
 */
function create_object_tag(key, data) {
    // Create the tag containing the objects
    var obj = document.createElement("div");
    obj.classList.add("jsonObj");
    // Nulls are object that need to be managed
    if (data == null) {
        var tag = create_primitive_tag(key, data);
        return tag;
    }
    // If there are > 0 keys, loop the object
    if (Object.keys(data).length > 0) {
        // For each element in the object, create a tag and append it to the object container
        for (const inner_key in data) {
            var tag = sort_data(inner_key, data[inner_key]);
            obj.appendChild(tag);
        };
    };
    // Differentiate between array and object
    var open, close;
    if (Array.isArray(data)) {
        open = "[";
        close = "]";
    } else {
        open = "{";
        close = "}";
    };
    // Add brackets/square bracket to the object
    obj.innerHTML = key + ": " + open + "<br>" + obj.innerHTML + close;
    // Return the obj
    return obj;
}

/* Create a tag based on the element recieved
 * Function created to be used by the function create_object_tag()
 */
function create_primitive_tag(key, data) {
    // Create general tag 
    var tag = document.createElement("div");
    tag.classList.add("jsonPrimitive");
    // Key
    var tag_key = document.createElement("div");
    tag_key.innerHTML = '"'+key+'"';
    // Separator
    var tag_separator = document.createElement("div");
    tag_separator.innerHTML = ": ";
    // Data
    var tag_data = document.createElement("div");
    tag_data.innerHTML = data;
    // Appending children
    tag.appendChild(tag_key);
    tag.appendChild(tag_separator);
    tag.appendChild(tag_data);
    return tag;
}

/* Manage the case where the data is a function
 * Show the object key and function name 
 * //TODO: Has to have a distinc style to differentiate functions
 */
function create_function_tag(key, data) {
    var tag = document.createElement("div");
    tag.classList.add("jsonElement");
    tag.innerHTML = key + ": " + data.name + "()";
    return tag;
}

/* Manage the case where the data is undefined
 * //TODO: Has to have a distinc style to differentiate functions
 */
function create_undefined_tag(key, data) {
    var tag = document.createElement("div");
    tag.classList.add("jsonElement");
    tag.innerHTML = key + ": undefined";
    return tag;
}
/* // TODO: Manage the case where the data is a function
 *
 */
function create_symbol_tag(key, data) {
    var tag = create_empty_tag();
    return tag;
}

// Create and empy tag
function create_empty_tag() {
    var tag = document.createElement('div');
    return tag;
}