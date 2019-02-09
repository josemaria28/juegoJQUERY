// Puntuacion
var puntuacionJ1 = 0;
// Vida
var vidaJ1 = 100;
// Tiempo
var cAtras = 1000;
// Manejador //
$(document).ready(function(){
	
	ocultarCapa("#contenedor");
	//ocultarCapa("#juego1");
	ocultarCapa("#gmOver");

	// Ocultar Inicio Juego
	/*$(document).click(function(){
		nivel1();
	});*/
	$(document).keydown(function(tecla){
		if (tecla.keyCode == 13){
			nivel1();
		}
	});
	// Movimiento Actor
	var ultimoMovimiento = "nada";
	$(document).keydown(function(tecla){
		if (tecla.keyCode == 40) {// Down
			$('#actor1').animate({top: "+=15px"},30);
			//$('#actor1').attr("src","imagenes/animadoZ1.gif");
			$('#actor1').width("7%");
			ultimoMovimiento = "abajo";
		}else if(tecla.keyCode == 38) {// Up
			$('#actor1').animate({top: "-=15px"},30);
			//$('#actor1').attr("src","imagenes/animadoZ2.gif");
			ultimoMovimiento = "arriba";
			$('#actor1').width("7%");
		}else if(tecla.keyCode == 37){// Right
			$('#actor1').animate({left: "+=-15px"},30);
			$('#actor1').attr("src","imagenes/animadoZ3.gif");
			$('#actor1').width("7%");
			ultimoMovimiento = "izquerda";
		}
		else if(tecla.keyCode == 39){// Left
			$('#actor1').animate({left: "+=15px"},30);
			$('#actor1').attr("src","imagenes/animadoZ.gif");
			$('#actor1').width("7%");
			ultimoMovimiento = "derecha";
		}
	});

	$(document).keyup(function(tecla){
		if (tecla.keyCode == 40) {// Up
			$('#actor1').animate({top: "+=15px"},30);
			$('#actor1').width("7%");
			ultimoMovimiento = "arriba";
		}else if(tecla.keyCode == 38) {// Down
			$('#actor1').animate({top: "-=15px"},30);
			// ultimoMovimiento = "abajo";
			$('#actor1').width("7%");
		}else if(tecla.keyCode == 37){// Left
			$('#actor1').animate({left: "+=-15px"},30);
			$('#actor1').attr("src","imagenes/animadoZ1.gif");
			$('#actor1').width("7%");
			ultimoMovimiento = "derecha";
		}
		else if(tecla.keyCode == 39){// Right
			$('#actor1').animate({left: "+=15px"},30);
			$('#actor1').attr("src","imagenes/animadoZ2.gif");
			$('#actor1').width("7%");
			ultimoMovimiento = "izquerda";
		}
	});

	// Disparar
	$(document).keydown(function(tecla){
		if(tecla.keyCode == 32){
			disparo(ultimoMovimiento);
		}
	});

});

// Funciones

function ocultarCapa(capa){
	$(capa).hide();
}
function mostrarCapa(capa){
	$(capa).show();
}
function disparo(ultimoMovimiento){
	//alert(ultimoMovimiento)
	switch (ultimoMovimiento) {
		case "arriba":// Up
			// Disparar
			$("#actor1").append('<img id="balaArriba" src="../imagenes/balaArriba.gif">');
			//m3 = setInterval(movimientoBalaA,5);
			//m4 = setInterval(detectarColisionBalaA,5);
			break;
		case "abajo":// Down
			// Disparar
			$("#malo2").append('<img id="balaAbajo" src="imagenes/balaArriba.gif">');
			break;
		case "derecha":// Left
			// Disparar
			$("#actor1").append('<img id="balaDer" src="imagenes/balaDer.gif">');
			//movimientoBalaD();
			break;
		case "izquierda":// Rigth
			// Disparar
			$("#actor1").append('<img id="balaIzq" src="imagenes/balaIzq.gif">');
			//movimientoBalaI();
			break;
	}
}
// Balas
function movimientoBalaA(){
	$("#balaA").animate({top: "+=3px"},1);
}
function detectarColisionBalaA(){
	var bColision = collision($('#balaA'),$('#sueloH'));

	if( bColision > 0){
		$('#balaA').stop(true);
		clearInterval(m3);
		clearInterval(m4);
		$('#balaA').remove();
	}
}

//Tiempo RELOJ
function iniciarR (tiempo) {
	// Tiempo
	setInterval(cuentAtras,tiempo);
	$(".cuentaAtras").html(cAtras);
}
function cuentAtras(){
	if (cAtras > 0) {
		--cAtras;
	}else {
		ocultarCapa("#juego1");
		ocultarCapa("#contenedor");
		mostrarCapa("#gmOver");
		$(".pTotalJ1").html(puntuacionJ1);
		//alert("GAME OVER");
	}
	$(".cuentaAtras").html(cAtras);
}


setInterval(detectarColisionD,5);
setInterval(detectarColisionI,5);
setInterval(detectarColisionA,5);
setInterval(detectarColisionB,5);
//setInterval(detectarColisionMaloD,5);
//setInterval(detectarColisionMaloI,5);

function detectarColisionD(){
	var bColision = collision($('#actor1'),$('#paredD'));

	if( bColision > 0){
		$("#actor1").stop(false,false);   
		$('#actor1').animate({left: "+=-3px"},1);   
	}
}
function detectarColisionI(){
	var bColision = collision($('#actor1'),$('#paredI'));

	if( bColision > 0){
		$("#actor1").stop(false,false);   
		$('#actor1').animate({left: "+=3px"},1);   
	}
}
function detectarColisionA(){
	var bColision = collision($('#actor1'),$('#sueloS'));

	if( bColision > 0){
		$("#actor1").stop(false,false);   
		$('#actor1').animate({top: "+=3px"},1);   
	}
}
function detectarColisionB(){
	var bColision = collision($('#actor1'),$('#sueloM'));

	if( bColision > 0){
		$("#actor1").stop(false,false);   
		$('#actor1').animate({top: "+=-3px"},1);   
	}
}

function collision(jqDiv1, jqDiv2) {
	var x1 = jqDiv1.offset().left;
	var y1 = jqDiv1.offset().top;

	var h1 = jqDiv1.outerHeight(true);
	var w1 = jqDiv1.outerWidth(true);

	var b1 = y1 + h1;
	var r1 = x1 + w1;

	var x2 = jqDiv2.offset().left;
	var y2 = jqDiv2.offset().top;

	var h2 = jqDiv2.outerHeight(true);
	var w2 = jqDiv2.outerWidth(true);

	var b2 = y2 + h2;
	var r2 = x2 + w2;
	
	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
	return true;
}


function nNivel(nTexto){
	$(".textNivel").html(nTexto);
}
var nMalos=0;
// Niveles
function nivel1(){
	ocultarCapa("#contenedor");
	mostrarCapa("#juego1");
	//iniciarR(50);
	nNivel("NIVEL 1");
	crearMalos();
	setInterval(colisionMaloActor,10);
	//setInterval(rVida,1000);
	//rVida();
	//cMalo();
	// setInterval(mMueMaloD,10);
	//iniciarR(200);
	//setInterval(colisionMaloActor,10);
	// Malos Superados
	if (nMalos > 2) {
		alert("Superaste NIVEL 1");
		nivel2();
	}
}
function nivel2(){
	nMalos=0;
	iniciarR(50);
	nNivel("NIVEL 2");
	if (nMalos > 4) {
		alert("Superaste NIVEL 2");
		nivel3();
	}
}
function nivel3(){
	nMalos=0;
	iniciarR(200);
	nNivel("NIVEL 3");
	if (nMalos > 2) {
		alert("Superaste NIVEL 3");
		nivel4();
	}
}
function nivel4(){
	nMalos=0;
	iniciarR(90);
	nNivel("NIVEL 4");
	if (nMalos > 4) {
		alert("Ganaste");
	}
}

// Crear Malos POR INTERVALOS
var m1,m2,m3,m4,m5,m6,m7,m8 = null;
function crearMalos(){
	$("#juego1").append('<img id="malo1">');
	m1 = setInterval(moverMaloD,5);
	m2 = setInterval(detectarColisionMaloD,5);
}

// Randon IMG MALOS

// Movimiento Malo
function moverMaloD(){
	$("#malo1").animate({left: "+=3px"},10);
	$("#malo1").attr("src","imagenes/malos/m2.0.gif");
}
function mMueMaloI(){
	$('#malo1').animate({left: "-=3px"},10);
	$('#malo1').attr("src","imagenes/malos/m2.1.gif");
}

function detectarColisionMaloD(){
	var bColision = collision($('#malo1'),$('#paredD'));

	if( bColision > 0){
		$('#malo1').stop(true);
		clearInterval(m1);
		clearInterval(m2);
		m1 = setInterval(mMueMaloI,5);
		m2 = setInterval(detectarColisionMaloI,5);
	}
}

function detectarColisionMaloI(){
	var bColision = collision($('#malo1'),$('#paredI'));

	if( bColision > 0){
		$('#malo1').stop(true);
		clearInterval(m1);
		clearInterval(m2);
		m1 = setInterval(moverMaloD,5);
		m2 = setInterval(detectarColisionMaloD,5);
	}
}

// Colision Personaje
function colisionMaloActor(){
	var bColision = collision($('#malo1'),$('#actor1'));

	if( bColision > 0){
		$('#malo1').stop(true);
		--nVidas;
		rVida();
		$("#actor1").css("left", "80%");
		clearInterval(m1);
		clearInterval(m2);
		m1 = setInterval(mMueMaloI,5);
		m2 = setInterval(detectarColisionMaloI,5);
	}
}
// Vida
var contadorVida = 100;
var nVidas = 3;
function rVida(){
	switch (nVidas) {
		case 2:
			$(".progress").width((contadorVida-=35)+"%");
			break;
		case 1:
			$(".progress").width((contadorVida-=35)+"%");
			break;
		case 0:
			$(".pTotalJ1").html(puntuacionJ1);
			mostrarCapa("#gmOver");
			break;
	}

}
