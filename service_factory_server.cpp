#include <Ice/Ice.h>
#include <thread>
#include <chrono>
#include "service_factory.h"

Ice::CommunicatorPtr ic;
Ice::ObjectAdapterPtr adapter;

////////////////////////////////////////////////////////////////////////////////
class CoolServiceI : public SRV::CoolService
{
public:
	void SetListener(const SRV::CoolResultListenerPrx& listener, const Ice::Current& = Ice::Current()) override
	{
		std::cout << "Setting listener" << std::endl;
		m_listener = listener;
	};
	void ApplyValue(Ice::Int value, const Ice::Current& = Ice::Current()) override
	{
		std::cout << "Running for some calculation" << std::endl;
		std::thread([this]
					{
						std::this_thread::sleep_for( std::chrono::duration<int, std::milli>(2000) );
						if (m_listener)
							m_listener->onResult(42);
						else
							std::cerr << "No listener applied!" << std::endl;
					});
	}

	SRV::CoolResultListenerPrx m_listener;
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
