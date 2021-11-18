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
                  name: $("#tableName").val(),
                  status: $("#status").is(":checked")
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
                  name: $("#tableName").val("");
                  if(deskResp != null){
                      $.notify("Tạo bàn thành công", "success");
                  }
                  getAllDesk();
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
        $.each(data, function (index,item){
            $(".wizard-navigation ul").append(
                `
                 <li><a href="#${item.id}" data-toggle="tab">${item.name}</a></li>
                `
            )
            $(".tab-content").append(
                `                
                   <div class="tab-pane" id="${item.id}">
		                 <div class="row">			                            
							<h1>${item.name}</h1>
		           </div>
                `
            )
        })
    }).fail(function (){
        $.notify("Tải danh sách bàn không thành công", "error");
    })
}

