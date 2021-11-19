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
    getAllDesk ();
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
                  name: $("#deskName").val("");
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


//Get Table
getAllDeskForOption = function () {
    $.ajax({
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        url: "/api/desk/getalldesk",
        type: "GET",
    }).done(function (data) {
        $("#desk-online").empty();
        $.each(data,function (index,item){
            $("#desk-online").append(
                `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td><i class='fa ${item.status ? 'fa-lock' : 'fa-lock-open'}'></i></td>
                <td>
                    <a class="btn btn-success"><i class="fa fa-edit"></i>Sửa</a>
                    <a class="btn btn-default"><i class="fa fa-trash"></i>Xoá</a>
                </td>
            </tr>
            `
            )
        })
        $("#desk-online-list").DataTable();
    }).fail(function (){
        $.notify("Tải danh sách bàn không thành công", "error");
    })
}

getAllDesk = function () {
    $.ajax({
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        url: "/api/desk/getalldesk",
        type: "GET",
    }).done(function (data) {
        $(".wizard-navigation ul").empty();
        $(".tab-content").empty();
        $.each(data, function (index,desk){
            if(desk.status !== true){
                $(".wizard-navigation ul").append(
                    `
                 <li><a href="#${desk.id}" data-toggle="tab">${desk.name}</a></li>
                `
                )
                $(".tab-content").append(
                    `                
                   <div class="tab-pane" id="${desk.id}">
		                 <div class="row">			                            
							<h1>${desk.name}</h1>
		           </div>
                   `
                )
            }

        })
    }).fail(function (){
        $.notify("Tải danh sách bàn không thành công", "error");
    })
}

