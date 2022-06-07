$(() => {
//$(document).ready(function(){
    const dName = "LIST";
    const dSize = "SIZE";
    const e3 = {
        get : () => {
            var dKeys = [];
            var dValues = {};
            var dList = []
            var size = 0;
            dKeys = Object.keys(localStorage).sort();;
            dKeys.forEach(function(v, i){
                if(v.indexOf("item") > -1) {
                    var d = {};
                    d[v] = e3.capsule("DC", localStorage.getItem(v));
                    dList.push(d);
                } else if(v.indexOf("size") > -1) {
                    size = Number(e3.capsule("DC", localStorage.getItem("size")));
                }
            });
            dValues[dSize] = size;
            dValues[dName] = dList;
            return dValues;
        },
        set : (v) => {
            var dValues = e3.get();
            var s = dValues[dSize];
            s++;

            localStorage.setItem("size", e3.capsule("IC", s));
            localStorage.setItem("items" + s, e3.capsule("IC", v));
            e3.create();
        },
        del : (key) => {
            localStorage.removeItem(key);
            e3.create();
        },
        capsule : (type, value) => {
            var data = "";
            if(type == "IC"){
                var dKey = CryptoJS.enc.Utf8.parse(value);
                data = CryptoJS.enc.Base64.stringify(dKey);
            } else if(type == "DC"){
                var decrypt = CryptoJS.enc.Base64.parse(value);
                data = decrypt.toString(CryptoJS.enc.Utf8);
            }
            return data;
        },
        create : () => {
            var dValues = e3.get();
            $("#list_body").empty();
            dValues[dName].forEach(function(v,i){
                var key = Object.keys(v)[0];
                var val = v[key];
                var html = "<li class='"+ key + "'>" + val + "</li>";
                $("#list_body").append(html);
                $("#item").val("");
            });
            e2();
        }
    };
    const e2 = () => {
        $("#list_body li").off().on("click", (t) => {
            var key = $(t.target).attr("class");
            e3.del(key);
        });
    }
    const e1 = () => {
        var item = $("#item").val();
        if(item != "") {
            e3.set(item);
        }        
    };
    $("#item").on("keyup", (key) => {
        if(key.keyCode == 13){e1();}
    });
    $("#add").click(e1);

    e3.create();
});