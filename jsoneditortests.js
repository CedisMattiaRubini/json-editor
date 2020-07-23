var example_json = {
    "hello": 3.2,
    "Cargo": false,
    "obj": {
        "lala": "hello there",
        "check": 1000, 
        "mini vec": [
            "mi",
            "mo",
            "mu",
        ],
    },
    "vec": [
        3, 
        4, 
        5,
    ],
    "nothing": null,
}

function test_print() {
    // Adding extra field to the json
    var x;
    example_json['not init'] = x;
    var fun = function hello() {
        console.log("Hello world");
    };
    example_json.funnnction = fun;
    // Starting the test
    populate_editor("jsoneditor", example_json);
}