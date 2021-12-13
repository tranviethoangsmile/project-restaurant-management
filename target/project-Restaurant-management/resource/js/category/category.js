    class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

let category = new Category();

$("#btnCreate").on("click", function () {
    create();
})

$("#btnUpdate").on("click", function () {
    update();
})

function handleDelete() {
    $("table tbody tr").on("click", ".delete", function () {
        let id = $(this).data("id");
        Swal.fire({
            title: 'Bạn có chắc?',
            text: "Bạn muốn xoá thông tin danh mục này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng, xoá ngay!',
            cancelButtonText: 'Huỷ'
        }).then((result) => {
            if (result.isConfirmed) {

                $.ajax({
                    headers: {
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    url: "/api/category/delete/" + id,
                    type: "GET"
                }).done(function (resp) {

                    console.log(resp)

                    if (resp === true) {

                        $("#tr_" + id).remove();

                        Swal.fire(
                            'Đã xoá!',
                            'Thông tin sản phẩm đã được xoá khỏi danh mục.',
                            'success'
                        )
                    } else {
                        alert("UnSuccess deleted")
                    }

                }).fail(function () {
                    alert("UnSuccess deleted 2")
                });

            }
        })

    });
}

function handleEdit() {
    $("table tbody tr").on("click", ".edit", function () {
        let id = $(this).data("id");
        $.ajax({
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            url: "/api/category/" + id,
            type: "GET"
        }).done(function (resp) {
            $("#updateModal").modal("show");
            $("#idE").val(resp.id);
            $("#nameE").val(resp.name);
        }).fail(function () {
            alert("ERROR")
        });
    })
}

function create() {
    if($("#createCategory").valid()){
        Swal.fire({
            title: 'Bạn muốn lưu lại Danh Mục này không?',
            showDenyButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Huỷ'
        }).then((result) => {
            if (result.isConfirmed) {
                category.id = $("#id").val();
                category.name=$("#name").val()
                $.ajax({
                    headers: {
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    url: "/api/category/create",
                    type: "POST",
                    data: JSON.stringify(category)

                }).done(function (resp) {
                    $("#name").val('');
                    let str = '';

                    str = `
                    <tr id="tr_${resp.id}">
                            <th scope="row">${resp.id}</th>
                            <td>${resp.name}</td>
                            <td>
                                <button type="button" data-toggle="modal" data-target="#updateModal" class="btn btn-outline-primary edit"
                                    data-id="${resp.id}"
                                >
                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    Sửa
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-outline-danger delete" data-id="${resp.id}">
                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                    Xoá
                                </button>
                            </td>

                        </tr>
                `;

                    $("#tbList").append(str);


                    handleEdit();

                    handleDelete();

                }).fail(function () {
                    alert("ERROR")
                });
            } else if (result.isDenied) {
                Swal.fire('Thông tin bàn chưa được lưu', '', 'info')
            }
        })

    }

}

function update() {

    category.id = $("#idE").val();
    category.name = $("#nameE").val();

    $.ajax({
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        url: "/api/category/update",
        type: "POST",
        data: JSON.stringify(category)
    }).done(function (resp) {
        let str = '';

        str = `
                    <tr id="tr_${resp.id}">
                        <th scope="row">${resp.id}</th>
                        <td>${resp.name}</td>
                        <td>
                            <button type="button" data-toggle="modal" data-target="#updateModal" class="btn btn-outline-primary edit"
                                data-id="${resp.id}"
                            >
                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                Sửa
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-danger delete" data-id="${resp.id}">
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                                Xoá
                            </button>
                        </td>
                    </tr>
                `;
        $("#tr_"+ category.id).replaceWith(str);


        handleEdit();

        handleDelete();

    }).fail(function () {
        alert("ERROR")
    });
}

function getAllCategory() {
    return $.ajax({
        url: "/api/category",
        type: "GET"
    }).done(function (resp) {

        let str = '';

        $.each(resp, function(index, item) {
            str = `
                    <tr id="tr_${item.id}">
                        <th scope="row">${item.id}</th>
                        <td>${item.name}</td>
                        <td>
                            <button type="button" data-toggle="modal" data-target="#updateModal" class="btn btn-outline-primary edit"
                                data-id="${item.id}"
                            >
                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                Sửa
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-danger delete" data-id="${item.id}">
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                                Xoá
                            </button>
                        </td>
                    </tr>
                `;
            $("#tbList").append(str);
        })

        handleEdit();

        handleDelete();
    }).fail(function () {
        alert("ERROR")
    });
}

init = function () {
    getAllCategory();

    $("#updateModal").on("hidden.bs.modal", function () {
        $(".modal-backdrop.show").removeClass("show");
    });

}

<!--    template-->
$(document).ready(function () {
    $('#af-preloader').delay(500).fadeOut('slow')
    init();
});