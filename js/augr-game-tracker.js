var colors = [0xff0000, 0x00ff00, 0x0000ff];
var baseBoneRotation = (new THREE.Quaternion).setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));

var sessionManager = {
    connection: null,
    hand: {
        position: null,
        fistClosed: false,
        lastMove : "hover",
        lastMoveCounter: 3000,
        lastPosition: null,
        inGrasp: []
    },
    statusShown: false,
    screenCount: 1,
};

var objectManager = {
  "option-0-container": {
      type: "a-box",
      id: "option-0-container",
      position: "-1 0.5 -3",
      posArray: [
        0,
        0.5,
        -3
      ],
      marginArray: [
        -30,
        30,
        30,
        130,
        -100,
        50
      ],
      rotation: "0 45 0",
      color: "#4CC3D9",
      graspColor: "#FF0000",
      inGrasp: false
  },
  "option-1-container": {
      type: "a-box",
      id: "option-1-container",
      position: "-1 0.5 -3",
      posArray: [
        0,
        0.5,
        -3
      ],
      marginArray: [
        -30,
        30,
        30,
        130,
        -100,
        50
      ],
      rotation: "0 45 0",
      color: "#4CC3D9",
      graspColor: "#FF0000",
      inGrasp: false
  },
  "option-2-container": {
      type: "a-box",
      id: "option-2-container",
      position: "-1 0.5 -3",
      posArray: [
        0,
        0.5,
        -3
      ],
      marginArray: [
        -30,
        30,
        30,
        130,
        -100,
        50
      ],
      rotation: "0 45 0",
      color: "#4CC3D9",
      graspColor: "#FF0000",
      inGrasp: false
  },
  "option-3-container": {
      type: "a-box",
      id: "option-3-container",
      position: "-1 0.5 -3",
      posArray: [
        0,
        0.5,
        -3
      ],
      marginArray: [
        -30,
        30,
        30,
        130,
        -100,
        50
      ],
      rotation: "0 45 0",
      color: "#4CC3D9",
      graspColor: "#FF0000",
      inGrasp: false
  }
};
// all units in mm

var initScene = function () {
  window.scene = new THREE.Scene();
  window.renderer = new THREE.WebGLRenderer({
    alpha: true
  });
  window.renderer.setClearColor(0x000000, 0);
  window.renderer.setSize(window.innerWidth, window.innerHeight);
  window.renderer.domElement.style.position = 'absolute';
  window.renderer.domElement.style.zIndex = '100';
  window.renderer.domElement.style.top = 0;
  window.renderer.domElement.style.left = 0;
  window.renderer.domElement.style.width = '100%';
  window.renderer.domElement.style.height = '100%';
  document.body.appendChild(window.renderer.domElement);
  var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  directionalLight.position.set( 0, 0.5, 1 );
  window.scene.add(directionalLight);
  window.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  window.camera.position.fromArray([0, 100, 500]);
  window.camera.lookAt(new THREE.Vector3(0, 160, 0));
  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }, false);
  scene.add(camera);

  renderer.render(scene, camera);

  setTimeout(function(){
      var viewerTracker = [
          document.getElementById("webcam-0-container"),
      ];
  }, 150);
};

Leap.loop({background: true}, {
    hand: function (hand) {
        hand.fingers.forEach(function (finger) {
          // This is the meat of the example - Positioning `the cylinders on every frame:
          finger.data('boneMeshes').forEach(function(mesh, i){
              var bone = finger.bones[i];
              mesh.position.fromArray(bone.center());
              mesh.setRotationFromMatrix(
                (new THREE.Matrix4).fromArray( bone.matrix() )
              );
              mesh.quaternion.multiply(baseBoneRotation);
          });

          finger.data('jointMeshes').forEach(function(mesh, i){
              var bone = finger.bones[i];
              if (bone) {
                mesh.position.fromArray(bone.prevJoint);
              }
              else{
              // special case for the finger tip joint sphere:
              bone = finger.bones[i-1];
              mesh.position.fromArray(bone.nextJoint);
            }
          });

        });
        sessionManager.hand.position = hand.palmPosition;

        // range test
        if(sessionManager.hand.lastPosition==null){
            sessionManager.hand.lastPosition = [];
            sessionManager.hand.lastPosition.push(sessionManager.hand.position[0]);
            sessionManager.hand.lastPosition.push(sessionManager.hand.position[1]);
            sessionManager.hand.lastPosition.push(sessionManager.hand.position[2]);
        }

        let obj = objectManager;
        if(sessionManager.inRange==null){
          sessionManager.inRange = false;
          sessionManager.previousRange = -1;
        }
        /*if(obj["drop-box-container"].marginArray[0]<hand.palmPosition[0]&&hand.palmPosition[0]<obj["drop-box-container"].marginArray[1]&&obj["drop-box-container"].marginArray[2]<hand.palmPosition[1]&&hand.palmPosition[1]<obj["drop-box-container"].marginArray[3]&&obj["drop-box-container"].marginArray[4]<hand.palmPosition[2]&&hand.palmPosition[2]<obj["drop-box-container"].marginArray[5])*/
        let currentPosition = hand.indexFinger.distal.center();

        if(hand.indexFinger.extended){
          //console.log(currentPosition[0]);
          if(currentPosition[0]<-25&&currentPosition[0]>-150){

            //console.log("on the left side");
            if(currentPosition[1]>85&&currentPosition[1]<120){
              console.log("bottom left");

              if(sessionManager.previousRange!=3){
                let options = document.getElementsByClassName("option-container");

                for(var i=0;i<options.length;i++){
                  (function(){
                    options.item(i).setAttribute("material", "opacity", "0.6");
                  })();
                }
                sessionManager.previousRange = 3;
              }

              document.getElementById("option-3-edge-0-container").setAttribute("material", "opacity", "1.0");
              document.getElementById("option-3-edge-1-container").setAttribute("material", "opacity", "1.0");
              document.getElementById("option-3-container").setAttribute("material", "opacity", "1.0");
              sessionManager.inRange = true;
            }
            else if(currentPosition[1]>140&&currentPosition[1]<180){
              console.log("top left");

              if(sessionManager.previousRange!=0){
                let options = document.getElementsByClassName("option-container");

                for(var e=0;e<options.length;e++){
                  (function(){
                    options.item(e).setAttribute("material", "opacity", "0.6");
                  })();
                }
                sessionManager.previousRange = 0;
              }

              document.getElementById("option-0-edge-0-container").setAttribute("material", "opacity", "1.0");
              document.getElementById("option-0-edge-1-container").setAttribute("material", "opacity", "1.0");
              document.getElementById("option-0-container").setAttribute("material", "opacity", "1.0");
              sessionManager.inRange = true;
            }
            //console.log(currentPosition[1]);
          }
          else if(currentPosition[0]>25&&currentPosition[0]<150){
            if(currentPosition[1]>85&&currentPosition[1]<120){
              console.log("bottom right");

              if(sessionManager.previousRange!=2){
                let options = document.getElementsByClassName("option-container");

                for(var u=0;u<options.length;u++){
                  (function(){
                    options.item(u).setAttribute("material", "opacity", "0.6");
                  })();
                }
                sessionManager.previousRange = 2;
              }

              document.getElementById("option-2-edge-0-container").setAttribute("material", "opacity", "1.0");
              document.getElementById("option-2-edge-1-container").setAttribute("material", "opacity", "1.0");
              document.getElementById("option-2-container").setAttribute("material", "opacity", "1.0");
              sessionManager.inRange = true;
            }
            else if(currentPosition[1]>140&&currentPosition[1]<180){
              console.log("top right");

              if(sessionManager.previousRange!=1){
                let options = document.getElementsByClassName("option-container");

                for(var a=0;a<options.length;a++){
                  (function(){
                    options.item(a).setAttribute("material", "opacity", "0.6");
                  })();
                }
                sessionManager.previousRange = 1;
              }

              document.getElementById("option-1-edge-0-container").setAttribute("material", "opacity", "1.0");
              document.getElementById("option-1-edge-1-container").setAttribute("material", "opacity", "1.0");
              document.getElementById("option-1-container").setAttribute("material", "opacity", "1.0");
              sessionManager.inRange = true;

            }
            //console.log("on the right side");
          }
        }
        else{
          if(sessionManager.inRange){
            let options = document.getElementsByClassName("option-container");

            for(var i=0;i<options.length;i++){
              (function(){
                options.item(i).setAttribute("material", "opacity", "0.6");
              })();
            }

            sessionManager.previousRange =-1;
            /*document.getElementById("option-0-container").setAttribute("material", "opacity", "0.6");
            document.getElementById("option-1-container").setAttribute("material", "opacity", "0.6");
            document.getElementById("option-2-container").setAttribute("material", "opacity", "0.6");
            document.getElementById("option-3-container").setAttribute("material", "opacity", "0.6");

            document.getElementById("option-0-edge-0-container").setAttribute("material", "opacity", "0.6");
            document.getElementById("option-0-edge-1-container").setAttribute("material", "opacity", "0.6");

            document.getElementById("option-1-edge-0-container").setAttribute("material", "opacity", "0.6");
            document.getElementById("option-1-edge-1-container").setAttribute("material", "opacity", "0.6");

            document.getElementById("option-2-edge-0-container").setAttribute("material", "opacity", "0.6");
            document.getElementById("option-2-edge-1-container").setAttribute("material", "opacity", "0.6");

            document.getElementById("option-3-edge-0-container").setAttribute("material", "opacity", "0.6");
            document.getElementById("option-3-edge-1-container").setAttribute("material", "opacity", "0.6");*/
            sessionManager.inRange = false;
          }
        }
        renderer.render(scene, camera);
}})
.use('handHold')
.use('handEntry')
.on('handFound', function(hand){
    hand.fingers.forEach(function (finger) {
        var boneMeshes = [];
        var jointMeshes = [];

        finger.bones.forEach(function(bone) {
            var boneMesh = new THREE.Mesh(
                new THREE.CylinderGeometry(5, 5, bone.length),
                new THREE.MeshPhongMaterial()
            );
            boneMesh.material.color.setHex(0xffffff);
            scene.add(boneMesh);
            boneMeshes.push(boneMesh);
        });

        for (var i = 0; i < finger.bones.length + 1; i++) {
            var jointMesh = new THREE.Mesh(
                new THREE.SphereGeometry(8),
                new THREE.MeshPhongMaterial()
            );
            jointMesh.material.color.setHex(0x00ff00);
            scene.add(jointMesh);
            jointMeshes.push(jointMesh);
        }

        finger.data('boneMeshes', boneMeshes);
        finger.data('jointMeshes', jointMeshes);

  });
})
.on('handLost', function(hand){
    hand.fingers.forEach(function (finger) {
      var boneMeshes = finger.data('boneMeshes');
      var jointMeshes = finger.data('jointMeshes');
      boneMeshes.forEach(function(mesh){
        scene.remove(mesh);
      });
      jointMeshes.forEach(function(mesh){
        scene.remove(mesh);
      });
      finger.data({
        boneMeshes: null,
        boneMeshes: null
      });
    });

    document.getElementById("option-0-container").setAttribute("material", "opacity", "0.6");
    document.getElementById("option-1-container").setAttribute("material", "opacity", "0.6");
    document.getElementById("option-2-container").setAttribute("material", "opacity", "0.6");
    document.getElementById("option-3-container").setAttribute("material", "opacity", "0.6");

    sessionManager.inRange = false;

    renderer.render(scene, camera);
})
.connect();
