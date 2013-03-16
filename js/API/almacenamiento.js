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

function leerHistorial(){
	var regreso=0;
	accesoBD().transaction(function(tx){
		tx.executeSql('SELECT * FROM historial',[], function(tx1,resultado){
			largo = resultado.rows.length;
			if (largo!=0){
			for(i=0;i<largo;i++){
				$('#historial div[data-role=content]').append('<div data-role="collapsible-set">'+
            '<div data-role="collapsible" data-collapsed="true">'+
                '<h3>'+
                    resultado.rows.item(i).fecha+
                '</h3>'+
                '<strong>Habitaciones:</strong>'+ resultado.rows.item(i).habitaciones +'<br />'+
                '<strong>Personas:</strong>'+resultado.rows.item(i).personas+'<br />'+
                '<strong>Estancia:</strong>'+resultado.rows.item(i).dias+'<br />'+
            '</div>'+
            
        '</div>		');
				
				}
			}
			else
			{
			   $('#historial div[data-role=content]').text('<h2>No hay reservas anteriores</h2>');	
				
				}
			//var registro1=resultado.rows.item(0).rId;
		}, function(err){
			//alert(err.code);
		});
	}, function(err){
		alert(err.code);	
	}, function(){
		//alert('ok');
	});
	//return regreso+1;
}

function guardarReservaciones(habs,pers,dias,tipo){
	//Insertar registro en la tabla de reservas
	var f=new Date();
	var fecha = f.getDate()+'/'+f.getMonth()+'/'+f.getFullYear();
	accesoBD().transaction(function(tx){
		tx.executeSql('INSERT INTO reserva (fecha, habitaciones, personas, dias, tipo) VALUES ("'+fecha+'","'+habs+'","'+pers+'","'+dias+'","'+tipo+'")');
		guardarHistorial(habs,pers,dias);
		},function(err){
		pgAlert('Error al guardar la Reserva',err.code);
	},function(){
		pgAlert('Reserva Guardada','Esperando por conexión a Internet');
	});
}

function guardarHistorial(habs,pers,dias){
	//Insertar registro en la tabla de historial
	var f=new Date();
	var fecha = f.getDate()+'/'+f.getMonth()+'/'+f.getFullYear();
	accesoBD().transaction(function(tx){
		tx.executeSql('INSERT INTO reserva (fecha, habitaciones, personas, dias) VALUES ("'+fecha+'","'+habs+'","'+pers+'","'+dias+'"');
	},function(err){
		pgAlert('Error al guardar historial',err.code);
	},function(){
		pgAlert('Historial Guardada','Ver en Reservaciones anteriores');
	});
}

function eliminarLocales(id){
	accesoBD().transaction(function(tx){
		tx.executeSql('DELETE FROM reserva WHERE rId='+id);
		
		},function(err){
		pgAlert('Error al eliminar la Reserva',err.code);
	},function(){
		pgAlert('Reserva eliminada','Esperando por conexión a Internet');
	});
	}
	
function leerReservas(id){
	accesoBD().transaction(function(tx){
		tx.executeSql('SELECT * FROM reserva',[],function(tx1,resultados){
			cant=resultados.rows.length;
			reg=resultados.rows;
			for (i=0;i<cant;i++){
				syncSend(reg.item(i).habitaciones,reg.item(i).personas,reg.item(i).dias,reg.item(i).tipo,reg.item(i).rId);
				}
			
			},function(err){
		pgAlert('Error SELECT',err.code);
	});	
		},function(err){
		pgAlert('Error TRANSACCIÓN',err.code);
	},function(){
		pgAlert('Reserva eliminada','Esperando por conexión a Internet');
	});
	}