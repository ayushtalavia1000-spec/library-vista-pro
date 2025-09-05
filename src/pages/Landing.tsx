import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Search, 
  Users, 
  Clock, 
  Star,
  ArrowRight,
  Library,
  GraduationCap,
  Shield
} from "lucide-react";
import heroImage from "@/assets/library-hero.jpg";

const Landing = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Vast Collection",
      description: "Access thousands of books across all genres and subjects"
    },
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "Smart Search",
      description: "Find exactly what you need with our advanced search system"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "24/7 Access",
      description: "Browse and reserve books anytime, anywhere"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community",
      description: "Connect with fellow readers and join book discussions"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Books Available" },
    { number: "15,000+", label: "Active Members" },
    { number: "500+", label: "New Arrivals Monthly" },
    { number: "24/7", label: "Digital Access" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 hero-gradient opacity-85" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Welcome to Your
            <span className="block text-accent">Digital Library</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
            Discover, explore, and immerse yourself in a world of knowledge with our comprehensive library management system
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8" asChild>
              <Link to="/catalog">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Catalog
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8" asChild>
              <Link to="/register">
                <Users className="mr-2 h-5 w-5" />
                Join Today
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold mb-4">
              Everything You Need in a Library
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive system provides all the tools and features you need for an exceptional library experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="library-card text-center h-full">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary-lighter rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-playfair text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Comprehensive library solutions for every type of reader
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Library className="h-10 w-10 text-accent-foreground" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold mb-4">
                Physical Books
              </h3>
              <p className="opacity-90">
                Browse and borrow from our extensive collection of physical books across all genres
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-10 w-10 text-accent-foreground" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold mb-4">
                Academic Resources
              </h3>
              <p className="opacity-90">
                Access specialized academic materials, research papers, and scholarly publications
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-accent-foreground" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold mb-4">
                Digital Security
              </h3>
              <p className="opacity-90">
                Your data and borrowing history are protected with enterprise-grade security
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-4xl font-bold mb-6">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of readers who have discovered their next favorite book through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-semibold px-8" asChild>
              <Link to="/register">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="font-semibold px-8" asChild>
              <Link to="/catalog">
                Browse Books
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;