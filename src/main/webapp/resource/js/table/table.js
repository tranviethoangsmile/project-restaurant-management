$(document).ready(function () {
    $('#af-preloader').delay(500).fadeOut('slow')

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});

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
                  if(deskResp != null){
                      $.notify("Tạo bàn thành công", "success");
                  }
              }).fail(function (){
                  $.notify("Tạo bàn không thành công", "error");
              })
          } else if (result.isDenied) {
              Swal.fire('Thông tin bàn chưa được lưu', '', 'info')
          }
      })
  }
}

//viết api nhận bàn về lúc truy cập và hiển thị ửo mục danh sách bàn.

