/**
 * Created by lliangx on 2016/2/3.
 */
$(function(){
   $("tbody tr").bind("click",function(){
       location.href="/jobdes/"+$(this).attr('data-id');
   })
});
