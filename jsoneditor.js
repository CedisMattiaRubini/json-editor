'use strict';

var example_json = {
    "hello": 3.2,
    "Cargo": false,
    "obj": {
        "lala": "hello there",
        "check": 1000, 
    },
    "vec": [
        3, 
        4, 
        5,
    ],
}

function test_print() {
    print_json("jsoneditor", example_json);   
}

/* Given a contaienr for the json and a json, draw the json
 * Return true if it works, false if it doesn't
 */ 
function print_json(container_id, data) {
    // Get an hold to the container of the json
    var container = document.getElementById(container_id);
    if (container == null) {
        return false; // No container no party
    }
    // Empy the container
    container.innerHTML = "";
    // Checking the data is an object
    if (typeof data != "object") {
        return false;
    }
    // Creating the html tags
    var obj = create_object("JSON", data);
    // Appending the tags
    container.appendChild(obj);
    return true
}

/* Loop trought element in an object and put them on tags
 * Called recursively for each nested object
 * Return false if data is incorect
 */
function create_object(key, data) {
    // Is it an object?
    if (typeof data != "object") {
        return false;
    };
    // If there are > 0 keys, loop the object
    var obj = document.createElement("div");
    obj.classList.add("jsonObj");
    if (Object.keys(data).length > 0) {
        // For each element in the object, create a tag and append it to the object container
        for (const key in data) {
            var tag = create_element_tag(key, data[key]);
            obj.appendChild(tag);
        };
    };
    // Add brackets to the object
    obj.innerHTML = key + ": {<br>" + obj.innerHTML + "}";
    // Return the obj
    console.log(obj);
    return obj;
}

/* Create a tag based on the element recieved
 * Function created to be used by the function create_object()
 */
function create_element_tag(key, data) {
    // If the data is an object call the create_object
    if (typeof data == "object") {
        return create_object(key,data);
    };
    // Otherwise create the element
    var tag = document.createElement("div");
    tag.classList.add("jsonElement");
    tag.innerHTML = key + ": " + data;
    console.log(tag);
    return tag;
}