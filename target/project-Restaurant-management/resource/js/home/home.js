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
                                <button type="button" class="btn btn-primary plus"
                                    data-id="${item.id}">
                                    ${item.status ? 'hết hàng' : 'còn hàng'}
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
                                <button type="button" class="btn btn-primary plus"
                                    data-id="${item.id}">
                                     ${item.status ? 'hết hàng' : 'còn hàng'}
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
                    <button type="button" class="btn btn-success category" data-id="${item.id}">
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
                    <button type="button" onclick="getStatusDesk(${item.id})" style="width: 75px; margin: 10px; border-radius: 100%" class="btn btn-${item.status ? 'danger' : 'success'}">
                    ${item.name}</button>
                `);
        })
        $("#desk-order").empty();
        $.each(resp,function (index,item) {
            if(item.status){
                $("#desk-order").prepend(
                    `
                <option value="${item.id}">${item.name}</option>
                `
                )
            }
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
                <button onclick="${desk.status ? 'payment' : 'changerStatus'}(${desk.id})" class="btn btn-${desk.status ? 'success': 'danger'}">${desk.status ? 'Thanh Toán' : 'Mở Bàn'}</button>
            `
        )

    }).fail(function () {
        $.notify("không lấy được thông tin bàn có id là " + id, "error")
    })
}

//Tạo order
createOrder = function (desk) {
    let order = {
        desk : desk,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/order/create",
        type: "POST",
        data: JSON.stringify(order)
    }).done(function (orderResp) {
        console.log(orderResp);
    }).fail(function (){
        $.notify("Tạo order Không thành công")
    })
}


//Thay đổi trạng thái bàn
changerStatus = function (id) {
    $.ajax({
        url: '/api/desk/update/' + id,
        type: 'PUT'
    }).done(function (deskResp) {
        createOrder(deskResp);
        getAllDesk();
        getStatusDesk(deskResp.id);
        getAllProduct()
    }).fail(function () {
        $.notify("cập nhật không thành công", "error");
    })
}

//Nhận list Product
getAllProduct = function () {
    $(".form-check-inline").empty();
    $.ajax({
        url: "/api/product",
        type: "GET"
    }).done(function (productList) {
        $(".productListOrder").empty();
        $.each(productList, function (index, product) {
            $(".productListOrder").prepend(
                `
                <tr> 
                    <td><input id="product_id" value="${product.id}" readonly hidden></td>
                    <td><input id="productName" value="${product.name}" readonly></td>
                    <td><input id="productPrice_${product.id}" value="${product.price}" readonly></td>
                    <td><input id="quantity_${product.id}" oninput="getUnitPrice(${product.id})" type="number" data-rule-required="true" data-msg-required="Không được bỏ trống" ></td>
                    <td><input id="unitPrice_${product.id}" readonly></td>
                </tr>
                `
            )
        })


    }).fail(function () {
        $.notify("Không tải được product","error")
    });
}

// Nhận giá lúc thay đổi số lượng món ăn
getUnitPrice = function (id) {
    let quantity = $("#quantity_" + id).val();
    let price = $("#productPrice_" + id ).val();
    let unitPrice = quantity * price;
    $("#unitPrice_" + id).val(unitPrice);
}


init = function () {
    getAllCategory();
    getListProduct();
    SelectProduct();
    getAllDesk();
    getAllProduct()
}


<!--    template-->
$(document).ready(function () {
    $('#af-preloader').delay(500).fadeOut('slow')
    init();
});