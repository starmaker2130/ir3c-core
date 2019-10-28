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
    pressed: null,
    statusShown: false,
    screenCount: 1,
};

var objectManager = {
  "letter-q-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-w-container": {
      type: "a-entity:a-plane",
      id: "letter-w-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-e-container": {
      type: "a-entity:a-plane",
      id: "letter-e-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-r-container": {
      type: "a-entity:a-plane",
      id: "letter-r-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-t-container": {
      type: "a-entity:a-plane",
      id: "letter-t-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-y-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-u-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-i-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-o-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-p-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-a-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-s-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-d-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-f-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-g-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-h-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-j-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-k-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-l-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-z-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-x-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-c-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-v-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-b-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-n-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "letter-m-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "punctuation-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "punctuation-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "punctuation-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "punctuation-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "symbol-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
  },
  "symbol-container": {
      type: "a-entity:a-plane",
      id: "letter-q-container",
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
      rotation: "0 0 0",
      color: "gray",
      hoverColor: "#FF0000",
      hovering: false,
      touchColor: "#FF0000",
      touching: false
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
        if(sessionManager.pressed==null){
          sessionManager.pressed = [];
        }

        if(hand.indexFinger.extended){
            let indexPos = hand.indexFinger.distal.center();
            if(indexPos[0]>95&&indexPos[0]<115&&indexPos[1]>195&&indexPos[1]<220){
              //console.log("P");
              sessionManager.pressed.push("P");
              if(sessionManager.pressed.indexOf("P")>-1){
                  document.getElementById("letter-p-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-p-container").setAttribute("text", "color", "black");
                  console.log("holding down P");
              }

            }
            else if(indexPos[0]>65&&indexPos[0]<90&&indexPos[1]>190&&indexPos[1]<220){
              //console.log("O");
              sessionManager.pressed.push("O");
              if(sessionManager.pressed.indexOf("O")>-1){
                  document.getElementById("letter-o-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-o-container").setAttribute("text", "color", "black");
                  console.log("holding down O");
              }
            }
            else if(indexPos[0]>40&&indexPos[0]<60&&indexPos[1]>190&&indexPos[1]<220){
              //console.log("I");
              sessionManager.pressed.push("I");
              if(sessionManager.pressed.indexOf("I")>-1){
                  document.getElementById("letter-i-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-i-container").setAttribute("text", "color", "black");
                  console.log("holding down I");
              }
            }
            else if(indexPos[0]>15&&indexPos[0]<35&&indexPos[1]>190&&indexPos[1]<220){
            //  console.log("U");
              sessionManager.pressed.push("U");
              if(sessionManager.pressed.indexOf("U")>-1){
                  document.getElementById("letter-u-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-u-container").setAttribute("text", "color", "black");
                  console.log("holding down U");
              }
            }
            else if(indexPos[0]>-12&&indexPos[0]<10&&indexPos[1]>190&&indexPos[1]<220){
            //  console.log("Y");
              sessionManager.pressed.push("Y");
              if(sessionManager.pressed.indexOf("Y")>-1){
                  document.getElementById("letter-y-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-y-container").setAttribute("text", "color", "black");
                  console.log("holding down Y");
              }
            }
            else if(indexPos[0]>-43&&indexPos[0]<-17&&indexPos[1]>190&&indexPos[1]<220){
            //  console.log("T");
              sessionManager.pressed.push("T");
              if(sessionManager.pressed.indexOf("T")>-1){
                  document.getElementById("letter-t-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-t-container").setAttribute("text", "color", "black");
                  console.log("holding down T");
              }
            }
            else if(indexPos[0]>-70&&indexPos[0]<-48&&indexPos[1]>190&&indexPos[1]<220){
            //  console.log("R");
              sessionManager.pressed.push("R");
              if(sessionManager.pressed.indexOf("R")>-1){
                  document.getElementById("letter-r-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-r-container").setAttribute("text", "color", "black");
                  console.log("holding down R");
              }
            }
            else if(indexPos[0]>-95&&indexPos[0]<-75&&indexPos[1]>190&&indexPos[1]<220){
          //    console.log("E");
              sessionManager.pressed.push("E");
              if(sessionManager.pressed.indexOf("E")>-1){
                  document.getElementById("letter-e-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-e-container").setAttribute("text", "color", "black");
                  console.log("holding down S");
              }
            }
            else if(indexPos[0]>-130&&indexPos[0]<-105&&indexPos[1]>190&&indexPos[1]<220){
          //    console.log("W");
              sessionManager.pressed.push("W");
              if(sessionManager.pressed.indexOf("W")>-1){
                  document.getElementById("letter-w-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-w-container").setAttribute("text", "color", "black");
                  console.log("holding down W");
              }
            }
            else if(indexPos[0]>-155&&indexPos[0]<-135&&indexPos[1]>190&&indexPos[1]<220){
              //console.log("Q");
              sessionManager.pressed.push("Q");
              if(sessionManager.pressed.indexOf("Q")>-1){
                  document.getElementById("letter-q-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-q-container").setAttribute("text", "color", "black");
                  console.log("holding down O");
              }
            }
            else if(indexPos[0]>-195&&indexPos[0]<-160&&indexPos[1]>190&&indexPos[1]<220){
              //console.log("tab");
              sessionManager.pressed.push("tab");
              if(sessionManager.pressed.indexOf("tab")>-1){
                  document.getElementById("system-tab-container").setAttribute("material", "color", "white");
                  document.getElementById("system-tab-container").setAttribute("text", "color", "black");
                  console.log("holding down tab");
              }
            }
            else if(indexPos[0]>95&&indexPos[0]<115&&indexPos[1]>165&&indexPos[1]<180){
              //console.log(":");
              sessionManager.pressed.push(":");
              if(sessionManager.pressed.indexOf(":")>-1){
                  document.getElementById("punctuation-colon-container").setAttribute("material", "color", "white");
                  document.getElementById("punctuation-colon-container").setAttribute("text", "color", "black");
                  console.log("holding down :");
              }

            }
            else if(indexPos[0]>65&&indexPos[0]<90&&indexPos[1]>165&&indexPos[1]<180){
              //console.log("L");
              sessionManager.pressed.push("L");
              if(sessionManager.pressed.indexOf("L")>-1){
                  document.getElementById("letter-l-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-l-container").setAttribute("text", "color", "black");
                  console.log("holding down L");
              }
            }
            else if(indexPos[0]>40&&indexPos[0]<60&&indexPos[1]>165&&indexPos[1]<180){
  //            console.log("K");
              sessionManager.pressed.push("K");
              if(sessionManager.pressed.indexOf("K")>-1){
                  document.getElementById("letter-k-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-k-container").setAttribute("text", "color", "black");
                  console.log("holding down K");
              }
            }
            else if(indexPos[0]>15&&indexPos[0]<35&&indexPos[1]>165&&indexPos[1]<180){
              //console.log("J");
              sessionManager.pressed.push("J");
              if(sessionManager.pressed.indexOf("J")>-1){
                  document.getElementById("letter-j-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-j-container").setAttribute("text", "color", "black");
                  console.log("holding down J");
              }
            }
            else if(indexPos[0]>-12&&indexPos[0]<10&&indexPos[1]>165&&indexPos[1]<180){
              //console.log("H");
              sessionManager.pressed.push("H");
              if(sessionManager.pressed.indexOf("H")>-1){
                  document.getElementById("letter-h-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-h-container").setAttribute("text", "color", "black");
                  console.log("holding down H");
              }
            }
            else if(indexPos[0]>-43&&indexPos[0]<-17&&indexPos[1]>165&&indexPos[1]<180){
              //console.log("G");
              sessionManager.pressed.push("G");
              if(sessionManager.pressed.indexOf("G")>-1){
                  document.getElementById("letter-g-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-g-container").setAttribute("text", "color", "black");
                  console.log("holding down G");
              }
            }
            else if(indexPos[0]>-70&&indexPos[0]<-48&&indexPos[1]>165&&indexPos[1]<180){
            //  console.log("F");
              sessionManager.pressed.push("F");
              if(sessionManager.pressed.indexOf("F")>-1){
                  document.getElementById("letter-f-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-f-container").setAttribute("text", "color", "black");
                  console.log("holding down F");
              }
            }
            else if(indexPos[0]>-95&&indexPos[0]<-75&&indexPos[1]>165&&indexPos[1]<180){
            //  console.log("D");
              sessionManager.pressed.push("D");
              if(sessionManager.pressed.indexOf("D")>-1){
                  document.getElementById("letter-d-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-d-container").setAttribute("text", "color", "black");
                  console.log("holding down D");
              }
            }
            else if(indexPos[0]>-130&&indexPos[0]<-105&&indexPos[1]>165&&indexPos[1]<180){
            //  console.log("S");
              sessionManager.pressed.push("S");
              if(sessionManager.pressed.indexOf("S")>-1){
                  document.getElementById("letter-s-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-s-container").setAttribute("text", "color", "black");
                  console.log("holding down S");
              }
            }
            else if(indexPos[0]>-155&&indexPos[0]<-135&&indexPos[1]>165&&indexPos[1]<180){
            //  console.log("A");
              sessionManager.pressed.push("A");
              if(sessionManager.pressed.indexOf("A")>-1){
                  document.getElementById("letter-a-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-a-container").setAttribute("text", "color", "black");
                  console.log("holding down A");
              }
            }
            else if(indexPos[0]>-195&&indexPos[0]<-160&&indexPos[1]>165&&indexPos[1]<180){
              console.log("caps lock");
              sessionManager.pressed.push("caps-lock");
              if(sessionManager.pressed.indexOf("caps-lock")>-1){
                  document.getElementById("system-capslock-container").setAttribute("material", "color", "white");
                  document.getElementById("system-capslock-container").setAttribute("text", "color", "black");
                  console.log("holding down caps lock");
              }
            }
            else if(indexPos[0]>95&&indexPos[0]<115&&indexPos[1]>135&&indexPos[1]<160){
              //console.log(":");
              sessionManager.pressed.push("?");
              if(sessionManager.pressed.indexOf("?")>-1){
                  document.getElementById("punctuation-question-container").setAttribute("material", "color", "white");
                  document.getElementById("punctuation-question-container").setAttribute("text", "color", "black");
                  console.log("holding down ?");
              }

            }
            else if(indexPos[0]>65&&indexPos[0]<90&&indexPos[1]>135&&indexPos[1]<160){
              //console.log("greater than");
              sessionManager.pressed.push("greater-than");
              if(sessionManager.pressed.indexOf("greater-than")>-1){
                  document.getElementById("symbol-greaterthan-container").setAttribute("material", "color", "white");
                  document.getElementById("symbol-greaterthan-container").setAttribute("text", "color", "black");
                  console.log("holding down greater than|period");
              }
            }
            else if(indexPos[0]>40&&indexPos[0]<60&&indexPos[1]>135&&indexPos[1]<160){
  //            console.log("less than");
              sessionManager.pressed.push("less-than");
              if(sessionManager.pressed.indexOf("less-than")>-1){
                  document.getElementById("symbol-lessthan-container").setAttribute("material", "color", "white");
                  document.getElementById("symbol-lessthan-container").setAttribute("text", "color", "black");
                  console.log("holding down less than|comma");
              }
            }
            else if(indexPos[0]>15&&indexPos[0]<35&&indexPos[1]>135&&indexPos[1]<160){
              //console.log("M");
              sessionManager.pressed.push("M");
              if(sessionManager.pressed.indexOf("M")>-1){
                  document.getElementById("letter-m-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-m-container").setAttribute("text", "color", "black");
                  console.log("holding down M");
              }
            }
            else if(indexPos[0]>-12&&indexPos[0]<10&&indexPos[1]>135&&indexPos[1]<160){
              //console.log("N");
              sessionManager.pressed.push("N");
              if(sessionManager.pressed.indexOf("N")>-1){
                  document.getElementById("letter-n-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-n-container").setAttribute("text", "color", "black");
                  console.log("holding down N");
              }
            }
            else if(indexPos[0]>-43&&indexPos[0]<-17&&indexPos[1]>135&&indexPos[1]<160){
              //console.log("B");
              sessionManager.pressed.push("B");
              if(sessionManager.pressed.indexOf("B")>-1){
                  document.getElementById("letter-b-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-b-container").setAttribute("text", "color", "black");
                  console.log("holding down B");
              }
            }
            else if(indexPos[0]>-70&&indexPos[0]<-48&&indexPos[1]>135&&indexPos[1]<160){
            //  console.log("V");
              sessionManager.pressed.push("V");
              if(sessionManager.pressed.indexOf("V")>-1){
                  document.getElementById("letter-v-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-v-container").setAttribute("text", "color", "black");
                  console.log("holding down V");
              }
            }
            else if(indexPos[0]>-95&&indexPos[0]<-75&&indexPos[1]>135&&indexPos[1]<160){
            //  console.log("C");
              sessionManager.pressed.push("C");
              if(sessionManager.pressed.indexOf("C")>-1){
                  document.getElementById("letter-c-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-c-container").setAttribute("text", "color", "black");
                  console.log("holding down C");
              }
            }
            else if(indexPos[0]>-130&&indexPos[0]<-105&&indexPos[1]>135&&indexPos[1]<160){
            //  console.log("X");
              sessionManager.pressed.push("X");
              if(sessionManager.pressed.indexOf("X")>-1){
                  document.getElementById("letter-x-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-x-container").setAttribute("text", "color", "black");
                  console.log("holding down X");
              }
            }
            else if(indexPos[0]>-155&&indexPos[0]<-135&&indexPos[1]>135&&indexPos[1]<160){
            //  console.log("Z");
              sessionManager.pressed.push("Z");
              if(sessionManager.pressed.indexOf("Z")>-1){
                  document.getElementById("letter-z-container").setAttribute("material", "color", "white");
                  document.getElementById("letter-z-container").setAttribute("text", "color", "black");
                  console.log("holding down Z");
              }
            }
            else if(indexPos[0]>-195&&indexPos[0]<-160&&indexPos[1]>135&&indexPos[1]<160){
              console.log("shift");
              sessionManager.pressed.push("shift");
              if(sessionManager.pressed.indexOf("shift")>-1){
                  document.getElementById("system-leftshift-container").setAttribute("material", "color", "white");
                  document.getElementById("system-leftshift-container").setAttribute("text", "color", "black");
                  console.log("holding down left shift");
              }
            }
            else if(indexPos[0]>165&&indexPos[0]<185&&indexPos[1]>105&&indexPos[1]<130){
              //  console.log("RD");
                sessionManager.pressed.push("RD");
                if(sessionManager.pressed.indexOf("RD")>-1){
                    document.getElementById("dpad-right-container").setAttribute("material", "color", "white");
                    document.getElementById("dpad-right-container").setAttribute("text", "color", "black");
                    console.log("holding down RD");
                }
            }
            else if(indexPos[0]>143&&indexPos[0]<160&&indexPos[1]>95&&indexPos[1]<120){
              //  console.log("DD");
                sessionManager.pressed.push("DD");
                if(sessionManager.pressed.indexOf("DD")>-1){
                    document.getElementById("dpad-down-container").setAttribute("material", "color", "white");
                    document.getElementById("dpad-down-container").setAttribute("text", "color", "black");
                    console.log("holding down DD");
                }
            }
            else if(indexPos[0]>143&&indexPos[0]<160&&indexPos[1]>125&&indexPos[1]<145){
              //  console.log("UD");
                sessionManager.pressed.push("UD");
                if(sessionManager.pressed.indexOf("UD")>-1){
                    document.getElementById("dpad-up-container").setAttribute("material", "color", "white");
                    document.getElementById("dpad-up-container").setAttribute("text", "color", "black");
                    console.log("holding down UD");
                }
            }
            else if(indexPos[0]>120&&indexPos[0]<140&&indexPos[1]>105&&indexPos[1]<130){
              //  console.log("LD");
                sessionManager.pressed.push("LD");
                if(sessionManager.pressed.indexOf("LD")>-1){
                    document.getElementById("dpad-left-container").setAttribute("material", "color", "white");
                    document.getElementById("dpad-left-container").setAttribute("text", "color", "black");
                    console.log("holding down LD");
                }
            }
            else if(indexPos[0]>95&&indexPos[0]<115&&indexPos[1]>105&&indexPos[1]<130){
              //  console.log("ROPT");
                sessionManager.pressed.push("ROPT");
                if(sessionManager.pressed.indexOf("ROPT")>-1){
                    document.getElementById("system-rightoption-container").setAttribute("material", "color", "white");
                    document.getElementById("system-rightoption-container").setAttribute("text", "color", "black");
                    console.log("holding down ROPT");
                }
            }
            else if(indexPos[0]>65&&indexPos[0]<90&&indexPos[1]>105&&indexPos[1]<130){
              //  console.log("RCMD");
                sessionManager.pressed.push("RCMD");
                if(sessionManager.pressed.indexOf("RCMD")>-1){
                    document.getElementById("system-rightcommand-container").setAttribute("material", "color", "white");
                    document.getElementById("system-rightcommand-container").setAttribute("text", "color", "black");
                    console.log("holding down RCMD");
                }
            }
            else if(indexPos[0]>-85&&indexPos[0]<60&&indexPos[1]>105&&indexPos[1]<130){
            //  console.log("SPCE");
              sessionManager.pressed.push("SPCE");
              if(sessionManager.pressed.indexOf("SPCE")>-1){
                  document.getElementById("space-bar-container").setAttribute("material", "color", "white");
                  document.getElementById("space-bar-container").setAttribute("text", "color", "black");
                  console.log("holding down SPCE");
              }
            }
            else if(indexPos[0]>-105&&indexPos[0]<-90&&indexPos[1]>105&&indexPos[1]<130){
            //  console.log("CMD");
              sessionManager.pressed.push("CMD");
              if(sessionManager.pressed.indexOf("CMD")>-1){
                  document.getElementById("system-leftcommand-container").setAttribute("material", "color", "white");
                  document.getElementById("system-leftcommand-container").setAttribute("text", "color", "black");
                  console.log("holding down left CMD button");
              }
            }
            else if(indexPos[0]>-130&&indexPos[0]<-110&&indexPos[1]>105&&indexPos[1]<130){
            //  console.log("OPTION");
              sessionManager.pressed.push("OPTION");
              if(sessionManager.pressed.indexOf("OPTION")>-1){
                  document.getElementById("system-leftoption-container").setAttribute("material", "color", "white");
                  document.getElementById("system-leftoption-container").setAttribute("text", "color", "black");
                  console.log("holding downleft OPTION button");
              }
            }
            else if(indexPos[0]>-155&&indexPos[0]<-135&&indexPos[1]>105&&indexPos[1]<130){
            //  console.log("CTRL");
              sessionManager.pressed.push("CTRL");
              if(sessionManager.pressed.indexOf("CTRL")>-1){
                  document.getElementById("system-leftcontrol-container").setAttribute("material", "color", "white");
                  document.getElementById("system-leftcontrol-container").setAttribute("text", "color", "black");
                  console.log("holding down left CTRL button");
              }
            }
            else if(indexPos[0]>-195&&indexPos[0]<-160&&indexPos[1]>105&&indexPos[1]<130){
              console.log("FN");
              sessionManager.pressed.push("FN");
              if(sessionManager.pressed.indexOf("FN")>-1){
                  document.getElementById("system-function-container").setAttribute("material", "color", "white");
                  document.getElementById("system-function-container").setAttribute("text", "color", "black");
                  console.log("holding down FN button");
              }
            }
            else{
              console.log(indexPos[1]);
              if(sessionManager.pressed.length>0){
                sessionManager.pressed = [];
                let buttons = document.getElementsByClassName("keyboard-button-container");
                for(var q=0; q<buttons.length; q++){
                  (function(){
                    buttons.item(q).setAttribute("material", "color", "black");
                    buttons.item(q).setAttribute("text", "color", "white");
                  })();
                }
              }
            }
            /*
            *
            * for every item in the object objectManager
            * check its margins
            * if the center of the indexFinger's distal bone is within the margins of the object
            * change the object's background color to black and text color to white
            * other wise keep the background color gray
            *
            */
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

    renderer.render(scene, camera);
})
.connect();
