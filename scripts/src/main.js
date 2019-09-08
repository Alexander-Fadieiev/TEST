'use strict';
 document.addEventListener('DOMContentLoaded', function () {

  if(document.querySelector('.s_test_title')){
    $(".s_test_title").lettering();
  }

  function animationLetters(){
    let tl = new TimelineMax();
    tl.staggerFromTo('.s_test_title span', 0.3, {y: 20,opacity: 0}, {y:0,opacity: 1,ease: Back.easeOut.config(3)},0.04)
  }
  setTimeout(animationLetters,500)

      var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
      scene.background = new THREE.Color( 0xffffff );
			document.body.appendChild( renderer.domElement );


			var geometry = new THREE.PlaneGeometry(6, 6*.75);
      var material;
			var mesh;
      let frame;

      // instantiate a loader
      var loader = new THREE.TextureLoader();
      // load a resource
      loader.load(
      	// resource URL
      	'figure.png',

      	// onLoad callback
      	function ( texture ) {
      		// in this example we create the material when the texture is loaded
      		 material = new THREE.MeshBasicMaterial( {
      			map: texture
      		 } );
           mesh = new THREE.Mesh(geometry, material);
           scene.add(mesh);
           animate();
      	},

      	// onProgress callback currently not supported
      	undefined,

      	// onError callback
      	function ( err ) {
      		console.error( 'An error happened.' );
      	}
      );
			camera.position.z = 5;

			var animate = function () {
				frame = requestAnimationFrame( animate );
        mesh.rotation.y -= 0.01;
				renderer.render( scene, camera );
			};






      if(document.querySelector('#circle')){
        var canvas = document.querySelector("#circle");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var ctx = canvas.getContext("2d");

        function getPosition(el) {
          var xPosition = 0;
          var yPosition = 0;

          while (el) {
            xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
            el = el.offsetParent;
          }
          return {
            x: xPosition,
            y: yPosition
          };
        }
        var canvasPos = getPosition(canvas);
        let scale = 21;

        document.querySelector("body").addEventListener("mousemove", setMousePosition, false);

        function setMousePosition(e) {
          mouseX = e.clientX - canvasPos.x;
          mouseY = e.clientY - canvasPos.y;

          ctx.clearRect(0, 0, canvas.width, canvas.height);



          let el = document.querySelector('.s_test_title');
            if( (mouseX < (el.offsetLeft + el.offsetWidth)) && (mouseX > el.offsetLeft) && (mouseY < (el.offsetTop + el.offsetHeight)) && (mouseY > el.offsetTop)){
              cancelAnimationFrame(frame);
              if(scale <= 80){
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, scale, 0, 2 * Math.PI, true);
                ctx.fillStyle = "#FF6A6ACC";
                ctx.fill();
                scale++;
              } else {
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, 80, 0, 2 * Math.PI, true);
                ctx.fillStyle = "#FF6A6ACC";
                ctx.fill();
              }
            } else {
              cancelAnimationFrame(frame);
              frame = requestAnimationFrame( animate );
              if(scale >= 21){
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, scale, 0, 2 * Math.PI, true);
                ctx.fillStyle = "#FF6A6ACC";
                ctx.fill();
                scale--;
              } else {
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, 21, 0, 2 * Math.PI, true);
                ctx.fillStyle = "#FF6A6ACC";
                ctx.fill();
              }
            }
          }
        }

});
