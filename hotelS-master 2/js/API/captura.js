//captura
function capturaImg(){
	//Comienza la captura de una imagen
	navigator.device.capture.captureImage(function(mediaFiles){//Imagen capturada
		pgAlert('Captura de Imagen','Foto tomada Satisfactoriamente');
		$('#regFoto').attr('ruta',mediaFiles[0].fullPath).css('background-color','#0F0');
		$('#login div[data-role=content] #regSubmit').prepend('<img src="'+mediaFiles[0].fullPath+'" style="width:100%" />');
	},function(err){//Error de captura
		pgAlert('Error de Captura',err.code);
	}, {limit:1});
}