const Ice = require("ice").Ice;
const SRV = require("./service_factory.js").SRV;

var ic = Ice.initialize(process.argv);

Ice.Promise.try(
	function()
	{
		var base = ic.stringToProxy("ServiceFactory:default -p 10200");
		return SRV.ServiceFactoryPrx.checkedCast(base).then(
			function(factory_prx) {
				return factory_prx.GetCoolService().then(
					function(ar)
					{
						//we got coolservice prx - now apply value
						return ar.ApplyValue("42").then(
							function(res)
							{
								console.log("Reply:", res);
							},
							function(res,ex)
							{
								console.log(res,ex);
							});
					},
					function(ar,ex)
					{
						console.log(ex,ar);
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
