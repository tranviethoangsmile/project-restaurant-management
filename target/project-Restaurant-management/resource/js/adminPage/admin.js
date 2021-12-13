$(document).ready(function () {
    $('#af-preloader').delay(500).fadeOut('slow')
    init();
});
//convert date
convert = function (value) {
    let date = new Date(value);
    return date.toLocaleString();
}

//format Number
function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

init = function () {
    chartStatistics();
    getAllBill();
}

getAllBill = function () {
    $.ajax({
        url: "/api/bill/getallbill",
        type: "GET",
    }).done(function (bills){
        console.log(bills);
        $("#list-bill").empty();
        $.each(bills,function (index,bill){
            $("#list-bill").append(
                `
                <tr>
                    <td>${index + 1}</td>
                    <td>${convert(bill.createAt)}</td>
                    <td>${bill.customerName}</td>
                    <td>${formatNumber(bill.total)} vnđ</td>
                    <td><button onclick="billDetail(${bill.order_id})" class="btn btn-success">Xem chi tiết</button></td> 
                </tr>
                `
            )
        })
        $('#list-bill-show').DataTable();
    }).fail(function (){
        $.notify("không tải được danh sách bills","error")
    })
}

billDetail = function (id){
    $.ajax({
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        url: "/api/orderdetail/getorderdetailbyorderid/" + id,
        type: "GET",
    }).done(function (orderDetailResp){
        $("#billDetail").modal("show");
        $("#bill-list-detail").empty();
        $.each(orderDetailResp,function (index,orderdetail){
            $("#bill-list-detail").append(
                `
                <tr>
                    <td>${index + 1}</td>
                    <td>${orderdetail.productName}</td>
                    <td>${orderdetail.productPrice}</td>
                    <td>${orderdetail.quantity}</td>
                    <td>${formatNumber(orderdetail.unitPrice)} vnđ</td>
                </tr>
                `
            )
        })
    }).fail(function(){
        $.notify("không tải được danh sách", "")
    })
}

//Thống kê
chartStatistics = function () {
    $.ajax({
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        url: "/api/bill/getallbill",
        type: "GET",
    }).done (function (data) {
        var xValues = [];
        $.each(data,function (index,item) {
            xValues[index] = `${convert(item.createAt)}`
        })
        console.log(xValues)
        var yValues = [];
        $.each(data,function (index,item){
            yValues[index] = `${item.total}`
        })
        console.log(yValues);
        var barColors =  "orange";
        new Chart("myChart", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                legend: {display: false},
                title: {
                    display: true,
                    text: "Thống kê doanh thu"
                }
            }
        });
    }).fail(function (){
        alert("fail");
    })
}

//Nhận danh sách category
// $("all").on("click",function (){
//     getAllProduct();
// })
// getAllCategory = function () {
//     $.ajax({
//         headers: {
//             'Accept':'application/json',
//             'Content-Type':'application/json'
//         },
//         url: "/api/category/category",
//         type: "GET"
//     }).done(function (resp) {
//         $("#listCategory").empty();
//         $.each(resp,function (index,item){
//             $("#listCategory").append(
//                 `
//                     <button type="button" class="btn btn-success" onclick="getAllProductOfCategory(${item.id})">${item.name}</button>
//                 `
//             )
//         })
//     }).fail(function () {
//         $.notify("không tải được danh mục","error")
//     });
// }
//
// //Nhận danh sách sản phẩm
// getAllProduct = function () {
//     $.ajax({
//         url: "/api/product",
//         type: "GET"
//     }).done(function (resp) {
//         $("#listProduct").empty();
//         $.each(resp,function (index,item){
//             $("#listProduct").append(
//                 `
//
//                     <tr>
//                         <td>${item.id}</td>
//                         <td>${item.name}</td>
//                         <td>${item.category.name}</td>
//                         <td>${item.price}</td>
//                         <td><button type="button" onclick="changerStatusOfProduct(${item.id})" class="btn btn-${item.status ? "danger" : "success"}">${item.status ? "hết hàng" : "còn hàng"}</button></td>
//                     </tr>
//                 `
//             )
//         })
//     }).fail(function () {
//         $.notify("Không tải được danh sách món ăn","error")
//     });
// }
//
// //Thay đổi trạng thái sản phẩm
// changerStatusOfProduct = function (id) {
//     Swal.fire({
//         title: 'Thay đổi trạng thái',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Thay đổi'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             $.ajax({
//                 headers: {
//                     'Accept':'application/json',
//                     'Content-Type':'application/json'
//                 },
//                 url: "/api/product/changerstatus/" + id,
//                 type: "PUT"
//             }).done(function (product){
//                 if(product != null){
//                     getAllProduct();
//                     $.notify("Thay đổi thành công", "success");
//                 }
//             }).fail(function (){
//                 $.notify("Trạng thái chưa thay đổi", "error");
//             })
//         }
//     })
// }
//
// //Nhận danh danh món ăn theo category
//
// getAllProductOfCategory = function (id) {
//     $.ajax({
//         headers: {
//             'Accept':'application/json',
//             'Content-Type':'application/json'
//         },
//         url: "/api/product/category/" + id,
//         type: "GET"
//     }).done(function (productOfCategory){
//         $("#listProduct").empty();
//         $.each(productOfCategory,function (index,item){
//             $("#listProduct").prepend(
//                 `
//                  <tr>
//                         <td>${item.id}</td>
//                         <td>${item.name}</td>
//                         <td>${item.category.name}</td>
//                         <td>${item.price}</td>
//                         <td><button type="button" onclick="changerStatusOfProduct(${item.id})" class="btn btn-${item.status ? "danger" : "success"}">${item.status ? "hết hàng" : "còn hàng"}</button></td>
//
//                     </tr>
//                 `
//             )
//         })
//     }).fail (function () {
//         $.notify("Không tải được danh sách món ăn","error")
//     })
// }
//
//


