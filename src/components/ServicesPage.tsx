import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';
import { mockServices as initialServices } from './mockData';

export function ServicesPage() {
  const [services, setServices] = useState(initialServices);

  const handleToggleService = (serviceId: string) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === serviceId
          ? { ...service, active: !service.active }
          : service
      )
    );

    const service = services.find(s => s.id === serviceId);
    if (service) {
      toast.success(
        service.active
          ? `${service.name} deactivated`
          : `${service.name} activated`
      );
    }
  };

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'data', label: 'Data' },
    { id: 'roaming', label: 'Roaming' },
    { id: 'vas', label: 'Value Added' },
  ];

  const filterServices = (category: string) => {
    if (category === 'all') return services;
    return services.filter(s => s.category === category);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl mb-2">Services</h2>
        <p className="text-gray-600">Manage your subscriptions and value-added services</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {categories.map(cat => (
            <TabsTrigger key={cat.id} value={cat.id}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(cat => (
          <TabsContent key={cat.id} value={cat.id} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterServices(cat.id).map((service) => (
                <Card key={service.id} className={service.active ? 'border-blue-500' : ''}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          {service.name}
                          {service.active && (
                            <Badge variant="default">Active</Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {service.description}
                        </CardDescription>
                      </div>
                      <Switch
                        checked={service.active}
                        onCheckedChange={() => handleToggleService(service.id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl">LKR {service.monthlyFee}</p>
                        <p className="text-sm text-gray-500">per month</p>
                      </div>
                      <Button
                        variant={service.active ? 'destructive' : 'default'}
                        onClick={() => handleToggleService(service.id)}
                      >
                        {service.active ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Summary Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle>Monthly Service Cost</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">
                {services.filter(s => s.active).length} active services
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl">
                LKR {services.filter(s => s.active).reduce((sum, s) => sum + s.monthlyFee, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total per month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Service Information</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2 text-gray-600">
          <p>• Services can be activated/deactivated instantly</p>
          <p>• Changes will be reflected in your next billing cycle</p>
          <p>• Some services may require additional setup via customer support</p>
          <p>• International roaming should be activated 24 hours before travel</p>
        </CardContent>
      </Card>
    </div>
  );
}
