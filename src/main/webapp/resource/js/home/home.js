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
                <span>Trạng thái:</span> 
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
        $("#product-order").empty();
        $.each(productList, function (index, product) {
            $("#product-order").prepend(
                `
                <option value="${product.id}"><h3>${product.name}</h3></option>
                `
            )
        })
    }).fail(function () {
        $.notify("Không tải được product","error")
    });
}

//Nhận giá lúc lựa chọn sản phẩm.
$("#product-order").on("change",function () {
    $("#product-price").empty();
    $("#product-selected").text($("#product-order :selected").text());
    let id = $("#product-order").val();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/product/getproductby/" + id,
        type: "GET"
    }).done(function (product){
        $("#product-price").val(product.price);
        $("#price-selected").text(product.price + ' vnđ')
    }).fail(function (){
        $.notify("không lấy được giá sản phẩm","error");
    })
})

//Nhận Product theo id
getProductById = function (id) {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/product/getproductby/" + id,
        type: "GET"
    }).done(function (product){
        console.log(product);
    }).fail(function (){
        $.notify("không lấy được  sản phẩm","error");
    })
}

// oninput nhập số lượng vào và hiển thị ở phần thông tin
$("#product-quantity").on("input",function (){
    let price = $("#product-price").val();
    let quantity = $("#product-quantity").val();
    $("#quantity-selected").text(quantity);
    let unitPrice = price * quantity;
    $("#total-selected").text(unitPrice + ' vnđ');
    $("#product-unitPrice").val(unitPrice);
})

//Nhận tên bàn ở phần thông tin
$("#desk-order").on("change",function (){
    $("#desk-selected").text($("#desk-order :selected").text());
    getOrderByDeskId($("#desk-order").val());
})

//Nhận order theo Desk Id
getOrderByDeskId = function (id) {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/order/getorderbydeskid/" + id,
        type: "GET"
    }).done(function (order){
        console.log(order);
        $("#order_id").val(order.id);
    }).fail(function (){
        $.notify("order fail","error")
    })
}




//Tạo order cho bàn
createOrderDetail = function () {
    if($("#createOrderDetail").valid()){
        Swal.fire({
            title: 'Bạn có muốn lưu lại không?',
            showDenyButton: true,
            confirmButtonText: 'Lưu',
            denyButtonText: `Kiểm tra lại`,
        }).then((result) => {
            if (result.isConfirmed) {
                let orderDetailDTO = {
                    orderId : $("#order_id").val(),
                    productId: $("#product-order").val(),
                    quantity : $("#product-quantity").val(),
                    unitPrice : $("#product-unitPrice").val(),
                }
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    url: "/api/orderdetail/create",
                    type: "POST",
                    data: JSON.stringify(orderDetailDTO)
                }).done (function (orderDetailResp){
                    $.notify("Gọi món thành công","success")
                    console.log(orderDetailResp);
                }).fail(function (){
                    $.notify("Tạo order lỗi","error")
                })
            } else if (result.isDenied) {
                $.notify("Chưa lưu","error")
            }
        })
    }
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