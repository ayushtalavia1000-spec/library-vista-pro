import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Star, 
  Calendar, 
  User, 
  BookOpen, 
  Heart,
  Share2,
  Download,
  Clock,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import book cover images
import bookGatsby from "@/assets/book-gatsby.jpg";
import bookMockingbird from "@/assets/book-mockingbird.jpg";
import book1984 from "@/assets/book-1984.jpg";
import bookPride from "@/assets/book-pride.jpg";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  rating: number;
  available: number;
  total: number;
  coverImage: string;
  description: string;
  isbn: string;
  publisher: string;
  pages: number;
  language: string;
  summary: string;
  reviews: Review[];
}

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample book data (in a real app, this would come from an API)
  const books: Record<string, Book> = {
    "1": {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic Literature",
      year: 1925,
      rating: 4.2,
      available: 3,
      total: 5,
      coverImage: bookGatsby,
      description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, idealism, and moral decay.",
      isbn: "978-0-7432-7356-5",
      publisher: "Scribner",
      pages: 180,
      language: "English",
      summary: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on prosperous Long Island and in New York City during the summer of 1922, the novel follows the life and times of millionaire Jay Gatsby and his neighbor Nick Carraway, who recounts Gatsby's obsession and yearning for his lost love Daisy Buchanan.",
      reviews: [
        {
          id: "1",
          user: "Sarah Johnson",
          rating: 5,
          comment: "A timeless masterpiece that captures the essence of the American Dream and its complexities.",
          date: "2024-01-15"
        },
        {
          id: "2", 
          user: "Michael Chen",
          rating: 4,
          comment: "Beautiful prose and compelling characters. A must-read for anyone interested in American literature.",
          date: "2024-01-10"
        }
      ]
    },
    "2": {
      id: "2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Classic Literature",
      year: 1960,
      rating: 4.5,
      available: 2,
      total: 4,
      coverImage: bookMockingbird,
      description: "A gripping tale of racial injustice and childhood innocence in the American South.",
      isbn: "978-0-06-112008-4",
      publisher: "J.B. Lippincott & Co.",
      pages: 281,
      language: "English",
      summary: "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature. The plot and characters are loosely based on Lee's observations of her family, her neighbors and an event that occurred near her hometown of Monroeville, Alabama, in 1936, when she was ten.",
      reviews: [
        {
          id: "3",
          user: "Emily Rodriguez",
          rating: 5,
          comment: "A powerful story that addresses important social issues with grace and humanity.",
          date: "2024-01-20"
        }
      ]
    },
    "3": {
      id: "3",
      title: "1984",
      author: "George Orwell",
      genre: "Science Fiction",
      year: 1949,
      rating: 4.4,
      available: 1,
      total: 3,
      coverImage: book1984,
      description: "A dystopian social science fiction novel about totalitarian control and surveillance.",
      isbn: "978-0-452-28423-4",
      publisher: "Secker & Warburg",
      pages: 328,
      language: "English",
      summary: "1984 is a dystopian social science fiction novel and cautionary tale by English writer George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime. The story takes place in an imagined future, the year 1984, when much of the world has fallen victim to perpetual war, omnipresent government surveillance, historical negationism, and propaganda.",
      reviews: [
        {
          id: "4",
          user: "David Thompson",
          rating: 4,
          comment: "Chilling and prophetic. More relevant today than ever before.",
          date: "2024-01-18"
        }
      ]
    },
    "4": {
      id: "4",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      year: 1813,
      rating: 4.3,
      available: 4,
      total: 6,
      coverImage: bookPride,
      description: "A romantic novel exploring the complexities of love, marriage, and social class in Georgian England.",
      isbn: "978-0-14-143951-8",
      publisher: "T. Egerton",
      pages: 432,
      language: "English",
      summary: "Pride and Prejudice is an 1813 novel of manners by Jane Austen. The novel follows the character development of Elizabeth Bennet, the protagonist of the book, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
      reviews: [
        {
          id: "5",
          user: "Jessica Wang",
          rating: 5,
          comment: "A delightful romance with wit, charm, and unforgettable characters.",
          date: "2024-01-22"
        }
      ]
    }
  };

  const book = id ? books[id] : null;

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-playfair text-2xl font-semibold mb-2">Book Not Found</h2>
          <p className="text-muted-foreground mb-4">The book you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/catalog")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Catalog
          </Button>
        </div>
      </div>
    );
  }

  const handleBorrow = () => {
    if (book.available > 0) {
      toast({
        title: "Book Reserved",
        description: `"${book.title}" has been reserved for you. Please pick it up within 3 days.`,
      });
    } else {
      toast({
        title: "Not Available",
        description: "This book is currently out of stock. You can add it to your wishlist.",
        variant: "destructive"
      });
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from Favorites" : "Added to Favorites",
      description: isFavorite 
        ? `"${book.title}" has been removed from your favorites.`
        : `"${book.title}" has been added to your favorites.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Button variant="ghost" onClick={() => navigate("/catalog")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Catalog
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Book Cover and Actions */}
          <div className="lg:col-span-1">
            <Card className="shadow-medium">
              <CardContent className="p-6">
                <div className="aspect-[3/4] relative overflow-hidden rounded-lg mb-6">
                  <img 
                    src={book.coverImage} 
                    alt={`${book.title} cover`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant={book.available > 0 ? "default" : "destructive"} className="text-xs">
                      {book.available > 0 ? "Available" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    className="w-full" 
                    onClick={handleBorrow}
                    disabled={book.available === 0}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    {book.available > 0 ? "Reserve Book" : "Out of Stock"}
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" onClick={handleFavorite}>
                      <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                      {isFavorite ? "Favorited" : "Favorite"}
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Availability */}
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Availability</span>
                    <span className="text-sm text-muted-foreground">
                      {book.available} of {book.total} copies
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(book.available / book.total) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Book Information */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="font-playfair text-4xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-accent fill-current mr-1" />
                  <span className="font-medium">{book.rating}</span>
                  <span className="text-muted-foreground ml-1">({book.reviews.length} reviews)</span>
                </div>
                <Badge variant="outline">{book.genre}</Badge>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm">{book.year}</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-playfair">Book Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Publication Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Publisher:</span>
                            <span>{book.publisher}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Year:</span>
                            <span>{book.year}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Pages:</span>
                            <span>{book.pages}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Language:</span>
                            <span>{book.language}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Library Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ISBN:</span>
                            <span className="font-mono">{book.isbn}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Genre:</span>
                            <span>{book.genre}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Available:</span>
                            <span className="font-medium">{book.available} copies</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Location:</span>
                            <span>Section A, Shelf 12</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="summary" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-playfair">Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {book.summary}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-playfair">Reader Reviews</CardTitle>
                    <CardDescription>
                      What other readers are saying about this book
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {book.reviews.map((review) => (
                        <div key={review.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{review.user}</span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < review.rating ? 'text-accent fill-current' : 'text-muted-foreground'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;