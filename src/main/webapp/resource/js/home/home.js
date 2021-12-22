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
                        style=" width: 100px; margin-left: 10px"
                        class="btn btn-success">
                            ${item.name}
                    </button>
                </div>
                `
                )
            }
            if (item.status) {
                $(".wizard-navigation").append(
                    `
                        <div class="col-xl-1">
                            <a data-toggle = "tab" onclick = "getOrderByDeskId(${item.id})" style=" margin: 5px; color: #FFFFFF" class="btn btn-success">${item.name}</a>
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
                if (deskResp != null) {
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
        desk: desk,
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
    }).fail(function () {
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
            let categoryName = product.category.name;
            let image = getLinkImage(categoryName)
            $(".importProduct .row").append(
                ` 
                    <div class="col-xl-3"  style="max-height: 50%; max-width: 50%">
                      <img style="max-width: 50%; max-height: 50%" src= ${image}>
                      <h2 id="product-name${product.id}">${product.name}</h2>
                      <h3 id="product-price${product.id}">${product.price}</h3>                   
                      <span><button type="button" class="btn btn-success" onclick="addProducetoOrderDetail(${product.id})" ${product.status ? 'disabled' : ''} >${product.status ? '<b style="color: red">Hết hàng</b>' : 'Thêm'}</button></span>
                    </div>         
                `
            )
        })
    }).fail(function () {
        $.notify("Không tải được sản phẩm", "error")
    });
}

//chưa hoàn thành
var status = "";
checkStatusProduct = function (id) {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/product/getStatusProduct/" + id,
        type: "POST"
    }).done(function (resp) {
       status  = resp;
    }).fail(() => {
        $.notify("...", "waiting")
    })
}




//thêm sản phẩm vào
addProducetoOrderDetail = function (id) {
    checkStatusProduct(id);
    console.log(status);
    switch(status) {
        case "false":
        default:
            let price = $("#product-price" + id).text();
            let order_id = parseInt($("#order_id").text());
            let orderDetailDTO = {
                orderId: order_id,
                productName: $("#product-name" + id).text(),
                productPrice: price,
                unitPrice: price,
                quantity: 1
            }
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: "/api/orderdetail/create",
                type: "POST",
                data: JSON.stringify(orderDetailDTO)
            }).done(function (orderDetailResp) {
                getOrderDetailOfDesk(orderDetailResp.order.desk.id);
                $.notify("Gọi món thành công", "success")
            }).fail(function () {
                $.notify("Bạn chưa chọn Bàn", "error")
            })
            break;
        case "true":
            $.notify("sản phẩm hết hàng","warning");
            break;
    }

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
    }).done(function (order) {
        getOrderDetailOfDesk(order.desk.id);
        $("#order_id").text(order.id);
        $("#desk_name").text(`${order.desk.name}`)
    }).fail(function () {
        $.notify("order fail", "error")
    })
}

//Nhận chi tiết order của bàn
getOrderDetailOfDesk = function (desk_id) {
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
        $(".table-bill").empty();
        let btn_pay = $(".checkout")
        btn_pay.empty();
        let total = 0;
        let unitPrice = 0;
        $.each(orderdetails, function (index, orderDetail) {
            unitPrice = (orderDetail.productPrice * orderDetail.quantity)
            total += unitPrice;
            $(".table-bill").append(`
             <div class="bill-items">
                 <div class="col-md-5">
                        <p><b>${orderDetail.productName}</b></p>
                        <p><b>${formatNumber(orderDetail.productPrice)}</b></p>
                 </div>
                 <div class="col-md-3" style="text-align: center;">
                        <span><b>${orderDetail.quantity}</b></span>
                </div>
                <div class="col-md-4" style="text-align: right;">
                    <p><b>${formatNumber(unitPrice)}</b></p>
                </div>
             </div>
            `)
        })
        btn_pay.append
        (
            `         
              <button type="button" onclick="paymentForm(${desk_id})" class="btn btn-success">Thanh toán</button>   
            `
        )
        $("#total").text
        (
            `
                ${formatNumber(total)} vnđ
                `
        )
        $("#totalAndFee").text
        (
            `
                ${formatNumber(total + (total * 10 / 100))} vnđ
                `
        )

    }).fail(function () {
        $.notify("Tải thông tin bàn không thành công", "error");
    })
}

//Thanh toán
paymentForm = function (id) {
    $(".btn_pay").empty();
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
        $.each(orderdetail, function (index, item) {
            total += item.unitPrice;
            desk_id = parseInt(item.order.desk.id);
            desk_name = item.order.desk.name;
            order_id = item.order.id;
        })
        let totalAndTax = total + (total * 10 / 100);
        $("#total_bill_pay").val(totalAndTax);
        $("#total_amount").text(`${formatNumber(total + (total * 10 / 100))} vnđ`)
        $(".btn_pay").append(
            `
                        <button type="button" onclick="billPrint()" class="btn btn-success" disabled>In Hoá Đơn</button>
                        <button type="button" onclick="billNotPrint(${desk_id})" class="btn btn-success">Không in hoá đơn</button>         
            `
        )
        $("#desk_name_bill").text(desk_name)
        $("#order_id_bill").val(order_id);
    }).fail(function () {
        $.notify("Tải thông tin bàn không thành công", "error");
    })
}

//thanh toán in hoá đơn
// billPrint = function () {
//
//
// }
$("#customerMoney").on("change", function () {
    let cusMoney = parseInt($("#customerMoney :selected").val());
    let moneyPay = parseInt($("#total_bill_pay").val());
    $("#moneyForCustomer").val(`${formatNumber(cusMoney - moneyPay)} vnđ`)
})

// Thanh toán không in hoá đơn
billNotPrint = function (id) {
    $(".checkout").empty();
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
    }).done(function (billResp) {
        $("#bill").modal("hide");
        // console.log(billResp);
        changerStatusAfterPayment(billResp.desk_id);
        $("#total").text('0 vnđ');
        $("#totalAndFee").text('0 vnđ');
        $("#order_id").text('');
        $("#desk_name").text('');
        $("#desk_name_bill").text('');
        $(".table-bill").empty();
        $("#customerName").val('');
        $(".checkout").append(
            `
            <button onclick="notication()" type="button" class="btn btn-success">Thanh toán</button>
            `
        );
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Thanh toán thành công',
            showConfirmButton: false,
            timer: 1500
        })
    }).fail(function () {
        $.notify("Thanh toán lỗi", "error");
    })
}

//Thông báo lúc không chọn bàn
notication = function () {
    $.notify("Không khả dụng", "warning");
}

//thay đổi trạng thái sau khi thanh toán.
changerStatusAfterPayment = function (id) {
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
function formatNumber(num) {
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

$("#categories").on("change", function () {
    let value = $("#categories :selected").val();
    if (value === 'all') {
        getProductAll();
    } else {
        getProductByCategoryId(value);
    }
})

//Nhận sản phẩm theo id Category
getProductByCategoryId = function (id) {
    $.ajax({
        url: "/api/product/category/" + id,
        type: "GET"
    }).done(function (resp) {
        $(".importProduct .row").empty();
        $.each(resp, function (index, item) {
            let categoryName = item.category.name;
            let image = getLinkImage(categoryName)
            $(".importProduct .row").append(
                ` 
                    <div class="col-xl-3"  style="max-height: 50%; max-width: 50%">
                      <img style="max-width: 50%; max-height: 50%" src= ${image}>
                      <h2 id="product-name${item.id}">${item.name}</h2>
                      <h3 id="product-price${item.id}">${item.price}</h3>                   
                      <span><button type="button" class="btn btn-success" onclick="addProducetoOrderDetail(${item.id})" ${item.status ? 'disabled' : ''} >${item.status ? '<b style="color: red">Hết hàng</b>' : 'Thêm'}</button></span>
                    </div>         
                `
            )
        })
    }).fail(function () {
        $.notify("tải danh sách lỗi", "error")
    });
}


//lấy link ảnh
getLinkImage = function (value) {
    switch (value) {
        case "Coffee":
            return "https://znews-photo.zadn.vn/w660/Uploaded/ngotno/2020_03_13/trung1_1_.jpg";
        case "Giải khát":
            return "https://image.thanhnien.vn/1200x630/Uploaded/2021/wpxlcqjwq/2021_07_23/nuoc-ngot_tfeo.jpg";
        case "FastFoods":
            return "https://hoangminhdecor.com/wp-content/uploads/2020/11/fastfood.jpg";
        case "Hải Sản":
            return "https://pasgo.vn/Upload/anh-chi-tiet/nha-hang-mr-tom-american-hai-san-cajun-my-tran-dai-nghia-2-normal-2069579746006.jpg";
        case "Món Nhật":
            return "https://intertour.vn/uploads/media/news/acf0cb81-69ff-431a-830a-7ea8380391b2.jpg";
        case "Món Hàn":
            return "http://imgs.vietnamnet.vn/Images/vnn/2015/06/29/10/20150629103528-1.jpg";
        case "Món Âu-Mỹ":
            return "https://cafebiz.cafebizcdn.vn/162123310254002176/2021/12/12/photo-2-16392707819481450115646.jpg";
        case "Món Trung Quốc":
            return "https://dulichvietnam.com.vn/du-lich-trung-quoc/wp-content/uploads/2020/03/mon-an-trung-quoc-noi-tieng-mien-chua-trung-khanh-1.jpg";
        case "Món Đặc Biệt":
            return "https://image-us.24h.com.vn/upload/4-2020/images/2020-10-20/1603169108-398-thumbnail-width640height480.jpg";
        default:
            return "https://media.cooky.vn/images/blog-2016/nghe-thuat-trinh-bay-va-chup-anh-mon-an%208.jpg";
    }
}