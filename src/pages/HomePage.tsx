
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart2, LineChart, Star, Facebook, Instagram, Twitter, Linkedin, Youtube, Search } from "lucide-react";
import AdManagerHeader from "@/components/AdManagerHeader";
import { AnimatedHero } from "@/components/ui/animated-hero";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Dummy data for the chart
const dummyChartData = [
  { name: "Jan", impressions: 4000, clicks: 2400, conversions: 600 },
  { name: "Feb", impressions: 3000, clicks: 1398, conversions: 420 },
  { name: "Mar", impressions: 2000, clicks: 9800, conversions: 1200 },
  { name: "Apr", impressions: 2780, clicks: 3908, conversions: 800 },
  { name: "May", impressions: 1890, clicks: 4800, conversions: 950 },
  { name: "Jun", impressions: 2390, clicks: 3800, conversions: 850 },
  { name: "Jul", impressions: 3490, clicks: 4300, conversions: 1100 },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation Bar */}
      <header className="border-b border-border/10 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <AdManagerHeader />
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/features" className="text-foreground/80 hover:text-foreground">Features</Link>
              <Link to="/pricing" className="text-foreground/80 hover:text-foreground">Pricing</Link>
              <Link to="/blog" className="text-foreground/80 hover:text-foreground">Blog</Link>
              <Link to="/contact" className="text-foreground/80 hover:text-foreground">Contact</Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/register" className="text-foreground/80 hover:text-foreground">Register</Link>
            <Button asChild className="bg-accent text-white hover:bg-accent/90">
              <Link to="/campaign/1">Book a demo</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Using our new AnimatedHero component */}
      <AnimatedHero />

      {/* Features Cards */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        <Card className="bg-secondary/50 border-border/10 overflow-hidden">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Post to multiple platforms at once</h2>
            <p className="text-foreground/70 mb-6">
              With our AI-powered platform, you can post to multiple
              platforms at once, saving you time and effort.
            </p>
            
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-10">
              <div className="bg-background/40 p-3 rounded-lg flex items-center justify-center">
                <Instagram className="w-10 h-10 text-pink-500" />
              </div>
              <div className="bg-background/40 p-3 rounded-lg flex items-center justify-center">
                <Facebook className="w-10 h-10 text-blue-600" />
              </div>
              <div className="bg-background/40 p-3 rounded-lg flex items-center justify-center">
                <Twitter className="w-10 h-10 text-blue-400" />
              </div>
              <div className="bg-background/40 p-3 rounded-lg flex items-center justify-center">
                <Linkedin className="w-10 h-10 text-blue-700" />
              </div>
              <div className="bg-background/40 p-3 rounded-lg flex items-center justify-center">
                <Youtube className="w-10 h-10 text-red-600" />
              </div>
              <div className="bg-background/40 p-3 rounded-lg flex items-center justify-center">
                <Search className="w-10 h-10 text-yellow-500" /> {/* Google Ads */}
              </div>
              <div className="bg-background/40 p-3 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-cyan-500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 border-border/10 overflow-hidden">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Analytics for everything</h2>
            <p className="text-foreground/70 mb-6">
              Check analytics, track your posts, and get insights into your audience.
            </p>
            
            <div className="mt-6 relative h-60 bg-background/40 rounded-lg flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dummyChartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#9f9ea1" fontSize={12} />
                  <YAxis stroke="#9f9ea1" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(24, 24, 27, 0.8)', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#ffffff' 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="impressions" 
                    stroke="#8b5cf6" 
                    fillOpacity={1} 
                    fill="url(#colorImpressions)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#ec4899" 
                    fillOpacity={1} 
                    fill="url(#colorClicks)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">Transform Your Marketing with Adi*
AdIntellgence Agent</h2>
        <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-12">
          Automate Campaigns, Engage Audiences, and Boost Lead Generation with Our All-in-One Marketing Solution
        </p>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="flex -space-x-4">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" 
                alt="User testimonial" 
                className="w-12 h-12 rounded-full border-2 border-background object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" 
                alt="User testimonial" 
                className="w-12 h-12 rounded-full border-2 border-background object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" 
                alt="User testimonial" 
                className="w-12 h-12 rounded-full border-2 border-background object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" 
                alt="User testimonial" 
                className="w-12 h-12 rounded-full border-2 border-background object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" 
                alt="User testimonial" 
                className="w-12 h-12 rounded-full border-2 border-background object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" 
                alt="User testimonial" 
                className="w-12 h-12 rounded-full border-2 border-background object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-1 mb-12">
          {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-6 h-6 fill-yellow-500 text-yellow-500" />)}
        </div>

        <p className="text-foreground/70 mb-10">To be trusted by 1 million businesses by 2027</p>

        <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90">
          <Link to="/campaign/1" className="flex items-center">
            Book a demo <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default HomePage;
