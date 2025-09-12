import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  Users, 
  Bus, 
  Search, 
  AlertCircle, 
  CheckCircle, 
  Timer,
  Navigation,
  Wifi,
  Shield
} from "lucide-react";
import { buses, routes, updateBusLocations } from "@/data/busData";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [liveBuses, setLiveBuses] = useState(buses);
  const [selectedBus, setSelectedBus] = useState(buses[0]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      updateBusLocations();
      setLiveBuses([...buses]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredBuses = liveBuses.filter(bus =>
    bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'bg-success text-success-foreground';
      case 'delayed': return 'bg-warning text-warning-foreground';
      case 'early': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time': return CheckCircle;
      case 'delayed': return AlertCircle;
      case 'early': return Timer;
      default: return Clock;
    }
  };

  const getOccupancyColor = (occupancy: number, capacity: number) => {
    const percentage = (occupancy / capacity) * 100;
    if (percentage >= 90) return 'text-warning';
    if (percentage >= 70) return 'text-primary';
    return 'text-success';
  };

  const trackBus = (bus: any) => {
    setSelectedBus(bus);
    toast.success(`Now tracking ${bus.number} - ${bus.route}`);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Punjab Bus Live Tracking
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Real-time bus tracking for Punjab Government Transport. Track your bus, view routes, and stay safe.
        </p>
        
        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Bus className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{liveBuses.length}</p>
              <p className="text-sm text-muted-foreground">Active Buses</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <p className="text-2xl font-bold">{routes.length}</p>
              <p className="text-sm text-muted-foreground">Routes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{liveBuses.reduce((acc, bus) => acc + bus.occupancy, 0)}</p>
              <p className="text-sm text-muted-foreground">Passengers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Wifi className="h-8 w-8 mx-auto mb-2 text-success" />
              <p className="text-2xl font-bold">Live</p>
              <p className="text-sm text-muted-foreground">Real-time</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by bus number, route, or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bus List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Live Buses</h2>
            <Badge variant="outline" className="text-success border-success">
              {filteredBuses.length} Active
            </Badge>
          </div>

          <div className="space-y-4">
            {filteredBuses.map((bus) => {
              const StatusIcon = getStatusIcon(bus.status);
              return (
                <Card key={bus.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">{bus.number}</h3>
                          <Badge className={getStatusColor(bus.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {bus.status}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground font-medium">{bus.route}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>Next: <strong>{bus.nextStop}</strong></span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-secondary" />
                            <span>ETA: <strong>{bus.eta} min</strong></span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className={`h-4 w-4 ${getOccupancyColor(bus.occupancy, bus.capacity)}`} />
                            <span>
                              <strong>{bus.occupancy}/{bus.capacity}</strong> passengers
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Navigation className="h-4 w-4 text-muted-foreground" />
                            <span>Driver: <strong>{bus.driver}</strong></span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => trackBus(bus)}
                        variant={selectedBus?.id === bus.id ? "default" : "outline"}
                        size="sm"
                        className="ml-4"
                      >
                        {selectedBus?.id === bus.id ? "Tracking" : "Track"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Selected Bus Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Tracking Details</h2>
          
          {selectedBus && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {selectedBus.number}
                  <Badge className={getStatusColor(selectedBus.status)}>
                    {selectedBus.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Route</p>
                    <p className="font-semibold">{selectedBus.route}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Next Stop</p>
                    <p className="font-semibold flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {selectedBus.nextStop}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                    <p className="font-semibold flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-secondary" />
                      {selectedBus.eta} minutes
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Occupancy</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-primary"
                          style={{ 
                            width: `${(selectedBus.occupancy / selectedBus.capacity) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {selectedBus.occupancy}/{selectedBus.capacity}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Driver</p>
                    <p className="font-semibold">{selectedBus.driver}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedBus.lastUpdated.toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button variant="outline" className="w-full mb-2">
                    <Shield className="h-4 w-4 mr-2" />
                    Report Issue
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    Share Location
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Safety Alert */}
          <Card className="border-emergency/20 bg-emergency/5">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-emergency mt-0.5" />
                <div>
                  <h4 className="font-semibold text-emergency">Safety First</h4>
                  <p className="text-sm text-muted-foreground">
                    In case of emergency, use the SOS feature or call 100.
                  </p>
                  <Button size="sm" className="mt-2 bg-emergency hover:bg-emergency/90">
                    Emergency Help
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;