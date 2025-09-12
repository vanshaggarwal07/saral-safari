import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Phone, 
  MapPin, 
  AlertTriangle, 
  Users, 
  Camera,
  MessageSquare,
  Clock,
  CheckCircle,
  User,
  Heart,
  Navigation
} from "lucide-react";
import { toast } from "sonner";
import { emergencyContacts } from "@/data/busData";

const Safety = () => {
  const [sosActive, setSosActive] = useState(false);
  const [reportType, setReportType] = useState("");
  const [reportMessage, setReportMessage] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const safetyFeatures = [
    {
      icon: Shield,
      title: "SOS Emergency",
      description: "Instant alert to emergency services and your emergency contacts",
      action: "Activate SOS",
      color: "emergency"
    },
    {
      icon: MapPin,
      title: "Live Location Share",
      description: "Share your real-time location with trusted contacts",
      action: "Share Location",
      color: "primary"
    },
    {
      icon: Phone,
      title: "Emergency Contacts",
      description: "Quick dial to police, medical, and transport authorities",
      action: "View Contacts",
      color: "secondary"
    },
    {
      icon: Camera,
      title: "Incident Report",
      description: "Report safety concerns with photos and descriptions",
      action: "Report Issue",
      color: "warning"
    }
  ];

  const safetyTips = [
    "Always sit close to the driver or conductor",
    "Keep emergency contacts saved and accessible",
    "Share your travel details with family/friends",
    "Trust your instincts - if something feels wrong, alert others",
    "Keep your phone charged and have backup power",
    "Know the bus route and major stops",
    "Stay alert and avoid isolated areas during waits"
  ];

  const activateSOS = () => {
    setSosActive(true);
    toast.error("SOS ACTIVATED - Emergency services have been notified!");
    
    // Simulate emergency response
    setTimeout(() => {
      toast.success("Emergency response team contacted. Help is on the way.");
    }, 2000);
  };

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          toast.success(`Location shared: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        },
        () => {
          toast.error("Unable to access location. Please enable location services.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const submitReport = () => {
    if (!reportType || !reportMessage) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    toast.success("Report submitted successfully. Authorities have been notified.");
    setReportType("");
    setReportMessage("");
  };

  const callEmergency = (number: string, name: string) => {
    toast.success(`Calling ${name} at ${number}`);
    // In a real app, this would initiate a phone call
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Women Safety & Security
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your safety is our priority. Quick access to emergency services and safety features.
        </p>
      </div>

      {/* Emergency SOS */}
      <Card className={`border-2 ${sosActive ? 'border-emergency bg-emergency/5' : 'border-emergency/20'}`}>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${
              sosActive ? 'bg-emergency animate-pulse' : 'bg-emergency/10'
            }`}>
              <Shield className={`h-10 w-10 ${sosActive ? 'text-white' : 'text-emergency'}`} />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-emergency">Emergency SOS</h2>
              <p className="text-muted-foreground">
                Press and hold for 3 seconds to activate emergency alert
              </p>
            </div>
            
            <Button
              size="lg"
              className={`w-full max-w-xs ${
                sosActive 
                  ? 'bg-emergency hover:bg-emergency/90' 
                  : 'bg-emergency hover:bg-emergency/90'
              }`}
              onClick={activateSOS}
              disabled={sosActive}
            >
              {sosActive ? 'SOS ACTIVATED' : 'EMERGENCY SOS'}
            </Button>
            
            {sosActive && (
              <div className="space-y-2">
                <p className="text-emergency font-semibold">🚨 Emergency services notified</p>
                <p className="text-sm text-muted-foreground">
                  Location shared • Contacts alerted • Response team dispatched
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Safety Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {safetyFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center bg-${feature.color}/10`}>
                  <Icon className={`h-6 w-6 text-${feature.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    if (feature.title === "Live Location Share") shareLocation();
                    else toast.info(`${feature.title} activated`);
                  }}
                >
                  {feature.action}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-emergency" />
              <span>Emergency Contacts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-semibold">{contact.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{contact.type}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{contact.number}</Badge>
                  <Button 
                    size="sm"
                    onClick={() => callEmergency(contact.number, contact.name)}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Add Emergency Contact</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter phone number"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                />
                <Button 
                  size="sm"
                  onClick={() => {
                    if (emergencyContact) {
                      toast.success("Emergency contact added");
                      setEmergencyContact("");
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Incident */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span>Report Safety Concern</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Type of Incident</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-input rounded-lg bg-background"
              >
                <option value="">Select incident type</option>
                <option value="harassment">Harassment</option>
                <option value="suspicious">Suspicious Activity</option>
                <option value="safety">Safety Concern</option>
                <option value="emergency">Emergency</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground">Description</label>
              <Textarea
                placeholder="Describe the incident in detail..."
                value={reportMessage}
                onChange={(e) => setReportMessage(e.target.value)}
                className="mt-1"
                rows={4}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1">
                <Camera className="h-4 w-4 mr-2" />
                Add Photo
              </Button>
              <Button variant="outline" className="flex-1">
                <MapPin className="h-4 w-4 mr-2" />
                Add Location
              </Button>
            </div>
            
            <Button onClick={submitReport} className="w-full">
              Submit Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Safety Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-primary" />
            <span>Safety Tips for Women Travelers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Support */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">24/7 Safety Support</h3>
                <p className="text-sm text-muted-foreground">
                  Our safety team is available round the clock to assist you
                </p>
              </div>
            </div>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Safety;