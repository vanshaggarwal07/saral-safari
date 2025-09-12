import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  HelpCircle,
  Send,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: ""
  });

  const contactInfo = [
    {
      icon: Phone,
      title: "Emergency Helpline",
      details: ["181 - Transport Authority", "100 - Police Emergency", "1091 - Women Helpline"],
      color: "text-emergency"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["support@punjabbus.gov.in", "feedback@punjabbus.gov.in", "emergency@punjabbus.gov.in"],
      color: "text-primary"
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: ["Transport Department", "Government of Punjab", "Chandigarh, Punjab"],
      color: "text-secondary"
    },
    {
      icon: Clock,
      title: "Support Hours",
      details: ["24/7 Emergency Support", "9 AM - 6 PM General Queries", "24/7 Safety Support"],
      color: "text-muted-foreground"
    }
  ];

  const faqCategories = [
    {
      title: "Bus Tracking",
      questions: [
        "How accurate is the real-time tracking?",
        "Why is my bus showing delayed status?",
        "How to track a specific bus number?"
      ]
    },
    {
      title: "Safety Features",
      questions: [
        "How does the SOS feature work?",
        "Can I share my location with family?",
        "What to do in case of emergency?"
      ]
    },
    {
      title: "Routes & Schedules",
      questions: [
        "How to find bus schedules?",
        "Are weekend schedules different?",
        "How to check route changes?"
      ]
    },
    {
      title: "Technical Issues",
      questions: [
        "App is not loading properly",
        "Location services not working",
        "How to report a bug?"
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Message sent successfully! We'll respond within 24 hours.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      category: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Contact & Support
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Need help? Get in touch with our support team or find answers to common questions.
        </p>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <Icon className={`h-8 w-8 mx-auto ${info.color}`} />
                <div>
                  <h3 className="font-semibold mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>Send us a Message</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Phone</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background"
                >
                  <option value="">Select category</option>
                  <option value="tracking">Bus Tracking</option>
                  <option value="safety">Safety Concern</option>
                  <option value="technical">Technical Issue</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Subject</label>
                <Input
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Brief subject of your message"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Message *</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Describe your issue or feedback in detail..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5 text-secondary" />
              <span>Frequently Asked Questions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {faqCategories.map((category, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-semibold text-primary">{category.title}</h4>
                <div className="space-y-2">
                  {category.questions.map((question, idx) => (
                    <div key={idx} className="flex items-start space-x-2 p-2 hover:bg-accent rounded-lg cursor-pointer">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{question}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t border-border">
              <Button variant="outline" className="w-full">
                View All FAQs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contact Banner */}
      <Card className="border-emergency/20 bg-emergency/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-emergency/10 flex items-center justify-center">
                <Phone className="h-6 w-6 text-emergency" />
              </div>
              <div>
                <h3 className="font-semibold text-emergency">Emergency Assistance</h3>
                <p className="text-sm text-muted-foreground">
                  For immediate help or safety concerns, call our emergency hotline
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-emergency">181</p>
              <p className="text-sm text-muted-foreground">24/7 Available</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Response Time Information */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Response Times</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-emergency/10 flex items-center justify-center mx-auto">
                  <Phone className="h-5 w-5 text-emergency" />
                </div>
                <p className="font-semibold">Emergency Calls</p>
                <p className="text-sm text-muted-foreground">Immediate Response</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <p className="font-semibold">Email Support</p>
                <p className="text-sm text-muted-foreground">Within 24 hours</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                  <MessageSquare className="h-5 w-5 text-secondary" />
                </div>
                <p className="font-semibold">General Queries</p>
                <p className="text-sm text-muted-foreground">1-3 business days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;