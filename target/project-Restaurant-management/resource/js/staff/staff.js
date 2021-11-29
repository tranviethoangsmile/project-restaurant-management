
init = function () {
    getAllUser();
}

$("#btn-add").on("click", function () {
        let user
        let day = $('select[name=selectDay] option').filter(':selected').val();
        let month = $('select[name=selectMonth] option').filter(':selected').val();
        let year = $('select[name=selectYear] option').filter(':selected').val();
        let dob = day + "/" + month + "/" + year;
        let obj = {
            "username" : $('#username').val(),
            "password" : $('#password').val(),
            "fullName" : $('#name').val(),
            "address" : $('#address').val(),
            "phone" : $('#phone').val(),
            "dob" : dob
    }
    $.ajax({
        url: "http://localhost:8080/api/user",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(obj),
        success: function (result) {
            $("#listUser tbody").prepend(`
                <tr id="user_${result.id}" style="text-align: center">
                    <td>${result.id}</td>
                    <td>${result.fullName}</td>
                    <td>${result.phone}</td>
                    <td>${result.dob}</td>
                    <td>${result.address}</td>
                    <td>
                        <button type="button" class="btn btn-primary plus"
                            data-id="${result.id}">
                             ${result.status ? "Đi làm":"Nghỉ"}
                        </button>
                    </td>
                    <td>
                         <a href='javascript:;' class='edit btn btn-primary btn-sm' title='edit student' data-id="${result.id}">
                        <i class='fa fa-edit'></i>
                    </a>
                    <a href='javascript:;' class='btn ${result.status ? 'btn-warning' : 'btn-secondary'} btn-sm'
                    title='${item.status ? 'inactive' : 'active'} student' onclick='student.changeStatus(${item.id}, ${item.status})'>
                        <i class='fa ${item.status ? 'fa-lock' : 'fa-lock-open'}'></i>
                    </a>
                    <a href='javascript:;' class='btn btn-danger btn-sm' title='remove student' onclick='student.remove(${item.id})'>
                        <i class='fa fa-trash'></i>
                    </a>
                    </td>
                </tr>
            `)
        }
    })

})

$("#listUser").on("click",".edit", function (){
    let id = $(this).data('id');
    $("#id").val(id);
    $("#EditUserModal").modal('show')
})

$("#btnEdit").on("click", function (){
    update();
})

function update() {
    let id = $("#id").val();
    let day = $('select[name=selectDayEdit] option').filter(':selected').val();
    let month = $('select[name=selectMonthEdit] option').filter(':selected').val();
    let year = $('select[name=selectYearEdit] option').filter(':selected').val();
    let dob = day + "/" + month + "/" + year;
    let obj = {
        "fullName" : $('#nameUp').val(),
        "address" : $('#addressUp').val(),
        "phone" : $('#phoneUp').val(),
        "dob" : dob
    }
    $.ajax({
        url: "http://localhost:8080/api/user/edit/"+id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(obj),
        success: function (result) {
            $("#listUser tbody").prepend(`
                <tr id="user_${result.id}" style="text-align: center">
                    <td>${result.id}</td>
                    <td>${result.fullName}</td>
                    <td>${result.phone}</td>
                    <td>${result.dob}</td>
                    <td>${result.address}</td>
                    <td>
                        <button type="button" class="btn btn-primary plus"
                            data-id="${result.id}">
                             ${result.status ? "Đi làm":"Nghỉ"}
                        </button>
                    </td>
                    <td>
                         <a href='javascript:;' class='edit btn btn-primary btn-sm' title='edit student' data-id="${result.id}" data-bs-toggle="modal" data-bs-target="#addUserModal">
                        <i class='fa fa-edit'>Edit</i>
                    </a>
                    <a href='javascript:;' class='btn ${result.status ? 'btn-warning' : 'btn-secondary'} btn-sm'
                    title='${item.status ? 'inactive' : 'active'} student' onclick='student.changeStatus(${item.id}, ${item.status})'>
                        <i class='fa ${item.status ? 'fa-lock' : 'fa-lock-open'}'></i>
                    </a>
                    <a href='javascript:;' class='btn btn-danger btn-sm' title='remove student' onclick='student.remove(${item.id})'>
                        <i class='fa fa-trash'></i>
                    </a>
                    </td>
                </tr>
            `)
        }
    })
}

getAllUser = function () {
    $.ajax({
        url: "http://localhost:8080/api/user",
        type: "GET"
    }).done(function (data) {
        let str = '';

        $.each(data, function (index, item) {

            str = `           
                        <tr id="user_${item.id}" style="text-align: center"> 
                            <td>${item.id}</td>
                            <td>${item.fullName}</td>
                            <td>${item.phone}</td>
                            <td>${item.dob}</td>
                            <td>${item.address}</td>                           
                            <td>
                                <button type="button" class="btn btn-primary plus"
                                    data-id="${item.id}">
                                     ${item.status ? "Đi làm":"Nghỉ"}
                                </button>
                            </td>
                            <td>
                              <a href='javascript:;' class='edit btn btn-warning btn-sm' title='edit student' data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#addUserModal">
                                <i class='fa fa-edit'>Edit</i>
                            </td>
                        </tr>
                    `;
            $("#listUser tbody").prepend(str);
        });
    })
}

$(document).ready(function () {
    $('#af-preloader').delay(500).fadeOut('slow')
    // init();
    getAllUser();
});