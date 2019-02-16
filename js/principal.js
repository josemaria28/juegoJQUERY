// Puntuacion
var puntuacionJ1 = 0;
// Vida
var vidaJ1 = 100;
// Tiempo
var cAtras = 1000;
// Numero de malos
var nMalos=0;

var m1,m2,m3,m4,m5,m6,m7,m8, m9, m10 = null;
// Manejador //
$(document).ready(function(){
	$(function(){
				$("#accordion").accordion();
			});
			  $( function() {
    $( "#dialog" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "blind",
        duration: 1000
      }
    });
 
    $( "#opener" ).on( "click", function() {
      $( "#dialog" ).dialog( "open" );
    });
  } );
	ocultarCapa("#juego1");
	ocultarCapa("#gmOver");
	ocultarCapa("#ganador");
	
	$(document).keydown(function(tecla){
		if (tecla.keyCode == 13){
			nivel1();
		}
	});
	// Movimiento Actor
	var ultimoMovimiento = "nada";
	$(document).keydown(function(tecla){
		if (tecla.keyCode == 40) {// Down
			$('#actor2').animate({top: "+=15px"},30);
		}else if(tecla.keyCode == 38) {// Up
			$('#actor2').animate({top: "-=15px"},30);
		}else if(tecla.keyCode == 37){// Right
			$('#actor2').animate({left: "+=-15px"},30);
			$('#actor22').attr("src","imagenes/animadoZ3.gif");
			ultimoMovimiento = "izquerda";
		}
		else if(tecla.keyCode == 39){// Left
			$('#actor2').animate({left: "+=15px"},30);
			$('#actor22').attr("src","imagenes/animadoZ.gif");
			ultimoMovimiento = "derecha";
		}else if (tecla.keyCode == 73) {// Informacion
			$(function(){
				$("#accordion").accordion();
			});
		}
	});

	$(document).keyup(function(tecla){
		if (tecla.keyCode == 40) {// Up
			$('#actor2').animate({top: "+=15px"},30);
		}else if(tecla.keyCode == 38) {// Down
			$('#actor2').animate({top: "-=15px"},30);
		}else if(tecla.keyCode == 37){// Left
			$('#actor2').animate({left: "+=-15px"},30);
			$('#actor22').attr("src","imagenes/animadoZ1.gif");
			ultimoMovimiento = "derecha";
		}
		else if(tecla.keyCode == 39){// Right
			$('#actor2').animate({left: "+=15px"},30);
			$('#actor22').attr("src","imagenes/animadoZ2.gif");
			ultimoMovimiento = "izquierda";
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
	var elemento = $("#actor2");
	var posicion = elemento.position();
	// alert( "left: " + posicion.left + ", top: " + posicion.top );
	switch (ultimoMovimiento) {
		case "derecha":// Left
			// Disparar
			$("#juego1").append('<img id="balaDer" src="imagenes/balaDer.gif">');
			$("#balaDer").css({"left": posicion.left-150, "top": posicion.top-220});
			m3 = setInterval(movimientoBalaD,5);
			m4 = setInterval(colisionBalaD,5);
			m5 = setInterval(colisionBalaMalo,5);
			break;
		case "izquierda":// Rigth
			// Disparar
			$("#juego1").append('<img id="balaIzq" src="imagenes/balaIzq.gif">');
			$("#balaIzq").css({"left": posicion.left-80, "top": posicion.top-220});
			m6 = setInterval(movimientoBalaI,5);
			m7 = setInterval(colisionBalaI,5);
			m8 = setInterval(colisionBalaMaloI,5);
			break;
	}
}
// Balas
function movimientoBalaD(){
	$("#balaDer").animate({left: "-=6px"},1);
}
function movimientoBalaI(){
	$("#balaIzq").animate({left: "+=6px"},1);
}
function colisionBalaI(){
	var bColision = collision($('#balaIzq'),$('#paredD'));

	if( bColision > 0){
		$('#balaIzq').stop(true);
		$('#balaIzq').remove();
		clearInterval(m6);
		clearInterval(m7);
	}
	
}
function colisionBalaMaloI(){
	var bColision = collision($('#balaIzq'),$('#malo1'));

	if( bColision > 0){
		$('#malo1').stop(true);
		$('#balaIzq').stop(true);
		$('#balaIzq').remove();
		$('#malo1').remove();
		clearInterval(m1);
		clearInterval(m2);
		clearInterval(m6);
		clearInterval(m7);
		clearInterval(m8);
		nMalos++;
		crearMalos();
		pasarNivel();
		puntuacion();
	}
}

function colisionBalaD(){
	var bColision = collision($('#balaDer'),$('#paredI'));

	if( bColision > 0){
		$('#balaDer').stop(true);
		$('#balaDer').remove();
		clearInterval(m3);
		clearInterval(m4);
	}
	
}
function colisionBalaMalo(){
	var bColision = collision($('#balaDer'),$('#malo1'));

	if( bColision > 0){
		$('#malo1').stop(true);
		$('#balaDer').stop(true);
		$('#balaDer').remove();
		$('#malo1').remove();
		clearInterval(m1);
		clearInterval(m2);
		clearInterval(m3);
		clearInterval(m4);
		clearInterval(m5);
		nMalos++;
		crearMalos();
		pasarNivel();
		puntuacion();
	}
}
// Puntuacion 
function puntuacion(){
	puntuacionJ1+=500;
	// alert(puntuacionJ1)
}

//Tiempo RELOJ
function iniciarR (tiempo) {
	// Tiempo
	m10 = setInterval(cuentAtras,tiempo);
	$(".cuentaAtras").html(cAtras);
}
function cuentAtras(){
	if (cAtras > 0) {
		--cAtras;
	}else {
		ocultarCapa("#juego1");
		ocultarCapa("#contenedor");
		//ocultarCapa("#contenedor");
		mostrarCapa("#gmOver");
		reiniciarNivelL();
	}
	$(".cuentaAtras").html(cAtras);
}


setInterval(detectarColisionD,5);
setInterval(detectarColisionI,5);
setInterval(detectarColisionA,5);
setInterval(detectarColisionB,5);

function detectarColisionD(){
	var bColision = collision($('#actor2'),$('#paredD'));

	if( bColision > 0){
		$("#actor2").stop(false,false);   
		$('#actor2').animate({left: "+=-3px"},1);   
	}
}
function detectarColisionI(){
	var bColision = collision($('#actor2'),$('#paredI'));

	if( bColision > 0){
		$("#actor2").stop(false,false);   
		$('#actor2').animate({left: "+=3px"},1);   
	}
}
function detectarColisionA(){
	var bColision = collision($('#actor2'),$('#sueloS'));

	if( bColision > 0){
		$("#actor2").stop(false,false);   
		$('#actor2').animate({top: "+=3px"},1);   
	}
}
function detectarColisionB(){
	var bColision = collision($('#actor2'),$('#sueloM'));

	if( bColision > 0){
		$("#actor2").stop(false,false);   
		$('#actor2').animate({top: "+=-3px"},1);   
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

// Niveles
function pasarNivel(){
	if (nMalos == 1) {
		alert("Superaste NIVEL 1");
		nivel2();
	}else if (nMalos == 5) {
		alert("Superaste NIVEL 2");
		nivel3();
	}else if (nMalos == 10) {
		alert("Superaste NIVEL 3");
		nivel4();
	}else if (nMalos == 20) {
		alert("Ganaste\nPuntos : "+puntuacionJ1);
		location.reload();
	}
}
function nivel1(){
	ocultarCapa("#contenedor");
	mostrarCapa("#juego1");
	iniciarR(50);
	nNivel("NIVEL 1");
	crearMalos();
	setInterval(colisionMaloActor,10);
	$( function() {
	$( "#actor2" ).draggable();
});
}
function nivel2(){
	cAtras = 1000;
	iniciarR(50);
	nNivel("NIVEL 2");
}
function nivel3(){
	cAtras = 500;
	iniciarR(200);
	nNivel("NIVEL 3");
}
function nivel4(){
	cAtras = 500;
	iniciarR(90);
	nNivel("NIVEL 4");
}

// Crear Malos POR INTERVALOS

function crearMalos(){
	$("#juego1").append('<img id="malo1">');
	m1 = setInterval(moverMaloD,5);
	m2 = setInterval(detectarColisionMaloD,5);
}

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
	var bColision = collision($('#malo1'),$('#actor2'));

	if( bColision > 0){
		$('#malo1').stop(true);
		--nVidas;
		rVida();
		$("#actor2").css("left", "80%");
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
			$('#malo1').stop(true);
			clearInterval(m1);
			clearInterval(m2);
			reiniciarNivelL();
			break;
	}

}

function reiniciarNivelL(){
	$(".pTotalJ1").html(puntuacionJ1);
	  
}
