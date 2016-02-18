/**
 * Created by lliangx on 2016/1/29.
 */
$(function(){
    //头像预览
    $('#modal-441349').click(function(){
        var $url =  $('#url').val();
        if($url.trim() ==''){
            alert('请输入网址');
            return false;
        }
        $('#yulan').attr('src',$url);
    });

    //修改基本信息
    $("#formBasic").submit(function(ev){
        ev.preventDefault();
        var form = $(this);
        $.ajax({
            url: form.attr('action')
            , type : 'POST'
            , data : form.serialize()
            , success :function(data){
                if(data.success == true){
                    alert('修改成功');
                }else if(data.success == false){
                    alert('修改失败');
                }
            }
        });
    });

    //修改头像
    $("#formTouxiang").submit(function(ev){
        ev.preventDefault();
        var form = $(this);
        $.ajax({
           url : form.attr('action')
            , type : 'POST'
            , data : form.serialize()
            , success : function(data){
                if(data.success == true){
                    $("#touxiang").attr('src',$('#url').val());
                    alert('修改成功');
                }else if(data.success == false){
                    alert('修改失败');
                }
            }
        });
    });

    //修改密码
    $("#formPass").submit(function(ev){
        ev.preventDefault();
        var password_old = $("#password_old").val();
        var password_new = $("#password_new").val();
        var password_newSure =$("#password_newSure").val();
        if(password_new != password_newSure){
            alert("两次输入不一致");
            return false;
        }
        if(password_old == password_new){
            alert('输入的原密码与新密码一致');
            return false;
        }
        var form = $(this);
        $.ajax({
           url : form.attr('action')
            , type : 'POST'
            , data : {
                passwordOld : password_old
                , passwordNew : password_new
            }
            , success : function(data){
                if(data.success == true){
                    alert('修改成功');
                }else if(data.success == false){
                    alert('愿密码输入错误');
                }
            }
        });
    });
});
