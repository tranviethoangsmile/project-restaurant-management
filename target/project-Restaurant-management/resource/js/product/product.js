class Product {
    constructor(id, name, price, status, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.status = status;
        this.category = category;
    }
}

class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

let product = new Product();
let category = new Category();

$("#btnCreate").on("click", function () {
    createProduct();
})

$("#btnUpdate").on("click", function () {
    updateProduct();
})

function handleDelete() {
    $("table tbody tr").on("click", ".delete", function () {
        let id = $(this).data("id");

        Swal.fire({
            title: 'Bạn có chắc?',
            text: "Bạn muốn xoá sản phẩm khỏi danh mục!",
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
                    url: "/api/product/delete/" + id,
                    type: "GET"
                }).done(function (resp) {

                    console.log(resp)

                    if (resp === true) {

                        $("#tr_" + id).remove();

                        Swal.fire(
                            'Đã xoá!',
                            'Sản phẩm đã được xoá khỏi danh mục.',
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

        console.log("id = " + id)
        $("#updateModal").modal("show");

        $.ajax({
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            url: "/api/product/" + id,
            type: "GET"
        }).done(function (resp) {
            $("#idUp").val(resp.id);
            $("#nameUp").val(resp.name);
            $("#priceUp").val(resp.price);
            $('#statusUp').prop('checked', resp.status);
            $("#categoryUp").val(resp.category.id);
        }).fail(function () {
            alert("ERROR")
        });
    })
}

function createProduct() {
    category.id = $("#category").val();
    category.name=$("#category :selected").text();

    product.name = $("#name").val();
    product.price = $("#price").val();
    product.category = category
    console.log(product);

    $.ajax({
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        url: "/api/product/create",
        type: "POST",
        data: JSON.stringify(product)

    }).done(function (resp) {

        let str = '';

        str = `
                    <tr id="tr_${resp.id}">
                            <th scope="row">${resp.id}</th>
                            <td>${resp.name}</td>
                            <td>${resp.price}</td>
                            <td>${resp.status}</td>
                            <td>${resp.category.name}</td>
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

        $("#tbListProduct").prepend(str);


        handleEdit();

        handleDelete();

    }).fail(function () {
        alert("ERROR")
    });
}

function updateProduct() {

    product.id = $("#idUp").val();
    product.name = $("#nameUp").val();
    product.price = $("#priceUp").val();
    product.status = $('#statusUp').is(":checked");
    product.category = {
        id: $("#categoryUp").val(),
        name: $("#categoryUp :selected").text()
    };
    console.log("đã vào" + product);

    $.ajax({
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        url: "/api/product/update",
        type: "POST",
        data: JSON.stringify(product)
    }).done(function (resp) {

        let str = '';

        str = `
                    <tr id="tr_${resp.id}">
                        <th scope="row">${resp.id}</th>
                        <td>${resp.name}</td>
                        <td>${resp.price}</td>
                        <td>${resp.status}</td>
                        <td>${resp.category.name}</td>
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
        $("#tr_"+ product.id).replaceWith(str);
        $("#updateModal").modal("hide");

        handleEdit();

        handleDelete();

    }).fail(function () {
        alert("ERROR")
    });
}
function getListProduct() {
    $.ajax({
        url: "/api/product",
        type: "GET"
    }).done(function (resp) {

        let str = '';

        $.each(resp, function(index, item) {



            console.log(item);
            str = `
                        <tr id="tr_${item.id}">
                            <th scope="row">${item.id}</th>
                            <td>${item.name}</td>
                            <td>${item.price}</td>
                            <td>${item.status}</td>
                            <td>${item.category.name}</td>
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
            $("#tbListProduct").prepend(str);
        });


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
                        <option value="${item.id}">${item.name}</option>
                    `;
            $("#category").append(str);
            $("#categoryUp").append(str);
        })
    }).fail(function () {
        alert("ERROR")
    });
}


init = function () {
    getListProduct();
    getAllCategory();

    $("#showModal").on("click",function () {
        $("#updateModal").modal("show");
    })
}

$(document).ready(function () {
    $('#af-preloader').delay(500).fadeOut('slow')
    init();
});