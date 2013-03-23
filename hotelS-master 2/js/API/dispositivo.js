//Dispositivo
function dispositivo(){
	var disp=[];
	disp['name']=device.name;
	disp['phonegap']=device.cordova;
	disp['platform']=device.platform;
	disp['id']=device.uuid;
	disp['version']=device.version;
	disp['model']=device.model;
	
	return disp;
}

/*dispositivo()['name'];
var dev=dispositivo();
dev['name'];*/