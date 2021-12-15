<!--    template-->
$(document).ready(function () {
    $('#af-preloader').delay(500).fadeOut('slow')
    init();
});

init = function () {
    getAllDeskForOption();
    getProductAll();
    getAllCategory();
}

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
        $(".desk-list .row").empty();
        $(".wizard-navigation").empty();
        $.each(data, function (index, item) {
            if (!item.status) {
                $(".desk-list .row").append(
                    `
                <div class="col-xl-1">
                    <button onclick="deskModify(${item.id})"
                        type="button"
                        style="border-radius: 35%; width: 100px; margin-left: 10px"
                        class="btn btn-success">
                            ${item.name}
                    </button>
                </div>
                `
                )
            }
            if(item.status) {
                $(".wizard-navigation").append(
                    `
                        <div class="col-xl-2">
                            <a data-toggle = "tab" onclick = "getOrderByDeskId(${item.id})" style=" margin: 10px" class="btn btn-success">${item.name}</a>
                        </div>
                    `
                )
            }
        })
    }).fail(function () {
        $.notify("Tải danh sách bàn không thành công", "error");
    })
}

//Desk option
deskModify = function (id) {
    $(".desk_option .row").empty();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/desk/getDeskById/" + id,
        type: "GET",
    }).done(function (deskResp) {
        $("#desk_modify_option").modal("show");
        $(".desk_option").prepend(
            `
                    <div class="row" style="margin-left: 10px">
                            <h2>${deskResp.name}</h2>
                            <button onclick="changerStatus(${deskResp.id})" style="width: 75px; text-align: center" title="Thay đổi trạng thái"  class="btn btn-primary">Mở Bàn</button>
                           
                    </div>
                `
        )

    }).fail(function () {
        $.notify("Tải bàn không thành công", "error");
    })

}


//lưu lại thay đổi thông tin bàn.
saveEditDesk = function () {
    Swal.fire({
        title: 'Lưu thay đổi',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Lưu lại'
    }).then((result) => {
        if (result.isConfirmed) {
            let desk = {
                id: $("#desk_id").val(),
                name: $("#deskNameEdit").val(),
                status: false
            }
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: "/api/desk/edit",
                type: "POST",
                data: JSON.stringify(desk)
            }).done(function (deskResp) {
                if(deskResp != null) {
                    getAllDeskForOption();
                    $("#desk_modify_edit").modal("hide");
                    $.notify("Sửa thành công", "success");
                }
            }).fail(function () {
                $.notify("Sửa không thành công", "error");
            })

        }
    })
}

// ẩn modal chỉnh sửa
closeEditModal = function () {
    $("#desk_modify_edit").modal("hide");
}


//xoá bàn
deleteDesk = function (id) {
    Swal.fire({
        title: 'Xoá bàn?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xoá!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: "/api/desk/delete/" + id,
                type: "GET",
            }).done(function (deskResp) {
                if (deskResp === true) {
                    $("#desk_modify_option").modal("hide");
                    getAllDeskForOption();
                    $.notify("đã xoá", "error");
                } else {
                    Swal.fire(
                        'xoá không thành công!',
                        'error'
                    )
                }
            }).fail(function () {
                $.notify("Không xoá được", "error");
            })
        }
    })

}


//thay doi trang thai ban
changerStatus = function (id) {
    Swal.fire({
        title: 'Thay đổi trạng thái',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'thay đổi!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/api/desk/update/' + id,
                type: 'PUT'
            }).done(function (deskResp) {
                $("#desk_modify_option").modal("hide");
                createOrder(deskResp);
                getAllDeskForOption();
            }).fail(function () {
                $.notify("cập nhật không thành công", "error");
            })
        }
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
    }).fail(function (){
        $.notify("Tạo order Không thành công")
    })
}

//sửa thông tin bàn
editDeskInfo = function (id) {
    $(".desk_edit").empty();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/desk/getDeskById/" + id,
        type: "GET",
    }).done(function (deskInfo) {
        $("#desk_modify_option").modal("hide");
        $("#desk_modify_edit").modal("show");
        $(".desk_edit").prepend(
            `
            <form id="deskEdit" class="form-group">
               <input type="number" id="desk_id" value="${deskInfo.id}" hidden>
               <label for="deskNameEdit">Tên</label>
               <input id="deskNameEdit" type="text" value="${deskInfo.name}" class="form-control" data-rule-required="true"
                               data-msg-required="Không được bỏ trống">
               <button class="btn btn-success" type="button" onclick="saveEditDesk()">Lưu</button>
               <button class="btn btn-danger" type="button" onclick="closeEditModal()">Huỷ</button>
            </form>

            `
        )
    }).fail(function () {
        $.notify("Tải bàn không thành công", "error");
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
                    <div class="col-xl-3"  style="max-height: 50%; max-width: 50%">
                      <img style="max-width: 25%; max-height: 25%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGDhB8EB8QKSKyTZUv2xDV203sj1aTL8VZjw&usqp=CAU">
                      <h2 id="product-name${product.id}">${product.name}</h2>
                      <h3 id="product-price${product.id}">${product.price}</h3>                   
                      <span><button type="button" class="btn btn-success" onclick="addProducetoOrderDetail(${product.id})" ${product.status ? 'disabled': ''} ><i class="fas fa-plus"></i>${product.status ? '<b style="color: red">Hết hàng</b>': 'Thêm'}</button></span>
                    </div>         
                `
                )
        })
    }).fail(function () {
        $.notify("Không tải được sản phẩm","error")
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
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/orderdetail/create",
        type: "POST",
        data: JSON.stringify(orderDetailDTO)
    }).done (function (orderDetailResp){
        getOrderDetailOfDesk(orderDetailResp.order.desk.id);
        $.notify("Gọi món thành công","success")
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

        $("#orderDetail_of_desk").empty();
        let btn_pay = $("#btn_pay");
        btn_pay.empty();
        let total = 0;
        let unitPrice = 0;
        $.each(orderdetails, function (index, orderDetail){
            unitPrice = (orderDetail.productPrice * orderDetail.quantity)
            total += unitPrice;
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
                      <td style="text-align: right; margin-right: 30px" colspan="4"><button type="button" onclick="billPrint()" class="btn btn-success">In Hoá Đơn</button></td>
                      <td style="text-align: right; margin-right: 30px" colspan="4"><button type="button" onclick="billNotPrint(${desk_id})" class="btn btn-success">Không in hoá đơn</button></td>
                 </tr>
            `
        )
        $("#desk_name_bill").text(desk_name)
        $("#order_id_bill").val(order_id);
    }).fail(function () {
        $.notify("Tải thông tin bàn không thành công", "error");
    })
}

//thanh toán in hoá đơn
billPrint = function (){


}

// Thanh toán không in hoá đơn
billNotPrint = function (id){
    let bill = {
        createAt: new Date(),
        total: $("#total_bill_pay").val(),
        customerName: $("#customerName").val(),
        order_id: $("#order_id_bill").val(),
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
        // console.log(billResp);
        changerStatusAfterPayment(billResp.desk_id);
        $("#product_list_of_desk").empty();
        $("#total").empty();
        $("#order_id").text('');
        $("#desk_name").text('');
        $("#desk_name_bill").text('');
        $("#btn_pay").empty();
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

// Logout
$(".logout").on("click", function () {
    setTimeout(function () {
        $.removeCookie("JWT");
    }, 1000);
});


//Nhận danh sách danh mục
getAllCategory = function () {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/category/category",
        type: "GET"
    }).done(function (categories) {
        $.each(categories, function (index, category) {
            $("#categories").append(
                `
                <option value="${category.id}">${category.name}</option>
                `
            )
        })
    }).fail(function () {
        $.notify("không tải được danh mục", "error")
    });
}

//Nhận danh sách món ăn theo danh mục

$("#categories").on("change",function () {
    let value = $("#categories :selected").val();
    if(value === 'all') {
        getProductAll();
    }else {
        getProductByCategoryId(value);
    }
})

getProductByCategoryId = function (id) {
    $.ajax({
        url: "/api/product/category/" + id,
        type: "GET"
    }).done(function (resp) {
        $(".importProduct .row").empty();
        $.each(resp, function (index, item) {
            $(".importProduct .row").append(
                ` 
                    <div class="col-xl-3"  style="max-height: 50%; max-width: 50%">
                      <img style="max-width: 25%; max-height: 25%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGDhB8EB8QKSKyTZUv2xDV203sj1aTL8VZjw&usqp=CAU">
                      <h2 id="product-name${item.id}">${item.name}</h2>
                      <h3 id="product-price${item.id}">${item.price}</h3>                   
                      <span><button type="button" class="btn btn-success" onclick="addProducetoOrderDetail(${item.id})" ${item.status ? 'disabled': ''} ><i class="fas fa-plus"></i>${item.status ? '<b style="color: red">Hết hàng</b>': 'Thêm'}</button></span>
                    </div>         
                `
            )
        })
    }).fail(function () {
        $.notify("tải danh sách lỗi","error")
    });
}
