var containers = [];
var images = [];
$(function(){
   $(".sidebar li").draggable({
      helper:"clone"
   });

   var link = [] ;
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
            console.log("clicked")
            console.log(images);
           $.post("/remote/createComponent",{ipaddress:"128.199.110.34",components: images}, function(data, status){
               alert("Created !!");
               console.log(data)
           });
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

      console.log(containers);

      for(var i in containers){
        console.log(containers[i].image);
        images.push(containers[i].image);
      }

      //console.log("source > "+info.source.dataset.images);
      //console.log("tager > "+info.target.dataset.images);
  });
});
