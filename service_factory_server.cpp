#include <Ice/Ice.h>
#include "service_factory.h"

Ice::CommunicatorPtr ic;
Ice::ObjectAdapterPtr adapter;

////////////////////////////////////////////////////////////////////////////////
class CoolServiceI : public SRV::CoolService
{
public:
	Ice::Int ApplyValue(Ice::Int value, const Ice::Current& = Ice::Current()) override
	{
		std::cout << "Returning cool service value : " << (value + 42) << std::endl;
		return value + 42;
	}
};
////////////////////////////////////////////////////////////////////////////////
class ServiceFactoryI : public SRV::ServiceFactory
{
public:
	ServiceFactoryI()
	{
		CoolServiceI* obj = new CoolServiceI();
		Ice::Identity id = ic->stringToIdentity("CoolService");
		m_cool_service_prx = SRV::CoolServicePrx::uncheckedCast(adapter->add(obj, id));
	}

	SRV::CoolServicePrx GetCoolService(const Ice::Current& = Ice::Current()) override
	{
		std::cout << "Returning service factory" << std::endl;
		return m_cool_service_prx;
	}

private:
	SRV::CoolServicePrx m_cool_service_prx;
};
////////////////////////////////////////////////////////////////////////////////
int main(int c, char** v)
{
	try
	{
		ic = Ice::initialize(c, v);
		adapter = ic->createObjectAdapterWithEndpoints("ServiceFactoryAdapter", "default -p 10200");
		Ice::ObjectPtr object = new ServiceFactoryI;
		adapter->add(object, ic->stringToIdentity("ServiceFactory"));
		adapter->activate();
		ic->waitForShutdown();
	}
	catch (const Ice::Exception& e)
	{
		std::cerr << e << std::endl;
	}
	catch (const char* msg)
	{
		std::cerr << msg << std::endl;
	}

	if (ic)
	{
		try {
			ic->destroy();
		} catch (const Ice::Exception& e) {
			std::cerr << e << std::endl;
		}
	}

	return 0;
}
