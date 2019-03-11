console.log("!!")
function Ajax(formdata) {
    //console.log("form=",formdata.getAll("file"))
    $.ajax({
        url: "/upload",
        type: "POST",
        data: formdata,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.type === 200) alert("上傳成功")
            // dispalyAjax()
        },
        error: function () {
            alert("與服務器通信發生錯誤")
        }
    })

}

function dispalyAjax() {
    $.ajax({
        url: "/display",
        type: "POST",
        success: function (data) {
            //alert(JSON.stringify(data))
            displayimg(data)
        },
        error: function () {
            alert("與服務器通信發生錯誤")
        }
    })
}

function upload() {
    var file = document.getElementById("file")
    var text = document.getElementById("text")
    //console.log("t=",text.value)
    var formData = new FormData()
    //console.log("fule=0",file.value)
    if (file.value) {
        formData.append("comment", text.value)
        for (var i = 0; i < file.files.length; i++) {
            // console.log("comment=",file.files[i])
            formData.append("file", file.files[i])
        }
        Ajax(formData)
    }
    //console.log(formData.getAll("file"))
}

function big_display(src) {
    var img = document.getElementById("big_display")
    var figure = document.getElementById("big_display_figure")
    var bg = document.getElementById("big_display_bg")
    var bg_fixed = document.getElementById("big_display_fixed")
    bg.style.display = "block";
    figure.style.display = "block";
    bg_fixed.style.display = "block";
    img.src = src
}

function displayimg(data) {
    var imgs = new Array()
    var figure = new Array()
    var x = new Array()
    var divimgs = document.getElementById("images")
    var xcmt
    for (var i = data.length - 1, n = 0; i >= 0; i-- , n++) {
        //console.log(i, n)
        figure[n] = document.createElement("figure")
        imgs[n] = document.createElement("img")
        x[n] = document.createElement("figcaption")
        figure[n].className = "bbb"
        imgs[n].src = data[i].path
        imgs[n].className = "aaa"
        imgs[n].id = n
        x[n].text = data[i].comment
        x[n].id = "x" + n
        //console.log("x=",x[n].value)
        x[n].addEventListener("click", function (event) {
            //console.log("target",event.target)
            big_display(event.target.previousSibling.src)
            event.preventDefault();
        })
        imgs[n].addEventListener("click", function (event) {
            //console.log("target",event.target)
            big_display(event.target.src)
            event.preventDefault();
        })
        data[i].comment = data[i].comment.replace(/\s/g, " <br/> ")
        figure[n].appendChild(imgs[n])
        figure[n].appendChild(x[n])
        divimgs.appendChild(figure[n])
        xcmt = document.getElementById("x" + n)
        xcmt.innerHTML = data[i].comment
    }
}

function close_big_img() {
    var figure = document.getElementById("big_display_figure")
    var bg = document.getElementById("big_display_bg")
    var bg_fixed = document.getElementById("big_display_fixed")
    bg.style.display = "none";
    figure.style.display = "none";
    bg_fixed.style.display = "none";
}
