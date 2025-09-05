import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Heart, 
  Calendar,
  User,
  Star,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Award
} from "lucide-react";

// Import book cover images
import bookGatsby from "@/assets/book-gatsby.jpg";
import bookMockingbird from "@/assets/book-mockingbird.jpg";
import book1984 from "@/assets/book-1984.jpg";
import bookPride from "@/assets/book-pride.jpg";

interface BorrowedBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  borrowDate: string;
  dueDate: string;
  status: "active" | "overdue" | "returned";
  renewalsLeft: number;
}

interface FavoriteBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  genre: string;
  rating: number;
}

interface ReadingStats {
  booksRead: number;
  booksThisMonth: number;
  currentStreak: number;
  favoriteGenre: string;
  totalPages: number;
  avgRating: number;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    membershipType: "Premium",
    joinDate: "2023-01-15",
    memberId: "LIB-2023-0156"
  };

  const borrowedBooks: BorrowedBook[] = [
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverImage: bookGatsby,
      borrowDate: "2024-01-15",
      dueDate: "2024-02-15",
      status: "active",
      renewalsLeft: 2
    },
    {
      id: "2",
      title: "1984",
      author: "George Orwell",
      coverImage: book1984,
      borrowDate: "2024-01-10",
      dueDate: "2024-01-25",
      status: "overdue",
      renewalsLeft: 0
    },
    {
      id: "3",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      coverImage: bookPride,
      borrowDate: "2024-01-01",
      dueDate: "2024-01-20",
      status: "returned",
      renewalsLeft: 0
    }
  ];

  const favoriteBooks: FavoriteBook[] = [
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverImage: bookGatsby,
      genre: "Classic Literature",
      rating: 4.2
    },
    {
      id: "2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      coverImage: bookMockingbird,
      genre: "Classic Literature",
      rating: 4.5
    }
  ];

  const readingStats: ReadingStats = {
    booksRead: 24,
    booksThisMonth: 3,
    currentStreak: 12,
    favoriteGenre: "Classic Literature",
    totalPages: 6240,
    avgRating: 4.3
  };

  const activeBorrowedBooks = borrowedBooks.filter(book => book.status === "active");
  const overdueBorrowedBooks = borrowedBooks.filter(book => book.status === "overdue");

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const BorrowedBookCard = ({ book }: { book: BorrowedBook }) => {
    const daysUntilDue = getDaysUntilDue(book.dueDate);
    
    return (
      <Card className="library-card">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-16">
              <img 
                src={book.coverImage} 
                alt={`${book.title} cover`}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-playfair text-base font-semibold truncate">
                {book.title}
              </h3>
              <p className="text-sm text-muted-foreground">{book.author}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge 
                  variant={
                    book.status === "overdue" ? "destructive" : 
                    daysUntilDue <= 3 ? "secondary" : "default"
                  }
                  className="text-xs"
                >
                  {book.status === "overdue" 
                    ? "Overdue" 
                    : `Due in ${daysUntilDue} days`
                  }
                </Badge>
                {book.renewalsLeft > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {book.renewalsLeft} renewals left
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              {book.renewalsLeft > 0 && book.status !== "overdue" && (
                <Button size="sm" variant="outline">
                  Renew
                </Button>
              )}
              <Button size="sm" asChild>
                <Link to={`/book/${book.id}`}>View</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const FavoriteBookCard = ({ book }: { book: FavoriteBook }) => (
    <Card className="library-card">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-12 h-16">
            <img 
              src={book.coverImage} 
              alt={`${book.title} cover`}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-playfair text-base font-semibold truncate">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="outline" className="text-xs">{book.genre}</Badge>
              <div className="flex items-center">
                <Star className="h-3 w-3 text-accent fill-current mr-1" />
                <span className="text-xs">{book.rating}</span>
              </div>
            </div>
          </div>
          <Button size="sm" asChild>
            <Link to={`/book/${book.id}`}>View</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair text-4xl font-bold mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-xl opacity-90">
                Track your reading journey and manage your library account
              </p>
            </div>
            <Badge variant="secondary" className="text-primary font-semibold px-4 py-2">
              {user.membershipType} Member
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{activeBorrowedBooks.length}</div>
              <div className="text-sm text-muted-foreground">Books Borrowed</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{favoriteBooks.length}</div>
              <div className="text-sm text-muted-foreground">Favorites</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{readingStats.currentStreak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">{readingStats.booksRead}</div>
              <div className="text-sm text-muted-foreground">Books Read</div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {overdueBorrowedBooks.length > 0 && (
          <Card className="mb-8 border-destructive">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <span className="font-semibold text-destructive">
                  You have {overdueBorrowedBooks.length} overdue book(s)
                </span>
              </div>
              <p className="text-sm text-muted-foreground ml-7">
                Please return them as soon as possible to avoid late fees.
              </p>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="borrowed">Borrowed Books</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="stats">Reading Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Current Books */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Currently Reading
                  </CardTitle>
                  <CardDescription>
                    Books you currently have borrowed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeBorrowedBooks.slice(0, 3).map(book => (
                      <BorrowedBookCard key={book.id} book={book} />
                    ))}
                    {activeBorrowedBooks.length === 0 && (
                      <p className="text-muted-foreground text-center py-4">
                        No books currently borrowed
                      </p>
                    )}
                  </div>
                  {activeBorrowedBooks.length > 3 && (
                    <Button variant="outline" className="w-full mt-4">
                      View All Borrowed Books
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Reading Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Reading Progress
                  </CardTitle>
                  <CardDescription>
                    Your reading achievements this month
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Monthly Goal</span>
                      <span className="text-sm text-muted-foreground">
                        {readingStats.booksThisMonth}/5 books
                      </span>
                    </div>
                    <Progress value={(readingStats.booksThisMonth / 5) * 100} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-accent">
                        {readingStats.totalPages.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Pages Read</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-accent">
                        {readingStats.avgRating}
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="borrowed" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Borrowed Books</CardTitle>
                <CardDescription>
                  Manage your currently borrowed books and renewals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {borrowedBooks.filter(book => book.status !== "returned").map(book => (
                    <BorrowedBookCard key={book.id} book={book} />
                  ))}
                  {borrowedBooks.filter(book => book.status !== "returned").length === 0 && (
                    <div className="text-center py-8">
                      <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-playfair text-xl font-semibold mb-2">No borrowed books</h3>
                      <p className="text-muted-foreground mb-4">
                        Start exploring our catalog to borrow your first book
                      </p>
                      <Button asChild>
                        <Link to="/catalog">Browse Catalog</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Favorite Books
                </CardTitle>
                <CardDescription>
                  Your personal collection of favorite reads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {favoriteBooks.map(book => (
                    <FavoriteBookCard key={book.id} book={book} />
                  ))}
                  {favoriteBooks.length === 0 && (
                    <div className="text-center py-8">
                      <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-playfair text-xl font-semibold mb-2">No favorites yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Add books to your favorites to keep track of books you love
                      </p>
                      <Button asChild>
                        <Link to="/catalog">Discover Books</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair">Reading Statistics</CardTitle>
                  <CardDescription>
                    Your reading habits and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary-lighter rounded-lg">
                      <div className="text-3xl font-bold text-primary">
                        {readingStats.booksRead}
                      </div>
                      <div className="text-sm text-muted-foreground">Books Read</div>
                    </div>
                    <div className="text-center p-4 bg-accent-light rounded-lg">
                      <div className="text-3xl font-bold text-accent-foreground">
                        {readingStats.currentStreak}
                      </div>
                      <div className="text-sm text-muted-foreground">Day Streak</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Favorite Genre</span>
                      <span className="text-sm text-muted-foreground">
                        {readingStats.favoriteGenre}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair">Account Information</CardTitle>
                  <CardDescription>
                    Your library membership details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member ID:</span>
                      <span className="font-mono">{user.memberId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Membership:</span>
                      <Badge>{user.membershipType}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member Since:</span>
                      <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;