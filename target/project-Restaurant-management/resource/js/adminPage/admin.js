$(document).ready(function () {
    $('#af-preloader').delay(500).fadeOut('slow')
    init();
});
//convert date
convert = function (value) {
    let date = new Date(value);
    return date.toLocaleDateString();
}

init = function () {
    getOrderDetail();
    getAllCategory();
    getAllProduct();
}

getOrderDetail = function () {
    $.ajax({
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        url: "https://61961269902243001762fa41.mockapi.io/orderdetail",
        type: "GET",
    }).done (function (data) {
        var xValues = [];
        $.each(data,function (index,item) {
            xValues[index] = `${convert(item.CreataAt)}`
        })
        console.log(xValues)
        var yValues = [];
        $.each(data,function (index,item){
            yValues[index] = `${item.price}`
        })
        console.log(yValues);
        var barColors =  ["red", "green", "blue","purple","brow","orange","gray","yellow"]
        new Chart("myChart", {
            type: "bar",
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
$("all").on("click",function (){
    getAllProduct();
})
getAllCategory = function () {
    $.ajax({
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        url: "/api/category/category",
        type: "GET"
    }).done(function (resp) {
        $("#listCategory").empty();
        $.each(resp,function (index,item){
            $("#listCategory").append(
                `
                    <button type="button" class="btn btn-success" onclick="getAllProductOfCategory(${item.id})">${item.name}</button>
                `
            )
        })
    }).fail(function () {
        $.notify("không tải được danh mục","error")
    });
}

getAllProduct = function () {
    $.ajax({
        url: "/api/product",
        type: "GET"
    }).done(function (resp) {
        $("#listProduct").empty();
        $.each(resp,function (index,item){
            $("#listProduct").prepend(
                `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.category.name}</td>
                        <td>${item.price}</td>
                        <td><button type="button" onclick="changerStatusOfProduct(${item.id})" class="btn btn-${item.status ? "danger" : "success"}">${item.status ? "hết hàng" : "còn hàng"}</button></td>
                    </tr>
                `
            )
        })
    }).fail(function () {
        $.notify("Không tải được danh sách món ăn","error")
    });
}

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
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                url: "/api/product/changerstatus/" + id,
                type: "PUT"
            }).done(function (product){
                if(product != null){
                    getAllProduct();
                    $.notify("Thay đổi thành công", "success");
                }
            }).fail(function (){
                $.notify("Trạng thái chưa thay đổi", "error");
            })
        }
    })

}

//Nhận danh danh món ăn theo category

getAllProductOfCategory = function (id) {
    $.ajax({
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        url: "/api/product/category/" + id,
        type: "GET"
    }).done(function (productOfCategory){
        $("#listProduct").empty();
        $.each(productOfCategory,function (index,item){
            $("#listProduct").prepend(
                `
                 <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.category.name}</td>
                        <td>${item.price}</td>
                        <td><button type="button" onclick="changerStatusOfProduct(${item.id})" class="btn btn-${item.status ? "danger" : "success"}">${item.status ? "hết hàng" : "còn hàng"}</button></td>

                    </tr>
                `
            )
        })
    }).fail (function () {
        $.notify("Không tải được danh sách món ăn","error")
    })
}



