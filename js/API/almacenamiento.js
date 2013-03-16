//Almacenamiento
function crearUsuario(){
	window.localStorage.setItem("Usuario",$('#regNombre').val());
	window.localStorage.setItem("Id",dispositivo()['id']);
}

function isLogin(){
	if(window.localStorage.getItem('Usuario')!=undefined && window.localStorage.getItem('Id')!=undefined)
		return true
	else
		return false;
}

function accesoBD(){
	var db = window.openDatabase("hotel", "1.0", "Hotel DB", 2000000);
	return db;
}

function iniciarBD(){
	accesoBD().transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS reserva (rId unique, fecha, habitaciones, personas, dias, tipo)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS historial (hId unique, fecha, habitaciones, personas, dias)');
	}, function(err) {
		pgAlert('Error en la Base de Datos',err.code);
	}, function() {
		pgAlert('Registro Satisfactorio','Se ha registrado');
		window.location.href="#page";
	});
}

function getId(tab){
	var regreso=0;
	accesoBD().transaction(function(tx){
		tx.executeSql('SELECT * FROM '+tab,[], function(tx1,resultado){
			regreso = resultado.rows.length;
			//var registro1=resultado.rows.item(0).rId;
		}, function(err){
			//alert(err.code);
		});
	}, function(err){
		alert(err.code);	
	}, function(){
		//alert('ok');
	});
	return regreso+1;
}

function guardarReservaciones(id,habs,pers,dias,tipo){
	//Insertar registro en la tabla de reservas
	var f=new Date();
	var fecha = f.getDate()+'/'+f.getMonth()+'/'+f.getFullYear();
	accesoBD().transaction(function(tx){
		tx.executeSql('INSERT INTO reserva (rId, fecha, habitaciones, personas, dias, tipo) VALUES ('+id+',"'+fecha+'","'+habs+'","'+pers+'","'+dias+'","'+tipo+'")');
	},function(err){
		pgAlert('Error al guardar la Reserva',err.code);
	},function(){
		pgAlert('Reserva Guardada','Esperando por conexión a Internet');
	});
}