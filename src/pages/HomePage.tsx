
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart2, LineChart, Star } from "lucide-react";
import AdManagerHeader from "@/components/AdManagerHeader";

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

      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center container mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Automate your social media
        </h1>
        <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-12">
          Proactiv houses a rich set of features to automate your marketing efforts across all social medias
        </p>
      </section>

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
              {['instagram', 'tiktok', 'twitter', 'facebook', 'meta', 'linkedin', 'slack'].map((platform) => (
                <div key={platform} className="bg-background/40 p-3 rounded-lg flex items-center justify-center">
                  <div className="w-10 h-10 rounded bg-background/70"></div>
                </div>
              ))}
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
              <LineChart className="w-20 h-20 text-accent opacity-70" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Transform Your Marketing with Proactiv
        </h2>
        <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-12">
          Automate Campaigns, Engage Audiences, and Boost Lead Generation with Our All-in-One Marketing Solution
        </p>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-background bg-muted" />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-1 mb-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-6 h-6 fill-yellow-500 text-yellow-500" />
          ))}
        </div>

        <p className="text-foreground/70 mb-10">Trusted by 27,000+ creators</p>

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
