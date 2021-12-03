// $("#all").on("click", function () {
//     getListProduct();
// })
//
// function SelectProduct() {
//     $("form div").on("click", ".category", function () {
//         let id = $(this).data("id");
//
//         $.ajax({
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             url: "/api/product/category/" + id,
//             type: "GET"
//         }).done(function (resp) {
//             let str = '';
//             $("#tbListProduct tr").remove();
//             $.each(resp, function (index, item) {
//
//                 str = `
//                         <tr id="tr_${item.id}">
//                             <th scope="row">${item.name}</th>
//                             <td>${item.price}</td>
//                             <td>
//                                 <button type="button" class="btn btn-primary plus"
//                                     data-id="${item.id}">
//                                     ${item.status ? 'hết hàng' : 'còn hàng'}
//                                 </button>
//                             </td>
//                         </tr>
//                     `;
//
//
//                 $("#tbListProduct").prepend(str);
//             });
//
//         }).fail(function () {
//             alert("ERROR")
//         });
//     })
// }
//
// //Nhận tất cả bàn
// getAllDeskForOption = function () {
//     $.ajax({
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         url: "/api/desk/getalldesk",
//         type: "GET",
//     }).done(function (data) {
//         console.log(data)
//         $(".desk-list .row").empty();
//         $(".wizard-navigation ul").empty();
//         $.each(data, function (index, item) {
//             if (!item.status) {
//                 $(".desk-list .row").append(
//                     `
//                 <div class="col-xl-2">
//                     <button onclick="deskModify(${item.id})"
//                         type="button"
//                         style="border-radius: 35%; width: 110%"
//                         class="btn btn-outline-secondary">
//                             ${item.name}
//                     </button>
//                 </div>
//                 `
//                 )
//             }
//
//             if (item.status) {
//                 $(".wizard-navigation ul").append(
//                     `
//                     <li>
//                     <a data-toggle = "tab" onclick = "getOrderDetailOfDesk(${item.id})" style=" margin: 10px" class="btn btn-success">${item.name}</a>
//                     </li>
//                     `
//                 )
//             }
//
//         })
//     }).fail(function () {
//         $.notify("Tải danh sách bàn không thành công", "error");
//     })
// }
//
//
// function getListProduct() {
//     $.ajax({
//         url: "/api/product",
//         type: "GET"
//     }).done(function (resp) {
//
//         let str = '';
//
//         $.each(resp, function (index, item) {
//
//             str = `
//                         <tr id="tr_${item.id}">
//                             <th scope="row">${item.name}</th>
//                             <td>${item.price}</td>
//                             <td>
//                                 <button type="button" class="btn btn-primary plus"
//                                     data-id="${item.id}">
//                                      ${item.status ? 'hết hàng' : 'còn hàng'}
//                                 </button>
//                             </td>
//
//                         </tr>
//                     `;
//             $("#tbListProduct").prepend(str);
//         });
//     }).fail(function () {
//         alert("ERROR")
//     });
// }
//
//
// function getAllCategory() {
//     return $.ajax({
//         url: "/api/category",
//         type: "GET"
//     }).done(function (resp) {
//
//         let str = '';
//
//         $.each(resp, function (index, item) {
//             str = `
//                     <button type="button" class="btn btn-success category" data-id="${item.id}">
//                     ${item.name}</button>
//                 `;
//             $("#category").prepend(str);
//         })
//     }).fail(function () {
//         alert("ERROR")
//     });
// }
//
//
// function getAllDesk() {
//     return $.ajax({
//         url: "/api/desk/getalldesk",
//         type: "GET"
//     }).done(function (resp) {
//         $("#desk").empty();
//         $.each(resp, function (index, item) {
//             $("#desk").append(
//                 `
//                     <button type="button" onclick="getStatusDesk(${item.id})" style="width: 75px; margin: 10px; border-radius: 100%" class="btn btn-${item.status ? 'danger' : 'success'}">
//                     ${item.name}</button>
//                 `);
//         })
//         $("#desk-order").empty();
//         $.each(resp,function (index,item) {
//             if(item.status){
//                 $("#desk-order").prepend(
//                     `
//                 <option value="${item.id}">${item.name}</option>
//                 `
//                 )
//             }
//         })
//     }).fail(function () {
//         alert("ERROR")
//     });
// }
//
// //Nhận trạng thái bàn
// getStatusDesk = function (id) {
//     $(".deskStatus").empty();
//     $.ajax({
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         url: "/api/desk/getDeskById/" + id,
//         type: "GET"
//     }).done(function (desk) {
//         $(".deskStatus").prepend(
//             `
//                 <h2>${desk.name}</h2>
//                 <span>Trạng thái:</span>
//                 <h3 style=" color: red">${desk.status ? 'Có khách' : 'bàn trống'}</h3>
//                 <button onclick="${desk.status ? 'payment' : 'changerStatus'}(${desk.id})" class="btn btn-${desk.status ? 'success': 'danger'}">${desk.status ? 'Thanh Toán' : 'Mở Bàn'}</button>
//             `
//         )
//
//     }).fail(function () {
//         $.notify("không lấy được thông tin bàn có id là " + id, "error")
//     })
// }
//
// //Tạo order
// createOrder = function (desk) {
//     let order = {
//         desk : desk,
//     }
//     $.ajax({
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         url: "/api/order/create",
//         type: "POST",
//         data: JSON.stringify(order)
//     }).done(function (orderResp) {
//         console.log(orderResp);
//     }).fail(function (){
//         $.notify("Tạo order Không thành công")
//     })
// }
//
//
// //Thay đổi trạng thái bàn
// changerStatus = function (id) {
//     $.ajax({
//         url: '/api/desk/update/' + id,
//         type: 'PUT'
//     }).done(function (deskResp) {
//         createOrder(deskResp);
//         getAllDesk();
//         getStatusDesk(deskResp.id);
//         getAllProduct()
//     }).fail(function () {
//         $.notify("cập nhật không thành công", "error");
//     })
// }
//
// //Nhận list Product
// getAllProduct = function () {
//     $(".form-check-inline").empty();
//     $.ajax({
//         url: "/api/product",
//         type: "GET"
//     }).done(function (productList) {
//         $("#product-order").empty();
//         $.each(productList, function (index, product) {
//             $("#product-order").prepend(
//                 `
//                 <option value="${product.id}"><h3>${product.name}</h3></option>
//                 `
//             )
//         })
//     }).fail(function () {
//         $.notify("Không tải được product","error")
//     });
// }
//
// //Nhận giá lúc lựa chọn sản phẩm.
// $("#product-order").on("change",function () {
//     $("#product-price").empty();
//     $("#product-selected").text($("#product-order :selected").text());
//     let id = $("#product-order").val();
//     $.ajax({
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         url: "/api/product/getproductby/" + id,
//         type: "GET"
//     }).done(function (product){
//         $("#product-price").val(product.price);
//         $("#price-selected").text(product.price + ' vnđ')
//     }).fail(function (){
//         $.notify("không lấy được giá sản phẩm","error");
//     })
// })
//
// //Nhận Product theo id
// getProductById = function (id) {
//     $.ajax({
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         url: "/api/product/getproductby/" + id,
//         type: "GET"
//     }).done(function (product){
//         console.log(product);
//     }).fail(function (){
//         $.notify("không lấy được  sản phẩm","error");
//     })
// }
//
// // oninput nhập số lượng vào và hiển thị ở phần thông tin
// $("#product-quantity").on("input",function (){
//     let price = $("#product-price").val();
//     let quantity = $("#product-quantity").val();
//     $("#quantity-selected").text(quantity);
//     let unitPrice = price * quantity;
//     $("#total-selected").text(unitPrice + ' vnđ');
//     $("#product-unitPrice").val(unitPrice);
// })
//
// //Nhận tên bàn ở phần thông tin
// $("#desk-order").on("change",function (){
//     $("#desk-selected").text($("#desk-order :selected").text());
//     getOrderByDeskId($("#desk-order").val());
// })
//
// //Nhận order theo Desk Id
// getOrderByDeskId = function (id) {
//     $.ajax({
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         url: "/api/order/getorderbydeskid/" + id,
//         type: "GET"
//     }).done(function (order){
//         console.log(order);
//         $("#order_id").val(order.id);
//     }).fail(function (){
//         $.notify("order fail","error")
//     })
// }
//
//
//
//
// //Tạo order cho bàn
// createOrderDetail = function () {
//     if($("#createOrderDetail").valid()){
//         Swal.fire({
//             title: 'Bạn có muốn lưu lại không?',
//             showDenyButton: true,
//             confirmButtonText: 'Lưu',
//             denyButtonText: `Kiểm tra lại`,
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 let orderDetailDTO = {
//                     orderId : $("#order_id").val(),
//                     quantity : $("#product-quantity").val(),
//                     unitPrice : $("#product-unitPrice").val(),
//                     productName: $("#product-order :selected").text(),
//                     productPrice: $("#product-price").val()
//                 }
//                 $.ajax({
//                     headers: {
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json'
//                     },
//                     url: "/api/orderdetail/create",
//                     type: "POST",
//                     data: JSON.stringify(orderDetailDTO)
//                 }).done (function (orderDetailResp){
//                     $.notify("Gọi món thành công","success")
//                     console.log(orderDetailResp);
//                 }).fail(function (){
//                     $.notify("Tạo order lỗi","error")
//                 })
//             } else if (result.isDenied) {
//                 $.notify("Chưa lưu","error")
//             }
//         })
//     }
// }



init = function () {
    // getAllCategory();
    // getListProduct();
    // SelectProduct();
    // getAllDesk();
    // getAllProduct()
    getAllDeskForOption();
    getProductAll();
}

//phần mới

//Nhận tất cả bàn
getAllDeskForOption = function () {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/desk/getalldesk",
        type: "GET",
    }).done(function (data) {
        console.log(data)
        $(".wizard-navigation ul").empty();
        $.each(data, function (index, item) {
            if (item.status) {
                $(".wizard-navigation ul").append(
                    `
                    <li>
                    <a data-toggle = "tab" onclick = "getOrderByDeskId(${item.id})" style=" margin: 10px" class="btn btn-success">${item.name}</a>
                    </li>
                    `
                )
            }
        })
    }).fail(function () {
        $.notify("Tải danh sách bàn không thành công", "error");
    })
}
//Nhận tất cả sản phẩm
getProductAll = function () {
    $(".importProduct .row").empty();
    $.ajax({
        url: "/api/product",
        type: "GET"
    }).done(function (productList) {
        $.each(productList, function (index, product) {
            $(".importProduct .row").append(
               ` 
                    <div class="col-xl-3"  style="max-height: 50%; max-width: 100%">
                      <img style="max-width: 25%; max-height: 25%"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGDhB8EB8QKSKyTZUv2xDV203sj1aTL8VZjw&usqp=CAU">
                      <h2 id="product-name${product.id}">${product.name}</h2>
                      <h3 id="product-price${product.id}">${product.price}</h3>                   
                      <span><button type="button" class="btn btn-success" onclick="addProducetoOrderDetail(${product.id})"><i class="fas fa-plus"></i>Thêm</button></span>
                    </div>         
                `
            )
        })
    }).fail(function () {
        $.notify("Không tải được product","error")
    });
}

//thêm sản phẩm vào
addProducetoOrderDetail = function (id) {
    let price = $("#product-price" + id).text();
    let order_id = parseInt($("#order_id").text());
    let orderDetailDTO = {
        orderId:order_id,
        productName : $("#product-name" + id).text(),
        productPrice: price,
        unitPrice: price,
        quantity : 1
    }
    console.log(orderDetailDTO);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/orderdetail/create",
        type: "POST",
        data: JSON.stringify(orderDetailDTO)
    }).done (function (orderDetailResp){
        console.log(orderDetailResp);
        getOrderDetailOfDesk(orderDetailResp.order.desk.id);
        $.notify("Gọi món thành công","success")
        console.log(orderDetailResp);
    }).fail(function (){
        $.notify("Bạn chưa chọn Bàn","error")
    })

}

//Nhận order bằng desk_id
getOrderByDeskId = function (id) {
    $("#order_id").text('')
    $(".importDeskInfo .row").empty();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/order/getorderbydeskid/" + id,
        type: "GET"
    }).done(function (order){
        getOrderDetailOfDesk(order.desk.id);
        $("#order_id").text(order.id);
        $(".importDeskInfo .row").append(
            `
                <div class="card">
                    <h2 id="desk_name">${order.desk.name}</h2>        
                    <table class="table table-hover">
                        <tbody id="orderDetail_of_desk">
                             <!-- hiển thị danh sách món ăn của bàn--> 
                        </tbody>
                         <tfoot id="total_payment_of_desk">
                            <!--Hiển thị tổng tiền-->
                         </tfoot>
                    </table>
                       
                </div>   
            `
        )
        // getProductAll();
    }).fail(function (){
        $.notify("order fail","error")
    })
}

getOrderDetailOfDesk = function (desk_id){
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // url: "/api/orderdetail/orderdetailofdeskid/" + id,
        url: "/api/orderdetail/order-detail-of-deskid/" + desk_id,
        type: "GET",
    }).done(function (orderdetails) {
        console.log(orderdetails);
        $("#orderDetail_of_desk").empty();
        let btn_pay = $("#btn_pay");
        btn_pay.empty();
        let total = 0;
        // let desk_id;
        //thêm sau
        let unitPrice = 0;
        //end
        $.each(orderdetails, function (index, orderDetail){
            unitPrice = (orderDetail.productPrice * orderDetail.quantity)
            total += unitPrice;
            // desk_id = orderDetail.order.desk.id;
            $("#orderDetail_of_desk").append(
                `
                <tr>
                    <th>${index + 1}</th>
                    <th>${orderDetail.productName}</th>
                    <th>${orderDetail.productPrice}</th>
                    <th>${orderDetail.quantity}</th>
                    <th>${unitPrice}</th>
                </tr>
                `
            )
        })
        btn_pay.append(
            `
                    <tr>
                        <th colspan="4"><b>Tổng: </b></th>
                        <th><h2>${formatNumber(total)} vnđ </h2></th>
                     </tr>
                     <tr>
                          <td style="text-align: right; margin-right: 30px" colspan="5"><button onclick="paymentForm(${desk_id})" class="btn btn-success">Thanh toán</button></td>
                     </tr>
                `
        )

    }).fail(function () {
        $.notify("Tải thông tin bàn không thành công", "error");
    })
}

paymentForm = function (id) {
    $("#product_list_of_bill").empty();
    $("#total_bill").empty();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/orderdetail/orderdetailofdeskid/" + id,
        type: "GET",
    }).done(function (orderdetail) {
        $("#bill").modal("show");
        let total = 0;
        let desk_id = 0;
        let desk_name = '';
        let order_id = 0;
        $.each(orderdetail,function (index,item){
            total += item.unitPrice;
            desk_id = parseInt(item.order.desk.id);
            desk_name = item.order.desk.name;
            order_id = item.order.id;
            $("#product_list_of_bill").append(
                `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.productName}</td>
                    <td>${formatNumber(item.productPrice)}</td>
                    <td>${item.quantity}</td>
                    <td>${formatNumber(item.unitPrice)}</td>
                </tr>
               `
            );
        })
        $("#total_bill").append(
            `
                <tr>
                    <th colspan="4"><b>Tổng</b></th>
                    <th><input type="text" id="total_bill_pay" value="${total}" readonly hidden> ${formatNumber(total)} vnđ</th>
                 </tr>
                 <tr>
                      <td style="text-align: right; margin-right: 30px" colspan="4"><button type="button" onclick="billPrint()" class="btn btn-success" disabled>In Hoá Đơn</button></td>
                      <td style="text-align: right; margin-right: 30px" colspan="4"><button type="button" onclick="billNotPrint(${desk_id})" class="btn btn-success">Không in hoá đơn</button></td>
                 </tr>
            `
        )
        console.log(order_id);
        $("#desk_name_bill").text(desk_name)
        $("#order_id_bill").val(order_id);
    }).fail(function () {
        $.notify("Tải thông tin bàn không thành công", "error");
    })
}

// Thanh toán không in hoá đơn
billNotPrint = function (id){
    let bill = {
        createAt: new Date(),
        total: $("#total_bill_pay").val(),
        customerName: $("#customerName").val(),
        order_id: $("#order_id").val(),
        desk_id: id
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/bill/create",
        type: "POST",
        data: JSON.stringify(bill)
    }).done(function (billResp){
        $("#bill").modal("hide");
        $("#orderDetail_of_desk").empty();
        $("#total_payment_of_desk").empty();
        console.log(billResp);
        changerStatusAfterPayment(billResp.desk_id);
        $("#product_list_of_desk").empty();
        $("#total").empty();
        $("#desk_name").text('');
        $("#desk_name_bill").text('');
        $.notify("Đã thanh toán", "success");
    }).fail(function (){
        $.notify("Thanh toán lỗi", "error");
    })
}

//thay đổi trạng thái sau khi thanh toán.
changerStatusAfterPayment = function (id){
    $.ajax({
        url: '/api/desk/update/' + id,
        type: 'PUT'
    }).done(function (deskResp) {
        getAllDeskForOption();
    }).fail(function () {
        $.notify("cập nhật không thành công", "error");
    })
}

//format Number
function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}


<!--    template-->
$(document).ready(function () {
    $('#af-preloader').delay(500).fadeOut('slow')
    init();
});