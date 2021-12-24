init = function () {
    getAllDeskForOption();
}

//Tạo bàn
createDesk = function () {
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
                        style="border-radius: 35%; width: 100px"
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

//Nhận order bằng desk_id.

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

//test home
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
        $("#product_list_of_desk").empty();
        let btn_pay = $("#total")
        btn_pay.empty();
        let total = 0;
        let unitPrice = 0;
        $.each(orderdetails, function (index, orderDetail){
            unitPrice = (orderDetail.productPrice * orderDetail.quantity)
            total += unitPrice;
            $("#product_list_of_desk").append(
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

//end test home

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
                      <td style="text-align: right; margin-right: 30px" colspan="4"><button type="button" onclick="billPrint(${desk_id})" class="btn btn-success" >In Hoá Đơn</button></td>
                      <td style="text-align: right; margin-right: 30px" colspan="4"><button type="button" onclick="billNotPrint(${desk_id})" class="btn btn-success">Không in hoá đơn</button></td>
                 </tr>
            `
        )
        console.log(order_id);
        $("#desk_name_bill").text(desk_name)
        $("#order_id").val(order_id);
    }).fail(function () {
        $.notify("Tải thông tin bàn không thành công", "error");
    })
}

function downloadPDFWithPDFMake() {

    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    var id = $("#desk_name_bill").text();

    var time = dateTime;

    var tableHeaderText = [...document.querySelectorAll('#styledTable thead tr th')].map(thElement => ({ text: thElement.textContent, style: 'tableHeader' }));

    var tableRowCells = [...document.querySelectorAll('#styledTable tbody tr td')].map(tdElement => ({ text: tdElement.textContent, style: 'tableData' }));
    var tableDataAsRows = tableRowCells.reduce((rows, cellData, index) => {
        // index is th
        if (index % 5 === 0) {
            rows.push([]);
        }

        rows[rows.length - 1].push(cellData);
        return rows;
    }, []);

    var docDefinition = {
        header:[ { text: 'PI MẬP', alignment: 'center' },
            { text: '225 tang bat ho, thanh pho hue', italics: true, fontSize: 10,  alignment: "center"},
            { text: 'HOTLINE: 0353168699', italics: true, fontSize: 10,  alignment: "center"},

        ],


        // footer: function(currentPage, pageCount) { return ({ text: `Page ${currentPage} of ${pageCount}`, alignment: 'center' }); },
        content: [
            { text: `bàn: ` + id, italics: true, fontSize: 10,  alignment: "life"},
            { text: time, italics: true, fontSize: 10,  alignment: "life"},


            {
                layout: 'lightHorizontalLines',
                table: {
                    headerRows: 1,
                    body: [
                        tableHeaderText,
                        ...tableDataAsRows,
                    ]
                },
            },
        ],

    };
    pdfMake.createPdf(docDefinition).open();

}

// inhoadon
billPrint = function (id){
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
        downloadPDFWithPDFMake();
        console.log(billResp);
        changerStatusAfterPayment(billResp.desk_id);
        $("#product_list_of_desk").empty();
        $("#total").empty();
        $("#desk_name_bill").text('');
        $.notify("Đã thanh toán", "success");
    }).fail(function (){
        $.notify("Thanh toán lỗi", "error");
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
        console.log(billResp);
        changerStatusAfterPayment(billResp.desk_id);
        $("#product_list_of_desk").empty();
        $("#total").empty();
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

$(document).ready(function () {
    $('#af-preloader').delay(500).fadeOut('slow');
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    init();
})
