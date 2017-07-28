const Ice = require("ice").Ice;
const SRV = require("./service_factory.js").SRV;

var ic = Ice.initialize(process.argv);

//listeners
var CoolResultListenerI = Ice.Class(SRV.CoolResultListener, {
	onResult : function(value,current)
	{
		console.log("Calculated:", value);
	}
});

Ice.Promise.try(
	function()
	{
		var base = ic.stringToProxy("ServiceFactory:default -p 10200");
		return SRV.ServiceFactoryPrx.checkedCast(base).then(
			function(factory_prx)
			{
				return factory_prx.GetCoolService().then(
					function(service_prx)
					{
						return ic.createObjectAdapter("").then(
							function(adapter)
							{
								var r = adapter.addWithUUID(new CoolResultListenerI());
								factory_prx.ice_getCachedConnection().setAdapter(adapter);
								console.log(r);
								return SRV.CoolResultListenerPrx.checkedCast(r).then(
									function(listener_prx)
									{
										service_prx.SetListener(listener_prx);
										service_prx.ApplyValue(42);
									});
							});
					});

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

ic.waitForShutdown();
