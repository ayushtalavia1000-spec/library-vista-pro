import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Star, 
  Calendar,
  User,
  Grid3X3,
  List
} from "lucide-react";

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
}

const BookCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSort, setSelectedSort] = useState("title");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Sample book data
  const books: Book[] = [
    {
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
      isbn: "978-0-7432-7356-5"
    },
    {
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
      isbn: "978-0-06-112008-4"
    },
    {
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
      isbn: "978-0-452-28423-4"
    },
    {
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
      isbn: "978-0-14-143951-8"
    }
  ];

  const genres = ["All Genres", "Classic Literature", "Science Fiction", "Romance", "Mystery", "Biography", "History"];
  const sortOptions = [
    { value: "title", label: "Title A-Z" },
    { value: "author", label: "Author A-Z" },
    { value: "year", label: "Publication Year" },
    { value: "rating", label: "Rating" },
    { value: "availability", label: "Availability" }
  ];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "" || selectedGenre === "All Genres" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  }).sort((a, b) => {
    switch (selectedSort) {
      case "author":
        return a.author.localeCompare(b.author);
      case "year":
        return b.year - a.year;
      case "rating":
        return b.rating - a.rating;
      case "availability":
        return b.available - a.available;
      default:
        return a.title.localeCompare(b.title);
    }
  });

  const BookCard = ({ book }: { book: Book }) => (
    <Card className="library-card h-full">
      <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
        <img 
          src={book.coverImage} 
          alt={`${book.title} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={book.available > 0 ? "default" : "destructive"}>
            {book.available > 0 ? "Available" : "Out of Stock"}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="font-playfair text-lg line-clamp-2">
          {book.title}
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            {book.author}
          </span>
          <span className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {book.year}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-accent fill-current mr-1" />
            <span className="text-sm font-medium">{book.rating}</span>
          </div>
          <Badge variant="outline">{book.genre}</Badge>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">
            {book.available} of {book.total} available
          </span>
        </div>
        <Button className="w-full" asChild>
          <Link to={`/book/${book.id}`}>
            <BookOpen className="h-4 w-4 mr-2" />
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );

  const BookListItem = ({ book }: { book: Book }) => (
    <Card className="library-card">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-16 h-20">
            <img 
              src={book.coverImage} 
              alt={`${book.title} cover`}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-playfair text-lg font-semibold text-foreground truncate">
                  {book.title}
                </h3>
                <p className="text-muted-foreground">{book.author} • {book.year}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-accent fill-current mr-1" />
                  <span className="text-sm">{book.rating}</span>
                  <Badge variant="outline" className="ml-3">{book.genre}</Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={book.available > 0 ? "default" : "destructive"}>
                  {book.available > 0 ? "Available" : "Out of Stock"}
                </Badge>
                <Button size="sm" asChild>
                  <Link to={`/book/${book.id}`}>View</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-4xl font-bold mb-4">Book Catalog</h1>
          <p className="text-xl opacity-90">
            Discover your next great read from our extensive collection
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card rounded-lg shadow-soft p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select onValueChange={setSelectedGenre}>
              <SelectTrigger>
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setSelectedSort}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by Title" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredBooks.length} of {books.length} books
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Books Display */}
        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBooks.map(book => (
              <BookListItem key={book.id} book={book} />
            ))}
          </div>
        )}

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-playfair text-2xl font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all available books.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCatalog;