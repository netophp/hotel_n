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
	}, false);
});

function reservar(){
	//Seleccionar Tipo de Habitación
	$('#nr1 ul[data-role=listview] a').tap(function(){
		$('#nr1').attr('tipo',$(this).parents('li').index());
		window.location.href="#nr2";
	});
	$('#nr2 #enviar').tap(function(){
		var habs = $('#nr2 ul[data-role=listview] li:eq(1)').children('select').val();
		var pers = $('#nr2 ul[data-role=listview] li:eq(2)').children('select').val();
		var dias = $('#nr2 ul[data-role=listview] li:eq(3)').children('select').val();
		var tipo = $('#nr1').attr('tipo');
		
		//Comprobar que esté en línea
		if(!isConnected()){
			//Guardar localmente
			//guardarReservaciones(getId(),habs, pers, dias, tipo);
			alert(getId());
		}else{
			//Sincronizar en el Servidor
		}
	});
}