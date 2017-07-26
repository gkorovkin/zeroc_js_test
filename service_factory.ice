#ifndef service_factory
#define service_factory

module SRV
{

	interface CoolService
	{
		int ApplyValue(int value);
	};

	interface ServiceFactory
	{
		CoolService* GetCoolService();
	};

};
#endif
