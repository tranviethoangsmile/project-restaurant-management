$(document).ready(function () {
    $('#af-preloader').delay(500).fadeOut('slow')
    init();
});

init = function () {
    getAllCategory();
    getAllProduct();
}

//Xoá sản phẩm
deleteProduct = function (id) {
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
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    url: "/api/product/delete/" + id,
                    type: "GET"
                }).done(function (resp) {
                    if (resp) {
                        getAllProduct();
                        Swal.fire(
                            'Đã xoá!',
                            'Sản phẩm đã được xoá khỏi danh mục.',
                            'success'
                        )
                    } else {
                        alert("Xoá không thành công")
                    }

                }).fail(function () {
                    alert("Xoá không thành công")
                });

            }
        })
}

//Hiển thị modal sửa
handleEdit = function (id) {
    $("#updateModal").modal("show");
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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
}

//update product

updateProduct = function () {
    let category = {
        id: $("#categoryUp").val(),
        name: $("#categoryUp :selected").text()
    }
    let product = {
        id: $("#idUp").val(),
        name: $("#nameUp").val(),
        price: $("#priceUp").val(),
        status: $('#statusUp').is(":checked"),
        category: category
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/product/update",
        type: "POST",
        data: JSON.stringify(product)
    }).done(function (resp) {
        if(resp != null) {
            $("#updateModal").modal("hide");
            init();
            Swal.fire(
                'Đã cập nhật!',
                'success'
            )
        }
    }).fail(function () {
        alert("ERROR")
    });
}

//Tạo product
createProduct = function () {
    if ($("#createProduct").valid()) {
        Swal.fire({
            title: 'Bạn muốn lưu lại món ăn này không?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                let category = {
                    id: $("#category").val(),
                    name: $("#category :selected").text()
                }
                let product = {
                    name: $("#name").val(),
                    price: $("#price").val(),
                    category: category
                }
                console.log(product);
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    url: "/api/product/create",
                    type: "POST",
                    data: JSON.stringify(product)

                }).done(function (resp) {
                    if (resp != null) {
                        getAllProduct();
                        $("#name").val('');
                        $("#price").val('');
                    }


                }).fail(function () {
                    alert("ERROR")
                });
            } else if (result.isDenied) {
                Swal.fire('Thông tin bàn chưa được lưu', '', 'info')
            }
        })

    }

}

//Nhận danh sách danh mục
getAllCategory = function () {
    $("#category").empty();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/api/category/category",
        type: "GET"
    }).done(function (categories) {
        $.each(categories, function (index, category) {
            $("#category").append(
                `
           <option value="${category.id}">${category.name}</option>
           `
            )
            $("#categoryUp").append(
                `
                <option value="${category.id}">${category.name}</option>
                `
            );

            $("#categories").append(
                `
                <option value="${category.id}">${category.name}</option>
                `
            )
        })
    }).fail(function () {
        $.notify("không tải được danh mục", "error")
    });
}

//Nhận danh sách món ăn theo danh mục

$("#categories").on("change",function () {
   let value = $("#categories :selected").val();
   if(value === 'all') {
       getAllProduct();
   }else {
        getProductByCategoryId(value);
   }
})

getProductByCategoryId = function (id) {
    $.ajax({
        url: "/api/product/category/" + id,
        type: "GET"
    }).done(function (resp) {
        $("#listProduct").empty();
        $.each(resp, function (index, item) {
            $("#listProduct").append(
                `

                   <tr>
                         <td>${item.id}</td>
                         <td>${item.name}</td>
                         <td>${formatNumber(item.price)}</td>
                         <td><button type="button" onclick="changerStatusOfProduct(${item.id})" class="btn btn-${item.status ? "danger" : "success"}">${item.status ? "hết hàng" : "còn hàng"}</button></td>
                         <td>${item.category.name}</td>
                         <td>
                                 <button onclick="handleEdit(${item.id})" type="button" data-toggle="modal" data-target="#updateModal" class="btn btn-primary"
                                     data-id="${item.id}"
                                 >
                                     <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                     Sửa
                                 </button>
                             </td>
                             <td>
                                 <button type="button" class="btn btn-outline-danger delete" onclick="deleteProduct(${item.id})">
                                     <i class="fa fa-trash-o" aria-hidden="true"></i>
                                    Xoá
                                 </button>
                             </td>
                     </tr>
                `
            )
        })
    }).fail(function () {
        $.notify("tải danh sách lỗi","error")
    });
}



//Nhận danh sách sản phẩm
getAllProduct = function () {
    $.ajax({
        url: "/api/product",
        type: "GET"
    }).done(function (resp) {
        $("#listProduct").empty();
        $.each(resp, function (index, item) {
            $("#listProduct").append(
                `

                   <tr>
                         <td>${item.id}</td>
                         <td>${item.name}</td>
                         <td>${formatNumber(item.price)}</td>
                         <td><button type="button" onclick="changerStatusOfProduct(${item.id})" class="btn btn-${item.status ? "danger" : "success"}">${item.status ? "hết hàng" : "còn hàng"}</button></td>
                         <td>${item.category.name}</td>
                         <td>
                                 <button onclick="handleEdit(${item.id})" type="button" data-toggle="modal" data-target="#updateModal" class="btn btn-primary"
                                     data-id="${item.id}"
                                 >
                                     <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                     Sửa
                                 </button>
                             </td>
                             <td>
                                 <button type="button" class="btn btn-outline-danger delete" onclick="deleteProduct(${item.id})">
                                     <i class="fa fa-trash-o" aria-hidden="true"></i>
                                    Xoá
                                 </button>
                             </td>
                     </tr>
                `
            )
        })
    }).fail(function () {
        $.notify("Không tải được danh sách món ăn", "error")
    });
}




// //Thay đổi trạng thái sản phẩm
changerStatusOfProduct = function (id) {
    Swal.fire({
        title: 'Thay đổi trạng thái',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Thay đổi'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: "/api/product/changerstatus/" + id,
                type: "PUT"
            }).done(function (product) {
                if (product != null) {
                    getAllProduct();
                    $.notify("Thay đổi thành công", "success");
                }
            }).fail(function () {
                $.notify("Trạng thái chưa thay đổi", "error");
            })
        }
    })
}

//format Number
function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}