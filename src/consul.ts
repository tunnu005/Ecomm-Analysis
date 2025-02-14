import Consul from "consul";


export const consul = new Consul({
    host: "localhost",
    port: 8500,
  });


  export const discoverService = async (serviceName: string) => {
    try {
        const services = await consul.catalog.service.nodes(serviceName);

        if (!services || services.length === 0) {
            throw new Error(`No instances found for ${serviceName}`);
        }


        const healthChecks = await Promise.all(
            services.map(service => consul.health.service(service.ServiceID))
        );

        // Select the service with the least active connections
        const selectedService = services.reduce((prev, curr, index) =>
            healthChecks[index].length < healthChecks[services.indexOf(prev)].length ? curr : prev
        );

        console.log(`Selected least loaded instance for ${serviceName}:`, selectedService);

        return selectedService;
    } catch (error) {
        console.error("Service discovery error:", error);
    }
};

  