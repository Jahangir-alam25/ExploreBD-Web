import { HelpCircle, MessageCircle, Phone, Mail, Clock, ChevronDown, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How do I cancel a booking?", a: "Go to My Bookings page and click on the booking you want to cancel. You can cancel up to 48 hours before the tour date for a full refund." },
  { q: "How long does a refund take?", a: "Refunds are processed within 5-7 business days after cancellation approval. The amount will be returned to your original payment method." },
  { q: "Can I change my booking date?", a: "Yes, you can reschedule your booking up to 48 hours before the tour date at no extra cost. Go to My Bookings and click 'Reschedule'." },
  { q: "What payment methods are accepted?", a: "We accept bKash, Nagad, Rocket, Visa/Mastercard, and bank transfers. All payments are secure and encrypted." },
  { q: "Do tours include meals?", a: "Most multi-day tours include breakfast and lunch. Specific meal inclusions are listed on each tour's detail page under 'What's Included'." },
  { q: "Is travel insurance included?", a: "Basic travel insurance is included with all tours. You can upgrade to premium insurance during booking for additional coverage." },
];

const contactMethods = [
  { icon: Phone, label: "Phone Support", detail: "+880 1800-123456", availability: "9AM - 10PM (Daily)" },
  { icon: Mail, label: "Email Support", detail: "support@explorebd.com", availability: "24h response" },
  { icon: MessageCircle, label: "Live Chat", detail: "Start a conversation", availability: "Online Now" },
];

const Support = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
      <HelpCircle className="h-6 w-6 text-primary" /> Help & Support
    </h1>

    {/* Contact Methods */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {contactMethods.map((m) => (
        <Card key={m.label} className="hover:shadow-card-hover transition-shadow cursor-pointer group">
          <CardContent className="p-5 text-center space-y-3">
            <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <m.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{m.label}</p>
              <p className="text-sm text-primary font-medium">{m.detail}</p>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                <Clock className="h-3 w-3" />{m.availability}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Send a Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Your Name</label>
              <Input placeholder="Rahim Ahmed" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input type="email" placeholder="rahim@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Subject</label>
            <Input placeholder="How can we help?" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Message</label>
            <Textarea placeholder="Describe your issue in detail..." rows={5} />
          </div>
          <Button className="w-full">Send Message</Button>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-sm text-left font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Support;