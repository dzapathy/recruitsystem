/**
 * Created by lliangx on 2016/2/1.
 */
$(function(){
    $("#loginForm").submit(function(ev){
        ev.preventDefault();
        var form = $(this);
        $.ajax({
            url  : form.attr('action'),
            type : 'POST',
            data : form.serialize(),
            success:function(data){
                if(data.success){
                    location.reload();
                }else{
                    alert("用户名或密码错误！");
                }
            }
        });
    });
});
