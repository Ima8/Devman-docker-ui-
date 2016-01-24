$(function(){
   $(".sidebar li").draggable({
      helper:"clone"
   });

   var containers = [];
   var old_state = null;
   $(".selection").droppable({
      accept:'.sidebar li',
      // 1
      drop:function(event,ui){
         var e = $(ui.draggable).clone();

         // 2
         containers.push(e);
         if(containers != old_state){
            $(".submit").removeClass("hidden");
         }

         $(".recycle").click(function(){
            location.reload();
         });
         $(".submit").click(function(){
            alert("Hi");
         });

         // 3
         $(this).append(e);
         $(e).draggable();
         $(e).css({
            top:event.offsetY,
            left:event.offsetX
         });
         jsPlumb.draggable(e);

         jsPlumb.addEndpoint(e,{
            isSource:true,
            isTarget:true,
            anchors:[0.5, 1, 0, 1,"Bottom"],
            endpoint:"Rectangle",
            paintStyle:{ width:10,height:10,fillStyle:"#eee" }
         });

         jsPlumb.addEndpoint(e,{
            isSource:true,
            isTarget:true,
            anchors:[0.5, 1, 0, 1,"Top"],
            endpoint:"Rectangle",
            paintStyle:{ width:10,height:10,fillStyle:"#eee" }
         });

         jsPlumb.addEndpoint(e,{
            isSource:true,
            isTarget:true,
            anchors:[0.5, 1, 0, 1,"Left"],
            endpoint:"Rectangle",
            paintStyle:{ width:10,height:10,fillStyle:"#eee" }
         });

         jsPlumb.addEndpoint(e,{
            isSource:true,
            isTarget:true,
            anchors:[0.5, 1, 0, 1,"Right"],
            endpoint:"Rectangle",
            paintStyle:{ width:10,height:10,fillStyle:"#eee" }
         });

      }
   });
   // End selection
   $(".recycle").droppable({
      accept:'.jsplumb-draggable',
      drop:function(event,ui){
         $(ui.draggable).remove();
         jsPlumb.detachAllConnections(ui.draggable);
         jsPlumb.deleteEndpoint(ui.draggable);
         // jsPlumb.detach(ui.draggable);

      }
   })
});

jsPlumb.ready(function(){
   var els = document.querySelectorAll(".app-draggable");
});
