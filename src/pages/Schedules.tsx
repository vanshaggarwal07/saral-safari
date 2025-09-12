import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Calendar, 
  Search, 
  Bus,
  MapPin,
  Filter,
  Download
} from "lucide-react";
import { schedules, routes, buses } from "@/data/busData";

const Schedules = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const getRouteDetails = (routeId: string) => {
    return routes.find(route => route.id === routeId);
  };

  const getBusDetails = (busNumber: string) => {
    return buses.find(bus => bus.number === busNumber);
  };

  const filteredSchedules = schedules.filter(schedule => {
    const route = getRouteDetails(schedule.routeId);
    const bus = getBusDetails(schedule.busNumber);
    
    const matchesSearch = 
      schedule.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route?.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route?.to.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDay = selectedDay ? schedule.days.includes(selectedDay) : true;
    
    return matchesSearch && matchesDay && schedule.isActive;
  });

  const getCurrentDaySchedules = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return schedules.filter(schedule => 
      schedule.days.includes(today) && schedule.isActive
    );
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const calculateDuration = (departure: string, arrival: string) => {
    const [depHour, depMin] = departure.split(':').map(Number);
    const [arrHour, arrMin] = arrival.split(':').map(Number);
    
    let depMinutes = depHour * 60 + depMin;
    let arrMinutes = arrHour * 60 + arrMin;
    
    if (arrMinutes < depMinutes) {
      arrMinutes += 24 * 60; // Next day
    }
    
    const duration = arrMinutes - depMinutes;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Bus Schedules
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Complete bus schedules for all routes. Plan your journey with accurate timings.
        </p>
      </div>

      {/* Today's Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Today's Schedule</span>
            <Badge variant="outline">{getCurrentDaySchedules().length} departures</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getCurrentDaySchedules().slice(0, 6).map((schedule) => {
              const route = getRouteDetails(schedule.routeId);
              return (
                <div key={schedule.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-semibold text-sm">{route?.name}</p>
                    <p className="text-xs text-muted-foreground">{schedule.busNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{formatTime(schedule.departureTime)}</p>
                    <p className="text-xs text-muted-foreground">Departure</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by bus number, route, or destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedDay === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDay(null)}
              >
                All Days
              </Button>
              {daysOfWeek.map((day) => (
                <Button
                  key={day}
                  variant={selectedDay === day ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDay(day)}
                >
                  {day.slice(0, 3)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedules Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Schedules</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSchedules.map((schedule) => {
              const route = getRouteDetails(schedule.routeId);
              const bus = getBusDetails(schedule.busNumber);
              
              return (
                <div key={schedule.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Route Info */}
                    <div className="space-y-2">
                      <h3 className="font-semibold">{route?.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{route?.from} → {route?.to}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {schedule.busNumber}
                      </Badge>
                    </div>

                    {/* Timing */}
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Departure</p>
                        <p className="font-bold text-primary text-lg">
                          {formatTime(schedule.departureTime)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Arrival</p>
                        <p className="font-bold text-secondary text-lg">
                          {formatTime(schedule.arrivalTime)}
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-semibold">
                          {calculateDuration(schedule.departureTime, schedule.arrivalTime)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Fare</p>
                        <p className="font-semibold text-primary">₹{route?.fare}</p>
                      </div>
                    </div>
                  </div>

                  {/* Operating Days */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {daysOfWeek.map((day) => (
                          <Badge
                            key={day}
                            variant={schedule.days.includes(day) ? "default" : "outline"}
                            className="text-xs"
                          >
                            {day.slice(0, 3)}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        {bus && (
                          <Badge variant="outline" className="text-xs">
                            {bus.status === 'on-time' ? '✅' : bus.status === 'delayed' ? '⏰' : '⚡'} 
                            {bus.status}
                          </Badge>
                        )}
                        <Button size="sm" variant="outline">
                          Track Live
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSchedules.length === 0 && (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Schedules Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or day filter.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Bus className="h-8 w-8 mx-auto mb-3 text-primary" />
            <p className="text-2xl font-bold">{schedules.length}</p>
            <p className="text-sm text-muted-foreground">Total Schedules</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 mx-auto mb-3 text-secondary" />
            <p className="text-2xl font-bold">{getCurrentDaySchedules().length}</p>
            <p className="text-sm text-muted-foreground">Today's Departures</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <MapPin className="h-8 w-8 mx-auto mb-3 text-primary" />
            <p className="text-2xl font-bold">{routes.length}</p>
            <p className="text-sm text-muted-foreground">Active Routes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedules;