$(document).ready(function () {
    $('#af-preloader').delay(500).fadeOut('slow')

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    init();
});

init = function () {
    // getAllDesk ();
    getAllDeskForOption();
}

//Tạo bàn
createTable = function () {
  if($("#deskCreate").valid()){
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
                      'Accept':'application/json',
                      'Content-Type':'application/json'
                  },
                  url: "/api/desk/create",
                  type: "POST",
                  data: JSON.stringify(desk)
              }).done (function (deskResp){
                 $("#deskName").val("");
                  if(deskResp != null){
                      $.notify("Tạo bàn thành công", "success");
                  }
                  getAllDesk();
                  getAllDeskForOption();
              }).fail(function (){
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
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        url: "/api/desk/getalldesk",
        type: "GET",
    }).done(function (data) {
        console.log(data)
        $(".desk-list .row").empty();
        $.each(data,function (index,item){
            $(".desk-list .row").append(
                `
                <div class="col-xl-2">
                    <h3>${item.name}</h3>
                    <a href="#${item.id}" data-toggle="tab" class="btn btn-success" onclick="getDeskInfo(${item.id})">Kiểm tra</a>
                </div>
                `
            )
        })
    }).fail(function (){
        $.notify("Tải danh sách bàn không thành công", "error");
    })
}

//Nhận thông tin của bàn
getDeskInfo = function (id) {
    $(".tab-content").empty();
    $.ajax({
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        url: "https://61960fa2902243001762fa1c.mockapi.io/api/orderdetail/orderdetail/" + id ,
        type: "GET",
    }).done(function (deskInfo){

        $(".tab-content").append(
            `
             <h1>${deskInfo.desk_id.name}</h1>
                            <a href="#" class="btn btn-${deskInfo.desk_id.status ? 'success' : 'danger'}">${deskInfo.desk_id.status ? 'Sẳn Sàng': 'Có khách'}</a>
                            <table class="table table-hover">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên món</th>
                                    <th>Giá</th>
                                    <th>SL</th>
                                    <th>Thành Tiền</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>${deskInfo.produc_id.id}</td>
                                    <td>${deskInfo.produc_id.name}</td>
                                    <td>${deskInfo.produc_id.price}</td>
                                    <td>${deskInfo.quantity}</td>
                                    <td>${deskInfo.price}</td>
                                </tr>
                                </tbody>
                                <tfoot>
                                <h2>Tổng Tiền : ${deskInfo.price}</h2>
                                </tfoot>
                            </table>
            `
        )
    }).fail(function (){
        $.notify("Tải thông tin bàn không thành công", "error");
    })
}

// getAllDesk = function () {
//     $.ajax({
//         headers: {
//             'Accept':'application/json',
//             'Content-Type':'application/json'
//         },
//         url: "/api/desk/getalldesk",
//         type: "GET",
//     }).done(function (data) {
//         // $(".tab-content").empty();
//         $.each(data, function (index,desk){
//                 $(".tab-content").append(
//                     `
//                    <div class="tab-pane" id="${desk.id}">
// 		                 <div class="row">
// 							<h1>${desk.name}</h1>
// 		           </div>
//                    `
//                 )
//         })
//     }).fail(function (){
//         $.notify("Tải danh sách bàn không thành công", "error");
//     })
// }
//Thiết kế lại gao diện desk - thay bảng danh sách list desk bằng giao diện ô vuông. Click vào ô sẽ xuất hiện thông tin bàn ở pần dưới.

