import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  IndianRupee, 
  Bus, 
  Search, 
  Route,
  Navigation,
  Timer,
  Star
} from "lucide-react";
import { routes, buses } from "@/data/busData";

const Routes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = 
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.to.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType ? route.type === selectedType : true;
    
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ac': return 'bg-primary text-primary-foreground';
      case 'deluxe': return 'bg-secondary text-secondary-foreground';
      case 'ordinary': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ac': return '❄️';
      case 'deluxe': return '⭐';
      case 'ordinary': return '🚌';
      default: return '🚌';
    }
  };

  const getActiveBuses = (routeId: string) => {
    return buses.filter(bus => {
      const routeMatch = routes.find(r => r.id === routeId);
      return routeMatch && bus.route.includes(routeMatch.from) && bus.route.includes(routeMatch.to);
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Bus Routes
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore all available bus routes across Punjab. Find the best route for your journey.
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search routes, destinations, or route numbers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedType === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(null)}
              >
                All Routes
              </Button>
              <Button
                variant={selectedType === "ac" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("ac")}
              >
                ❄️ AC Buses
              </Button>
              <Button
                variant={selectedType === "deluxe" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("deluxe")}
              >
                ⭐ Deluxe
              </Button>
              <Button
                variant={selectedType === "ordinary" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("ordinary")}
              >
                🚌 Ordinary
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoutes.map((route) => {
          const activeBuses = getActiveBuses(route.id);
          return (
            <Card key={route.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{route.name}</CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">
                      Route {route.number}
                    </p>
                  </div>
                  <Badge className={getTypeColor(route.type)}>
                    {getTypeIcon(route.type)} {route.type.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Route Details */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      <strong>{route.from}</strong> → <strong>{route.to}</strong>
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Route className="h-4 w-4 text-secondary" />
                      <span><strong>{route.distance}</strong> km</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span><strong>{Math.floor(route.duration / 60)}h {route.duration % 60}m</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <IndianRupee className="h-4 w-4 text-primary" />
                      <span><strong>₹{route.fare}</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Timer className="h-4 w-4 text-secondary" />
                      <span>Every <strong>{route.frequency}min</strong></span>
                    </div>
                  </div>
                </div>

                {/* Timings */}
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">First Bus</p>
                      <p className="font-semibold">{route.firstBus}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Bus</p>
                      <p className="font-semibold">{route.lastBus}</p>
                    </div>
                  </div>
                </div>

                {/* Stops Preview */}
                <div className="border-t border-border pt-3">
                  <p className="text-sm text-muted-foreground mb-2">Major Stops</p>
                  <div className="flex flex-wrap gap-1">
                    {route.stops.slice(0, 4).map((stop, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {stop}
                      </Badge>
                    ))}
                    {route.stops.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{route.stops.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Active Buses */}
                <div className="border-t border-border pt-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bus className="h-4 w-4 text-success" />
                      <span className="text-sm">
                        <strong>{activeBuses.length}</strong> active buses
                      </span>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredRoutes.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Route className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Routes Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find routes.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Route Map Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Route Network</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">Interactive route map coming soon</p>
              <p className="text-sm text-muted-foreground">
                View all routes on an interactive map with real-time bus positions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Routes;