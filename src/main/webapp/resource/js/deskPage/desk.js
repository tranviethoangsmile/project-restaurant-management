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


//Get desk
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
            $(".desk-list .row").append(
                `
                <div class="col-xl-2">
                    <button onclick="deskModify(${item.id})" 
                        id="desk-modify${item.id}" type="button" 
                        style=" margin: 10px; border-radius: 100%" 
                        class="btn btn-${item.status ? 'danger' : 'success'}"> 
                            ${item.name}
                    </button>                            
                </div>
                `
            )
            if (item.status) {
                $(".wizard-navigation ul").append(
                    `
                    <li>
                    <a data-toggle = "tab" onclick = "getDeskInfo(${item.id})" style=" margin: 10px" class="btn btn-success">${item.name}</a>
                    </li>
                    `
                )
            }

        })
    }).fail(function () {
        $.notify("Tải danh sách bàn không thành công", "error");
    })
}

//chỉnh sửa thông tin bàn
deskModify = function (id) {
    $("#desk-modify" + id).popover({
        placement: 'bottom',
        html: true,
        title : '<span class="text-info"><strong>Tuỳ Chọn</strong></span>',
        body : '<button type="button" onclick="aler()">ok</button>'
    });
}




//Nhận thông tin order của bàn
getDeskInfo = function (id) {
    $(".tab-content").empty();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/orderdetail/orderdetailofdeskid/" + id,
        type: "GET",
    }).done(function (deskInfo) {
        console.log(deskInfo);
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