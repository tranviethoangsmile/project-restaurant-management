
class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}

class Staff {
    constructor(id, fullName, phone, address, dob, status, deleted, user) {
        this.id = id;
        this.fullName = fullName;
        this.phone = phone;
        this.address = address;
        this.dob = dob;
        this.status = status;
        this.deleted = deleted;
        this.user = user;
    }
}

let user = new User();
let staff = new Staff();

init = function () {
    getAllUser();
}

$("#btn-add").on("click", function () {
    // delete staff.id;
    delete staff.status;
    delete staff.deleted;
    // delete user.id;
    user.username = $('#username').val();
    user.password = $('#password').val();
    staff.fullName = $('#name').val();
    staff.address = $('#address').val();
    staff.phone = $('#phone').val();
    staff.dob = $('#dob').val();
    staff.user = user;


    // let obj = {
    //     "username" : $('#username').val(),
    //     "password" : $('#password').val(),
    //     "fullName" : $('#name').val(),
    //     "address" : $('#address').val(),
    //     "phone" : $('#phone').val(),
    //     "dob" : $('#dob').val()
    // }
    $.ajax({
        url: "http://localhost:8080/api/staff",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(staff),
        success: function (result) {
            $("#listUser tbody").prepend(`
                <tr id="staff_${result.id}" style="text-align: center">
                    <td>${result.id}</td>
                    <td>${result.fullName}</td>
                    <td>${result.phone}</td>
                    <td>${result.dob}</td>
                    <td>${result.address}</td>
                    <td>
                        <span class="badge ${result.status ? 'bg-success' : 'bg-warning'}">${result.status ? 'Đi làm' : 'Nghỉ làm'}</span>
                    </td>
                    <td>
                        <a href='javascript:;' class='btn change-status ${result.status ? 'btn-success' : 'btn-secondary'}'
                            title='${result.status ? 'inactive' : 'active'} employee' data-id="${result.id}">
                        <i class='fa ${result.status ? 'fa-lock' : 'fa-lock-open'}'>Change</i>
                        </a>
                    
                         <a href='javascript:;' class='edit btn btn-warning' title='edit staff' data-id="${result.id}">
                        <i class='fa fa-edit'>Edit</i>
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

function changeSattus() {

    Swal.fire({
        title: `${status ? 'Inactive' : 'Active'}  Staff?`,
        text:  `Do you want to ${status ? 'inactive' : 'active'} the staff now?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Change status!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `api/staff/change-status/` + staff.id,
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: function (result) {
                    console.log(result);
                    $("#staff_"+staff.id).replaceWith(`
                     <tr id="staff_${result.id}" style="text-align: center">
                    <td>${result.id}</td>
                    <td>${result.fullName}</td>
                    <td>${result.phone}</td>
                    <td>${result.dob}</td>
                    <td>${result.address}</td>
                    <td>
                        <span class="badge ${result.status ? 'bg-success' : 'bg-warning'}">${result.status ? 'Đi làm' : 'Nghỉ làm'}</span>
                    
                        
                    </td>
                    <td>
                        <a href='javascript:;' class='btn change-status ${result.status ? 'btn-success' : 'btn-secondary'} btn-sm'
                            title='${result.status ? 'inactive' : 'active'} employee' data-id="${result.id}">
                        <i class='fa ${result.status ? 'fa-lock' : 'fa-lock-open'}'>Change</i>
                        </a>
                    
                         <a href='javascript:;' class='edit btn btn-warning btn-sm' title='edit staff' data-id="${result.id}">
                        <i class='fa fa-edit'>Edit</i></a>
                        
                    </a>
                
                    </td>
                </tr>`)

                    Swal.fire(
                        'Changed!',
                        'Your status has been change.',
                        'success'
                    )
                    $(".change-status").on("click",function()  {
                        staff.id = $(this).data("id");
                        console.log("id: " + staff.id);
                        changeSattus();
                    })
                }
            })

        }
    })


}



$("#btnEdit").on("click", function (){
    update();
})

function update() {

    delete staff.status;
    delete staff.deleted;

    staff.id = $("#id").val();
    staff.fullName = $('#nameUp').val();
    staff.address = $('#addressUp').val();
    staff.phone = $('#phoneUp').val();
    staff.dob = $('#dobUp').val();
    $.ajax({
        url: "http://localhost:8080/api/staff/edit/" + staff.id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(staff),
        success: function (result) {
            console.log(result);
            $('#listUser a[data-id="' + staff.id + '"]').parent().parent().replaceWith(`
                <tr id="user_${result.id}" style="text-align: center">
                    <td>${result.id}</td>
                    <td>${result.fullName}</td>
                    <td>${result.phone}</td>
                    <td>${result.dob}</td>
                    <td>${result.address}</td>
                    <td>
                        <span class="badge ${result.status ? 'bg-success' : 'bg-warning'}">${result.status ? 'Đi làm' : 'Nghỉ làm'}</span>
                    
                        
                    </td>
                    <td>
                        <a href='javascript:;' class='btn change-status ${result.status ? 'btn-success' : 'btn-secondary'} btn-sm'
                            title='${result.status ? 'inactive' : 'active'} employee' data-id="${result.id}">
                        <i class='fa ${result.status ? 'fa-lock' : 'fa-lock-open'}'>Change</i>
                        </a>
                    
                         <a href='javascript:;' class='edit btn btn-warning btn-sm' title='edit staff' data-id="${result.id}" data-bs-toggle="modal" data-bs-target="#addUserModal">
                        <i class='fa fa-edit'>Edit</i>
                        </a>
                        
                    </td>
                </tr>
            `);

            $(".edit").on("click", function (e) {
                e.preventDefault();
                let id = $(this).data("id");
                $("#addUserModal").show();
                getUser(id);
            })

            $('#EditUserModal').modal("hide");
            $('#frmCreateEmployee')[0].reset();


        }
    })
}

getAllUser = function () {
    $.ajax({
        url: "http://localhost:8080/api/staff",
        type: "GET"
    }).done(function (data) {
        console.log(data);
        let str = '';

        $.each(data, function (index, item) {

            str = `           
                        <tr id="staff_${item.id}" style="text-align: center"> 
                            <td>${item.id}</td>
                            <td>${item.fullName}</td>
                            <td>${item.phone}</td>
                            <td>${item.dob}</td>
                            <td>${item.address}</td>                           
                            <td>
                                <span class="badge ${item.status ? 'bg-success' : 'bg-warning'}">${item.status ? 'Đi làm' : 'Nghỉ làm'}</span>
                    
                                
                            </td>
                            <td>
                                <a href='javascript:;' class='btn change-status ${item.status ? 'btn-success' : 'btn-secondary'} btn-sm'
                                    title='${item.status ? 'inactive' : 'active'} employee' data-id="${item.id}">
                                <i class='fa ${item.status ? 'fa-lock' : 'fa-lock-open'} '>Change</i>
                                </a>
                            
                                <a href='javascript:;' class='edit btn btn-warning btn-sm' title='edit staff' data-id="${item.id}">
                                <i class='fa fa-edit'>Edit</i></a>
                                
                            </td>
                        </tr>
                    `;
            $("#listUser tbody").prepend(str);
        });
        console.log("hello");
        $(".change-status").on("click",function()  {
            staff.id = $(this).data("id");

            changeSattus();
        })

        $(".edit").on("click", function (e) {
            e.preventDefault();
            let id = $(this).data("id");
            $("#addUserModal").show();
            getUser(id);
        })
    })
}

getUser = function(id) {
    $.ajax({
        url: "http://localhost:8080/api/staff/" + id,
        type: "GET"
    }).done(function (data) {
        console.log(data);
        $("#nameUp").val(data.fullName);
        $("#addressUp").val(data.address);
        $("#phoneUp").val(data.phone);
        $("#dobUp").val(moment(data.dob, "YYYY-MM-DD").format("YYYY-MM-DD"));
    })
}

$(document).ready(function () {
    $('#af-preloader').delay(500).fadeOut('slow')
    // init();
    getAllUser();
});