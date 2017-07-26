const Ice = require("ice").Ice;
const SRV = require("./service_factory.js").SRV;

var ic = Ice.initialize(process.argv);

Ice.Promise.try(
	function()
	{
		var base = ic.stringToProxy("ServiceFactory:default -p 10200");
		return SRV.ServiceFactoryPrx.checkedCast(base).then(
			function(factory_prx) {
				//var cool_service = SRV.CoolServicePrx.checkedCast(factory_prx.GetCoolService());
				var cool_service = factory_prx.GetCoolService();
				return cool_service.ApplyValue(42);
			});
	}
).finally(
	() => {
		if (ic)
		{
			return ic.destroy();
		}
	}
).exception(
	ex => {
		console.log(ex.toString());
	}
);
