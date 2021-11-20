$("#all").on("click", function (){
    getListProduct();
})

function SelectProduct() {
    $("form div").on("click", ".category", function () {
        let id = $(this).data("id");

        $.ajax({
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            url: "/api/product/category/" + id,
            type: "GET"
        }).done(function (resp) {
            let str = '';
            $("#tbListProduct tr").remove();
            $.each(resp, function(index, item) {

                str = `
                        <tr id="tr_${item.id}">
                            <th scope="row">${item.name}</th>
                            <td>${item.price}</td>
                            <td>
                                <button type="button" class="btn btn-outline-primary plus"
                                    data-id="${item.id}">
                                    Chọn món
                                </button>
                            </td>
                        </tr>
                    `;


                $("#tbListProduct").prepend(str);
            });

        }).fail(function () {
            alert("ERROR")
        });
    })
}


function getListProduct() {
    $.ajax({
        url: "/api/product",
        type: "GET"
    }).done(function (resp) {

        let str = '';

        $.each(resp, function(index, item) {

            str = `
                        <tr id="tr_${item.id}">
                            <th scope="row">${item.name}</th>
                            <td>${item.price}</td>
                            <td>
                                <button type="button" class="btn btn-outline-primary plus"
                                    data-id="${item.id}">
                                    Chọn món
                                </button>
                            </td>

                        </tr>
                    `;
            $("#tbListProduct").prepend(str);
        });

    }).fail(function () {
        alert("ERROR")
    });
}



function getAllCategory() {
    return $.ajax({
        url: "/api/category",
        type: "GET"
    }).done(function (resp) {

        let str = '';

        $.each(resp, function(index, item) {
            str = `
                    <button type="button" class="btn btn-outline-primary category" data-id="${item.id}">
                    ${item.name}</button>
                `;
            $("#category").prepend(str);
        })
    }).fail(function () {
        alert("ERROR")
    });
}

function getAllDesk() {
    return $.ajax({
        url: "/api/desk/getalldesk",
        type: "GET"
    }).done(function (resp) {
<<<<<<< HEAD

        let str = '';

        $.each(resp, function(index, item) {
            str = `
                    <button type="button" style="width: 75px; margin: 10px" class="btn btn-outline-primary desk" data-id="${item.id}">
                    ${item.name}</button>
                `;
            $("#desk").prepend(str);
=======
        $.each(resp, function(index, item) {
            $("#desk").prepend(
                `
                    <button type="button" style="width: 75px; margin: 10px" class="btn btn-outline-primary desk" data-id="${item.id}">
                    ${item.name}</button>
                `);
>>>>>>> hoang_dev
        })
    }).fail(function () {
        alert("ERROR")
    });
}


init = function () {
    getAllCategory();
    getListProduct();
    SelectProduct();
    getAllDesk();
}

<!--    template-->
$(document).ready(function () {
    $('#af-preloader').delay(500).fadeOut('slow')
    init();
});