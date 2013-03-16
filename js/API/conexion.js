//Conexión
function isConnected(){
	if(navigator.connection.type != Connection.NONE)
		return navigator.connection.type;
	else
		return false;
}