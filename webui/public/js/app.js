$(function() {
    $( "#accordion" ).accordion();
    $( "#accordion li").draggable({
      helper:"clone",
      appendTo:"body",
      containment:"parent",
      // revert:"true",
      scroll:false,
      start:function(){
         $(this).hide();
      },
      stop:function(){
         $(this).show();
      }
   });
   $(".dropArea").droppable({
      containment:"parent"
   });
});
