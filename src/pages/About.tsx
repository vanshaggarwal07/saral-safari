import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bus, 
  MapPin, 
  Users, 
  Shield, 
  Clock, 
  Smartphone,
  Target,
  Heart,
  Award,
  Zap
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description: "GPS-enabled live tracking of all government buses with accurate ETA predictions"
    },
    {
      icon: Clock,
      title: "Schedule Management",
      description: "Complete bus schedules with timings, routes, and frequency information"
    },
    {
      icon: Shield,
      title: "Women Safety",
      description: "Dedicated safety features including SOS alerts and emergency contacts"
    },
    {
      icon: Smartphone,
      title: "Low Bandwidth",
      description: "Optimized for low-bandwidth connections to work in rural areas"
    },
    {
      icon: Users,
      title: "Multi-language",
      description: "Available in English, Hindi, and Punjabi for accessibility"
    },
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "Quick loading times and reliable service across Punjab"
    }
  ];

  const statistics = [
    { number: "500+", label: "Active Buses", icon: Bus },
    { number: "50+", label: "Routes Covered", icon: MapPin },
    { number: "100K+", label: "Daily Passengers", icon: Users },
    { number: "24/7", label: "Support Available", icon: Clock }
  ];

  const team = [
    { name: "Transport Department", role: "Government Authority", icon: Award },
    { name: "Technology Partners", role: "Development Team", icon: Smartphone },
    { name: "Safety Team", role: "Security & Support", icon: Shield },
    { name: "Operations", role: "Daily Management", icon: Users }
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Bus className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          About Punjab Bus Tracking
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A comprehensive public transportation solution developed by the Government of Punjab 
          to modernize bus travel and enhance passenger safety across the state.
        </p>
        <div className="flex justify-center space-x-4">
          <Badge className="bg-primary text-primary-foreground">Government Initiative</Badge>
          <Badge variant="outline">Digital India</Badge>
          <Badge variant="outline">Smart Cities Mission</Badge>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-primary" />
              <span>Our Mission</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              To provide a reliable, safe, and efficient public transportation system 
              that connects communities across Punjab while ensuring the safety and 
              convenience of all passengers, especially women and elderly travelers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-secondary" />
              <span>Our Vision</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              To transform Punjab's public transport into a world-class, technology-driven 
              system that promotes sustainable travel, reduces traffic congestion, and 
              contributes to a cleaner environment for future generations.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Key Features */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <p className="text-muted-foreground">
            Advanced features designed to make your bus travel experience better
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Punjab Bus Network Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-3">
                  <Icon className="h-8 w-8 mx-auto text-primary" />
                  <div>
                    <p className="text-3xl font-bold text-primary">{stat.number}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Technology & Innovation */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Technology & Innovation</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Leveraging cutting-edge technology to solve real-world transportation challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>GPS & Real-time Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Live GPS coordinates updated every 30 seconds</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Machine learning algorithms for accurate ETA predictions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Integration with traffic data for route optimization</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safety & Security</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>One-tap SOS alerts to emergency services</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Live location sharing with trusted contacts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>24/7 support team for assistance</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-muted-foreground">
            A collaborative effort between government and technology partners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => {
            const Icon = member.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Contact Information */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
          <p className="text-muted-foreground mb-6">
            For technical support, feedback, or general inquiries about Punjab Bus services
          </p>
          <div className="space-y-2 text-sm">
            <p><strong>Email:</strong> support@punjabbus.gov.in</p>
            <p><strong>Phone:</strong> 181 (Transport Helpline)</p>
            <p><strong>Address:</strong> Transport Department, Government of Punjab</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;