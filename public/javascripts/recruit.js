/**
 * Created by lliangx on 2016/1/29.
 */
$(function(){
    //select点击事件
    $("[name='business']").one('click',function(){

    });

    $("[name='company']").one('click',function(){

    });

    $("[name='job']").one('click',function(){

    });

    $("[name='salary']").one('click',function(){

    });

    //select改变事件
    $("[name='business']").change(function(){
        var $val = $("[name='business']").val();
        var $add = $('#addition');
        if($add.has('#businessSpan').length != 0){
            $('#businessSpan').remove();
        }
        if($val != '经营范围'){
            $add.append("<span id='businessSpan' class='label label-success'>"+$val+"</span> ");
        }
    });

    $("[name='company']").change(function(ev){
        var $val = $("[name='company']").val();
        var $add = $('#addition');
        if($add.has('#companySpan').length != 0){
            $('#companySpan').remove();
        }
        if($val !='公司'){
            $add.append("<span id='companySpan' class='label label-success'>"+$val+"</span> ");
        }
    });

    $("[name='job']").change(function(ev){
        var $val = $("[name='job']").val();
        var $add = $('#addition');
        if($add.has('#jobSpan').length != 0){
            $('#jobSpan').remove();
        }
        if($val !='职位'){
            $add.append("<span id='jobSpan' class='label label-success'>"+$val+"</span> ");
        }
    });

    $("[name='salary']").change(function(ev){
        var $val = $("[name='salary']").val();
        var $add = $('#addition');
        if($add.has('#salarySpan').length != 0){
            $('#salarySpan').remove();
        }
        if($val !='年薪'){
            $add.append("<span id='salarySpan' class='label label-success'>"+$val+"</span> ");
        }
    });

    $("tr:not(:first)").click(function(){
        window.location.href="/jobdes/:id";
    });
});