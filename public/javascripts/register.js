/**
 * Created by lliangx on 2016/1/28.
 */
$(function(){
    setTimeout(function(){
        $('#topPoint').slideUp();
    },5000);

    //普通用户注册
    $("#formPutong").submit(function(ev){
        ev.preventDefault();
        var password1 = $("#password1").val();
        var passwordSure1 = $("#passwordSure1").val();
        if(password1 != passwordSure1){
            alert('两次输入密码不一致');
            return false;
        }
        var form = $(this);
        $.ajax({
            url :  form.attr('action')
            , type : 'POST'
            , data : {
                name : $("#name1").val()
                , password : password1
                , email : $("#email1").val()
                , sex : $("[name='sex1']").val()
                , phone : $("#phone1").val()
                , birthday :$("#birthday1").val()
                , address : $("#address1").val()
                , education : $("#education1").val()
                , experience : $("#experience1").val()
                , description : $("#description1").val()
            }
            , success : function(data){
                alert(data.message);
                if(data.success == true){
                    location.href = "/";
                }
            }
        });
    });

    //HR用户注册
    $("#formHR").submit(function(ev){
        ev.preventDefault();
        var form = $(this);
        var password = $("#password2").val();
        var passwordSure = $("#passwordSure2").val();
        if(password != passwordSure){
            alert("两次输入密码不一致");
            return false;
        }
        $.ajax({
           url : form.attr('action')
            , type : 'POST'
            , data : form.serialize()
            , success : function(data){
                alert(data.message);
                if(data.success == true){
                    location.href = "/";
                }
            }
        });
    });
});
