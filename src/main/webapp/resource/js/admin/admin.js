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
        var xValues = new Array();
        $.each(data,function (index,item) {
            xValues[index] = `${convert(item.CreataAt)}`
        })
        console.log(xValues)
        var yValues = new Array();
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