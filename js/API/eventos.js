//Eventos
$(document).ready(function(e){
	document.addEventListener("deviceready", function(){
		if(!isLogin())
			window.location.href = "#login";
		//Funcionalidad de tomar foto
		$('#regFoto').tap(function(){
			capturaImg();
		});
		//Funcionalidad Login
		$('#regSubmit').tap(function(){
			if($('#regNombre').val()!='' && $('#regLugar').val()!='' && $('#regEmail').val()!='' && $('#regTel').val()!=''){
				var nom=$('#regNombre').val();
				var lug=$('#regLugar').val();
				var ema=$('#regEmail').val();
				var tel=$('#regTel').val();
				
				//pgAlert("Valores",nom+'\n'+lug+'\n'+ema+'\n'+tel);
				logSend(nom,lug,ema,tel);
			}else{
				pgAlert("Error",'Todos los campos son requeridos.');
			}
		});
		reservar();
		$('#historial').on("pageload",function(){ leerHistorial(); })
	}, false);
});

function reservar(){
	//Seleccionar Tipo de Habitación
	$('#nr1 ul[data-role=listview] a').tap(function(){
		$('#nr1').attr('tipo',$(this).parents('li').index());
		window.location.href="#nr2";
	});
	$('#nr2 #enviar').tap(function(){
		var habs = $('#cantH').val();
		var pers = $('#cantP').val();
		var dias = $('#cantD').val();
		var tipo = $('#nr1').attr('tipo');
		
		//Comprobar que esté en línea
		if(!isConnected()){
			//Guardar localmente
			guardarReservaciones(habs, pers, dias, tipo);
			
		}else{
			//Sincronizar en el Servidor
			alert('desconectate');
		}
		//$('#historial').on("pageload",function(){ leerHistorial(); })
	});
}