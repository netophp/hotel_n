//Conexión al servidor
function logSend(nombre,lugar,mail,tel){
	var disp=dispositivo();
	$.ajax({
		type: "POST",
		url: "http://www.igitsoft.com/pgtest.php",
		data: "nom="+nombre+"&lug="+lugar+"&mai="+mail+"&tel="+tel+"&uuid="+disp['id']
	}).done(function(msg){
		if(msg=="0")
			pgAlert('Error','Hubo un error al enviar datos');
		else{
			subirArchivo($('#regFoto').attr('ruta'));	
		}
	});
}