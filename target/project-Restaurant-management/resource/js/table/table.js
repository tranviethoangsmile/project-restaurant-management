createTable = function () {
    let table = {
        name: $("#tableName").val(),
        status: $("#status").is(":checked")
    }
    $.ajax({
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        url: "/api/category/create",
        type: "POST",
        data: JSON.stringify(category)
    })
}