//import * as THREE from 'three';
//import * as TWEEN from '@tweenjs/tween.js';
//import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
//import { TrackballControls } from './controls/TrackballControls.js';


let table = [
        "A", "A", " ", 1, 1, "bookcovers/A_TheDivineComedy.jpg",
		"B", "B", " ", 2, 1, "bookcovers/B_2666.jpg",
		"C", "C", " ", 3, 1, "bookcovers/C_DonQuixote.jpg",
		"D", "D", " ", 4, 1, "bookcovers/D_CrimeAndPunishment.jpg",
		"E", "E", " ", 5, 1, "bookcovers/E_AmericanPsycho.jpg",
		"F", "F", " ", 6, 1, "bookcovers/F_TheCorrections.jpg",
		"G", "G", " ", 7, 1, "bookcovers/G_LifeAndFate.jpg",
		"H", "H", " ", 8, 1, "bookcovers/H_ElementaryParticles.jpg",
		"I", "I", " ", 9, 1, "bookcovers/I_NeverLetMeGo.jpg",
		"J", "J", " ", 10, 1, "bookcovers/J_Ulysses.jpg",
		"K", "K", " ", 11, 1, "bookcovers/K_SometimesAGreatNotion.jpg",		
		"L", "L", " ", 12, 1, "bookcovers/L_ThreeBodyProblem.jpg",
		"M", "M", " ", 13, 1, "bookcovers/M_BloodMeridian.jpg",
		"N", "N", " ", 14, 1, "bookcovers/N_Lolita.jpg",
		"O", "O", " ", 15, 1, "bookcovers/O_Hamnet.jpg",
		"P", "P", " ", 16, 1, "bookcovers/P_GravitysRainbow.jpg",
		//"Q", "Q", " ", 5, 1, "Q_.jpg"
		"R", "R", " ", 17, 1, "bookcovers/R_Shantaram.jpg",
		"S", "S", " ", 18, 1, "bookcovers/S_Snowcrash.jpg",
		"T", "T", " ", 1, 2, "bookcovers/T_WarAndPeace.jpg",
		"U", "U", " ", 2, 2, "bookcovers/U_RabbitRun.jpg",
		"V", "V", " ", 3, 2, "bookcovers/V_PlayerPiano.jpg",
		"W", "W", " ", 4, 2, "bookcovers/W_OLost.jpg",
		//"X", "X", " ", 5, 1, "X_.jpg"
		"Y", "Y", " ", 5, 2, "bookcovers/Y_RevolutionaryRoad.jpg"
		//"Z", "Z", " ", 5, 1, "Z_.jpg"
        
    ];
	
	
 
	
	
	
console.log(table);


    
let camera, scene, renderer, controls, composer;
var hblur, vblur;
let targets = {simple: [], table: [], sphere: [], helix: [], grid: [], back:[]};

init();
animate();

function init() {

    initCamera();

    initScene();

    initObjects();

    addClickListeners();

    initRenderer();

    initTrackbarControls();

    transform(targets.table, 2000);

    window.addEventListener('resize', onWindowResize, false);

}





function initCamera() {

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 3000;

}

function initScene() {

    scene = new THREE.Scene();

}

function initRenderer() {

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);
}

function initObjects() {

    simpleObjectsLayout();
    generateGeometricLayouts();

}

function addClickListeners() {

    addClickListener(targets.table, 'table');
    addClickListener(targets.sphere, 'sphere');
    addClickListener(targets.helix, 'helix');
    addClickListener(targets.grid, 'grid');
	addClickListener(targets.back, 'back');

}

function simpleObjectsLayout() {

    for (let i = 0; i < table.length; i += 6) {

        let object = new THREE.CSS3DObject(htmlElement(table, i));
        object.position.x = Math.random() * 4000 - 2000;
        object.position.y = Math.random() * 4000 - 2000;
        object.position.z = Math.random() * 4000 - 2000;

        scene.add(object);
        targets.simple.push(object);
        tableLayout(table, i);

    }

}
function htmlElement(table, i) {
   // console.log("Creating element for: " + table[i + 1]);

	//console.log(table);
	


    // Do something when the table is clicked
 //   console.log('The table was clicked!');
 
 
    let element = document.createElement('div');
    element.className = 'element';
    element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';
    element.id = "uniqueID" + i; // Give the element a unique ID



    let image = document.createElement( 'div' );
    image.className = 'gallery';
    image.innerHTML = '<img src=' + table[ i + 5 ] + ' width="80" height="130" >';
    element.appendChild( image );

    let details = document.createElement('div');
    details.className = 'details';
    details.innerHTML = table[i + 1] + '<br>' + table[i + 2];
    element.appendChild(details);

	//console.log("here:");
	//console.log(element);

    // Uncomment the next line to add the click event listener back
   // element.addEventListener('click', ()=>elementClickHandler(i), false);
	//element.addEventListener('pointerdown', () => {  elementClickHandler(i);})

 ///   element.addEventListener('pointerdown', () => { alert(1) })
	//element.addEventListener('pointerdown', function() {
	//		console.log("here");
	//		console.log(`Clicked on tile: ${table[i + 1]}`);
//			elementClickHandler(i);
//		}, false);

element.addEventListener("pointerdown", function() {
  console.log("CLICKED.");
  elementClickHandler(i);
})




    return element;
}



//function elementClickHandler(i) {
//  console.log(`Clicked on tile: ${table[i + 1]}`);

  // Add the click event listener to the table object
//  table.addEventListener('click', function() {
    // Do something when the table is clicked
 //   console.log('The table was clicked!');
 // });
//}

function updateTable(newTableData) {
    // clear scene
    for (let i = scene.children.length - 1; i >= 0; i--) {
        scene.remove(scene.children[i]);
    }

    // reset targets
    targets = {simple: [], table: [], sphere: [], helix: [], grid: [], back:[]};

    // reinitialize table
    table = newTableData;

    // reinitialize objects
    simpleObjectsLayout();
    generateGeometricLayouts();

    // draw new table
    transform(targets.table, 2000);

  // Create the "Go Back" button
// Get the "Go Back" button from the HTML
let backButton = document.getElementById("back");

console.log(backButton);


// Add a click event listener to the button
backButton.addEventListener("click", function() {
    // Define the original table data
    let tableOriginal = [

        "A", "A", " ", 1, 1, "bookcovers/A_TheDivineComedy.jpg",
		"B", "B", " ", 2, 1, "bookcovers/B_2666.jpg",
		"C", "C", " ", 3, 1, "bookcovers/C_DonQuixote.jpg",
		"D", "D", " ", 4, 1, "bookcovers/D_CrimeAndPunishment.jpg",
		"E", "E", " ", 5, 1, "bookcovers/E_AmericanPsycho.jpg",
		"F", "F", " ", 6, 1, "bookcovers/F_TheCorrections.jpg",
		"G", "G", " ", 7, 1, "bookcovers/G_LifeAndFate.jpg",
		"H", "H", " ", 8, 1, "bookcovers/H_ElementaryParticles.jpg",
		"I", "I", " ", 9, 1, "bookcovers/I_NeverLetMeGo.jpg",
		"J", "J", " ", 10, 1, "bookcovers/J_Ulysses.jpg",
		"K", "K", " ", 11, 1, "bookcovers/K_SometimesAGreatNotion.jpg",		
		"L", "L", " ", 12, 1, "bookcovers/L_ThreeBodyProblem.jpg",
		"M", "M", " ", 13, 1, "bookcovers/M_BloodMeridian.jpg",
		"N", "N", " ", 14, 1, "bookcovers/N_Lolita.jpg",
		"O", "O", " ", 15, 1, "bookcovers/O_Hamnet.jpg",
		"P", "P", " ", 16, 1, "bookcovers/P_GravitysRainbow.jpg",
		//"Q", "Q", " ", 5, 1, "Q_.jpg"
		"R", "R", " ", 17, 1, "bookcovers/R_Shantaram.jpg",
		"S", "S", " ", 18, 1, "bookcovers/S_Snowcrash.jpg",
		"T", "T", " ", 1, 2, "bookcovers/T_WarAndPeace.jpg",
		"U", "U", " ", 2, 2, "bookcovers/U_RabbitRun.jpg",
		"V", "V", " ", 3, 2, "bookcovers/V_PlayerPiano.jpg",
		"W", "W", " ", 4, 2, "bookcovers/W_OLost.jpg",
		//"X", "X", " ", 5, 1, "X_.jpg"
		"Y", "Y", " ", 5, 2, "bookcovers/Y_RevolutionaryRoad.jpg"
		//"Z", "Z", " ", 5, 1, "Z_.jpg"
    
		//"A", "A", " ", 1, 1, "A_TheDivineComedy.jpg",
		//"B", "B", " ", 2, 1, "B_2666.jpg",
		//"C", "C", " ", 3, 1, "C_DonQuixote.jpg",
		//"D", "D", " ", 4, 1, "D_CrimeAndPunishment.jpg",
		//"E", "E", " ", 5, 1, "E_AmericanPsycho.jpg"
		
		//"A", "The Divine Comedy", "- Dante Alighieri", 1, 1, "A_TheDivineComedy.jpg",
        //"A", "A Handmaid's Tale", "- Margaret Atwood", 2, 1, "A_AHandmaidsTale.jpg",
        //"A", "The White Tiger", "- Aravind Adiga", 3, 1, "A_TheWhiteTiger.jpg",
        //"A", "Brass", "- Xhenet Aliu", 4, 1, "A_Brass.jpg"
    ];
	updateTable(tableOriginal);

    // Reset the table with the original data
    //resetTable(tableOriginal);
});




}








function elementClickHandler(i) {
	console.log("made it here");
	
	//console.log(i);
	//console.log(table);
	
	//console.log(`Clicked on tile: ${table[i + 1]}`);
	
	
  if (table[i] === "A" && table[i + 1] === "A") 
  {
	const tablea = [
	  "A", "A", " ", 1, 1, "bookcovers/A_TheDivineComedy.jpg"
	];
	console.log(tablea);
	updateTable(tablea);
	  
  }
  
  else if (table[i] === "B" && table[i + 1] === "B") 
  {
	const tableb = [
	  "B", "B", " ", 1, 1, "bookcovers/B_2666.jpg"
    ];
	console.log(tableb);
    updateTable(tableb);
  
  }

  else if (table[i] === "C" && table[i + 1] === "C") 
  {
	const tablec = [
	  "C", "C", " ", 1, 1, "bookcovers/C_DonQuixote.jpg"
    ];
	console.log(tablec);
    updateTable(tablec);  
  }
  

  else if (table[i] === "D" && table[i + 1] === "D") 
  {
	const tabled = [
	"D", "D", " ", 1, 1, "bookcovers/D_CrimeAndPunishment.jpg"
    ];
	console.log(tabled);
    updateTable(tabled);
  
  }

 		
  else if (table[i] === "E" && table[i + 1] === "E") 
  {
	const tablee = [
	"E", "E", " ", 1, 1, "bookcovers/E_AmericanPsycho.jpg"
    ];
	console.log(tablee);
    updateTable(tablee);
  
  }
  
  else if (table[i] === "F" && table[i + 1] === "F") 
  {
	const tablef = [
	"F", "F", " ", 1, 1, "bookcovers/F_TheCorrections.jpg"
    ];
	console.log(tablef);
    updateTable(tablef);
  
  }
  
  
  else if (table[i] === "G" && table[i + 1] === "G") 
  {
	const tableg = [
	"G", "G", " ", 1, 1, "bookcovers/G_LifeAndFate.jpg"
    ];
	console.log(tableg);
    updateTable(tableg);
  
  }  
			
  
  else if (table[i] === "H" && table[i + 1] === "H") 
  {
	const tableh = [
	"H", "H", " ", 1, 1, "bookcovers/H_ElementaryParticles.jpg"
    ];
	console.log(tableh);
    updateTable(tableh);
  
  }
  
   else if (table[i] === "I" && table[i + 1] === "I") 
  {
	const tablei = [
		"I", "I", " ", 1, 1, "bookcovers/I_NeverLetMeGo.jpg"
    ];
	console.log(tablei);
    updateTable(tablei);
  
  }
 	
  else if (table[i] === "J" && table[i + 1] === "J") 
  {
	const tablej = [
	"J", "J", " ", 1, 1, "bookcovers/J_Ulysses.jpg"
    ];
	console.log(tablej);
    updateTable(tablej);
  
  }
     else if (table[i] === "K" && table[i + 1] === "K") 
  {
	const tablek = [
		"K", "K", " ", 1, 1, "bookcovers/K_SometimesAGreatNotion.jpg"	
    ];
	console.log(tablek);
    updateTable(tablek);
  
  }
     else if (table[i] === "L" && table[i + 1] === "L") 
  {
	const tablel = [
		
		"L", "L", " ", 1, 1, "bookcovers/L_ThreeBodyProblem.jpg"
    ];
	console.log(tablel);
    updateTable(tablel);
  
  }
     else if (table[i] === "M" && table[i + 1] === "M") 
  {
	const tablem = [
		"M", "M", " ", 1, 1, "bookcovers/M_BloodMeridian.jpg"
    ];
	console.log(tablem);
    updateTable(tablem);
    
  }
    else if (table[i] === "N" && table[i + 1] === "N") 
  {
	const tablen = [
	"N", "N", " ", 1, 1, "bookcovers/N_Lolita.jpg"
    ];
	console.log(tablen);
    updateTable(tablen);
  
  }
  
 	
	 else if (table[i] === "O" && table[i + 1] === "O") 
  {
	const tableo = [
	"O", "O", " ", 1, 1, "bookcovers/O_Hamnet.jpg"
    ];
	console.log(tableo);
    updateTable(tableo);
  
  }
    else if (table[i] === "P" && table[i + 1] === "P") 
  {
	const tablep = [
	"P", "P", " ", 1, 1, "bookcovers/P_GravitysRainbow.jpg"
		
    ];
	console.log(tablep);
    updateTable(tablep);
  
  }
    else if (table[i] === "R" && table[i + 1] === "R") 
  {
	const tabler = [
		"R", "R", " ", 1, 1, "bookcovers/R_Shantaram.jpg"
    ];
	console.log(tabler);
    updateTable(tabler);
  
  }	
		
		
	else if (table[i] === "S" && table[i + 1] === "S") 
  {
	const tables = [
	"S", "S", " ", 1, 1, "bookcovers/S_Snowcrash.jpg"
    ];
	console.log(tables);
    updateTable(tables);
  
  }
  else if (table[i] === "T" && table[i + 1] === "T") 
  {
	const tablet = [
		"T", "T", " ", 1, 1, "bookcovers/T_WarAndPeace.jpg"
    ];
	console.log(tablet);
    updateTable(tablet);
  
  }
  else if (table[i] === "U" && table[i + 1] === "U") 
  {
	const tableu = [
		"U", "U", " ", 1, 1, "bookcovers/U_RabbitRun.jpg"
    ];
	console.log(tableu);
    updateTable(tableu);
  
  }
  	
		
			
	else if (table[i] === "V" && table[i + 1] === "V") 
  {
	const tablev = [
		"V", "V", " ", 1, 1, "bookcovers/V_PlayerPiano.jpg"
    ];
	console.log(tablev);
    updateTable(tablev);
  
  }
  
  
  
 	else if (table[i] === "W" && table[i + 1] === "W")
  {
	const tablew = [
		"W", "W", " ", 1, 1, "bookcovers/W_OLost.jpg"
    ];
	console.log(tablew);
    updateTable(tablew);
  
  }	
		
		  else if (table[i] === "Y" && table[i + 1] === "Y") 
  {
	const tabley = [
		"Y", "Y", " ", 1, 1, "bookcovers/Y_RevolutionaryRoad.jpg"
    ];
	console.log(tabley);
    updateTable(tabley);
  
  }	
/*	  
	//  console.log(`Clicked on tile: ${table[i + 1]}`);
	  
    // Navigate to the same HTML page with the new table
    const newTable = [
      "B", "2666", "- Roberto Bolano", 1, 1, "B_2666.jpg",
      "B", "The Savage Dedectives", "- Roberto Bolano", 2, 1, "B_TheSavageDedectives.jpg",
      "B", "The Darling", "- Russell Banks", 3, 1, "B_TheDarling.jpg",
      "B", "Rule of the Bone", "- Russell Banks", 4, 1, "B_RuleoftheBone.jpg"//,
      //"B", "Cloudsplitter", "- Russell Banks", 9, 1, "B_Cloudsplitter.jpg"
    ];
    localStorage.setItem('table', JSON.stringify(newTable));
    window.location.reload();
  } else {
    transform(targets.table, 1000);
    new TWEEN.Tween(targets.simple[i / 6].position)
      .to(
        {
          x: 0,
          y: 0,
          z: 2500
        },
        Math.random() * 2000 + 2000
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    new TWEEN.Tween(this)
      .to({}, 2000 * 2)
      .onUpdate(render)
      .start();
  }
*/
}




function tableLayout(table, index) {

    let object = new THREE.Object3D();

    object.position.x = (table[index + 3] * 140) - 1330;
    object.position.y = -(table[index + 4] * 180) + 990;
    targets.table.push(object);

}

function addClickListener(target, elementId) {

    const button = document.getElementById(elementId);

    button.addEventListener('click', function () {
        transform(target, 2000);
    }, false);

}

function initTrackbarControls() {
    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener('change', render);
}

function generateGeometricLayouts() {

    let sphereVector = new THREE.Vector3();
    let helixVector = new THREE.Vector3();

    for (let i = 0, l = targets.simple.length; i < l; i++) {
        addSphereObject(sphereVector, i, l);
        addHelixObject(helixVector, i);
        addGridObject(i);
    }

}

function addSphereObject(sphereVector, index, length) {

    const phi = Math.acos(-1 + (2 * index) / length);
    const theta = Math.sqrt(length * Math.PI) * phi;
    let object = new THREE.Object3D();

    object.position.setFromSphericalCoords(800, phi, theta);

    sphereVector.copy(object.position).multiplyScalar(2);

    object.lookAt(sphereVector);

    targets.sphere.push(object);
}

function addHelixObject(helixVector, index) {

    const theta = index * 0.175 + Math.PI;
    const y = -(index * 8) + 450;
    let object = new THREE.Object3D();

    object.position.setFromCylindricalCoords(900, theta, y);

    helixVector.x = object.position.x * 2;
    helixVector.y = object.position.y;
    helixVector.z = object.position.z * 2;

    object.lookAt(helixVector);

    targets.helix.push(object);
}

function addGridObject(index) {

    let object = new THREE.Object3D();
    object.position.x = ((index % 6) * 400) - 800;
    object.position.y = (-(Math.floor(index / 5) % 5) * 400) + 800;
    object.position.z = (Math.floor(index / 25)) * 1000 - 2000;
    targets.grid.push(object);

}

function transform(target, duration) {

    TWEEN.removeAll();

    for (let i = 0; i < targets.simple.length; i++) {
        let object = targets.simple[i];
        let targetObject = target[i];
        transformObjectPosition(object, targetObject, duration);
        transformObjectRotation(object, targetObject, duration);
    }

    new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(render)
        .start();

}

function transformObjectPosition(object, targetObject, duration) {

    new TWEEN.Tween(object.position)
        .to({
            x: targetObject.position.x,
            y: targetObject.position.y,
            z: targetObject.position.z
        }, Math.random() * duration + duration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();

}

function transformObjectRotation(object, targetObject, duration) {

    new TWEEN.Tween(object.rotation)
        .to({
            x: targetObject.rotation.x,
            y: targetObject.rotation.y,
            z: targetObject.rotation.z
        }, Math.random() * duration + duration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();

}

function render() {

    renderer.render(scene, camera);

}

//function animate() {
//
//    requestAnimationFrame(animate);
//    TWEEN.update();
//    controls.update();
//    composer.render();
//}

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    controls.update();
    render(); // Call the render function directly instead of composer.render()
}
