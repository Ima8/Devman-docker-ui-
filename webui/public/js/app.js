var containers = [];
$(function(){
   $(".sidebar li").draggable({
      helper:"clone"
   });

   var link = [] ;
   var containers = [];
   var old_state = null;
   $(".selection").droppable({
      accept:'.sidebar li',
      // 1
      drop:function(event,ui){
         var e = $(ui.draggable).clone();
         var id = parseInt(Math.random() * (100000 - 1) + 1);
         // 2
         console.log(e[0].id);

         containers.push({image:e[0].dataset.images, id});
         console.log(containers);
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
            anchors:[0.5, 1, 0, 1,"Right"],
            endpoint:"Rectangle",
            paintStyle:{ width:10,height:10,fillStyle:"#eee" },
            dropOption:{drop:function(e,ui){
              alert(e);
              alert("hello");
              console.log(ui);
            }}
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
   jsPlumb.bind("connection", function(info) {
     //source
      containers.target=info.target.dataset.images;
      console.log(containers);

      for(var i in containers){
        console.log(containers[i]);
      }
      //console.log("source > "+info.source.dataset.images);
      //console.log("tager > "+info.target.dataset.images);
  });
});
