$("#all").on("click", function () {
    getListProduct();
})

function SelectProduct() {
    $("form div").on("click", ".category", function () {
        let id = $(this).data("id");

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/api/product/category/" + id,
            type: "GET"
        }).done(function (resp) {
            let str = '';
            $("#tbListProduct tr").remove();
            $.each(resp, function (index, item) {

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

        $.each(resp, function (index, item) {

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

        $.each(resp, function (index, item) {
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
        $("#desk").empty();
        $.each(resp, function (index, item) {
            $("#desk").append(
                `
                    <button type="button" onclick="getStatusDesk(${item.id})" style="width: 75px; margin: 10px" class="btn btn-${item.status ? 'danger' : 'success'}">
                    ${item.name}</button>
                `);
        })
    }).fail(function () {
        alert("ERROR")
    });
}

//Nhận trạng thái bàn
getStatusDesk = function (id) {
    $(".deskStatus").empty();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/desk/getDeskById/" + id,
        type: "GET"
    }).done(function (desk) {
        $(".deskStatus").prepend(
            `
                <h2>${desk.name}</h2>
                <span>Tình trạng:</span> 
                <h3 style=" color: red">${desk.status ? 'Có khách' : 'bàn trống'}</h3>
                <button onclick="${desk.status ? 'orderCreate' : 'changerStatus'}(${desk.id})" class="btn btn-danger">${desk.status ?'Kiểm tra':'Mở Bàn'}</button>
               
            `
        )
    }).fail(function () {
        $.notify("không lấy được thông tin bàn có id là " + id, "error")
    })

}

//Tạo order
orderCreate = function (id) {
    alert("create" + id);
}

//Thay đổi trạng thái bàn
changerStatus = function (id) {
    $.ajax({
        url: '/api/desk/update/' + id,
        type: 'PUT'
    }).done(function (deskResp) {
        getAllDesk();
        getStatusDesk(deskResp.id);
    }).fail(function () {
        $.notify("cập nhật không thành công","error");
    })
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