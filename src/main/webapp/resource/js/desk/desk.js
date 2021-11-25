init = function () {
    getAllDeskForOption();
}

//Tạo bàn
createTable = function () {
    if ($("#deskCreate").valid()) {
        Swal.fire({
            title: 'Bạn muốn lưu lại bàn này không?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                let desk = {
                    name: $("#deskName").val(),
                    status: false
                }
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    url: "/api/desk/create",
                    type: "POST",
                    data: JSON.stringify(desk)
                }).done(function (deskResp) {
                    $("#deskName").val("");
                    if (deskResp != null) {
                        $.notify("Tạo bàn thành công", "success");
                        getAllDeskForOption();
                    }
                }).fail(function () {
                    $.notify("Tạo bàn không thành công", "error");
                })
            } else if (result.isDenied) {
                Swal.fire('Thông tin bàn chưa được lưu', '', 'info')
            }
        })
    }
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
        console.log(data)
        $(".desk-list .row").empty();
        $(".wizard-navigation ul").empty();
        $.each(data, function (index, item) {
            if (!item.status) {
                $(".desk-list .row").append(
                    `
                <div class="col-xl-2">
                    <button onclick="deskModify(${item.id})" 
                        type="button" 
                        style="border-radius: 35%; width: 110%" 
                        class="btn btn-outline-secondary"> 
                            ${item.name}
                    </button>                            
                </div>
                `
                )
            }

            if (item.status) {
                $(".wizard-navigation ul").append(
                    `
                    <li>
                    <a data-toggle = "tab" onclick = "getOrderDetailOfDesk(${item.id})" style=" margin: 10px" class="btn btn-success">${item.name}</a>
                    </li>
                    `
                )
            }

        })
    }).fail(function () {
        $.notify("Tải danh sách bàn không thành công", "error");
    })
}

// thông tin bàn - thay đổi status - xoá - sửa
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
                            <button onclick="changerStatus(${deskResp.id})" style="width: 75px; text-align: center" title="Thay đổi trạng thái"  class="btn btn-primary"><i class="fa fa-exchange-alt"></i></button>
                            <button onclick="editDeskInfo(${deskResp.id})" style="width: 75px" class="btn btn-success" title="Sửa thông tin bàn"><i class="fa fa-edit"></i></button>
                            <button onclick="deleteDesk(${deskResp.id})" style="width: 75px" title="Xoá bàn" class="btn btn-danger"><i class="fa fa-trash"></i></button>
                    </div>
                                                                    
                `
        )

    }).fail(function () {
        $.notify("Tải bàn không thành công", "error");
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
                $("#desk_modify_edit").modal("hide");
                $.notify("Sửa thành công", "success");
                getAllDeskForOption();
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


//thay đổi trạng thái bàn

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
        console.log(orderResp);
    }).fail(function (){
        $.notify("Tạo order Không thành công")
    })
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


//Nhận thông tin order của bàn
getOrderDetailOfDesk = function (id) {
    $("#product_list_of_desk").empty();
    $("#total").empty();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/orderdetail/orderdetailofdeskid/" + id,
        type: "GET",
    }).done(function (orderdetail) {
        let total = 0;
        // $("#desk_name").text(orderdetail.order.desk.name)
        $.each(orderdetail,function (index,item){
            total += item.unitPrice;
            $("#product_list_of_desk").prepend(
                `
                <tr>
                    <td>${item.product.name}</td>
                    <td>${item.product.price}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unitPrice}</td>               
                </tr>            
               `
            );
        })
        $("#total").append(
            `
                <tr>
                    <td colspan="3">Tổng</td>
                    <td>${total} vnđ</td>
                 </tr>
                 <tr>
                    <td style="text-align: right; margin-right: 30px" colspan="4"><button class="btn btn-success">Thanh toán</button></td>                    
                 </tr>
            `
        )

    }).fail(function () {
        $.notify("Tải thông tin bàn không thành công", "error");
    })
}
$(document).ready(function () {
    $('#af-preloader').delay(500).fadeOut('slow');
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    init();
})