#ifndef service_factory
#define service_factory

module SRV
{
	interface CoolResultListener
	{
		void onResult(int value);
	};

	interface CoolService
	{
		void SetListener(CoolResultListener* listener);
		void ApplyValue(int value);
	};

	interface ServiceFactory
	{
		CoolService* GetCoolService();
	};

};
#endif
