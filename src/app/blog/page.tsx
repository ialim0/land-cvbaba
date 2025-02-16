"use client";
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  Search,
  Compass,
} from 'lucide-react';
import Footer from '../components/Footer';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import Navbar from '../components/Navbar';

interface BlogPostProps {
  title: string;
  excerpt: string;
  link: string;
  date: string;
  readTime: string;
  author: string;
  tags?: string[];
}

const BlogHeader: React.FC<{
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalPosts: number;
}> = ({ searchQuery, onSearchChange, totalPosts }) => (
  <header className="w-full px-4 sm:px-6 lg:px-8 mx-auto text-center py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-slate-800 to-slate-900">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4 sm:mb-6">
      Career Insights Blog
    </h2>
    <p className="text-lg sm:text-xl mt-4 sm:mt-6 mb-6 sm:mb-8 text-gray-200 px-4">
      Transform your job search with expert guidance.
    </p>
    <div className="max-w-3xl mx-auto">
      <div className="relative group">
        <Input
          type="search"
          placeholder="What would you like to explore?"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          className="w-full py-4 px-6 text-lg pr-14 border-2 border-blue-200 focus:ring-4 focus:ring-blue-500 hover:border-blue-300 transition-all rounded-full group-hover:shadow-xl"
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 h-7 w-7 group-hover:text-blue-600 transition-colors" />
      </div>
      <p className="mt-3 text-sm text-gray-300">Explore {totalPosts} career-boosting articles</p>
    </div>
  </header>
);

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  excerpt,
  link,
  date,
  readTime,
  author,
  tags = []
}) => (
  <Card className="group hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300 rounded-xl overflow-hidden h-full flex flex-col bg-white">
    <CardHeader className="p-6 bg-gray-50 group-hover:bg-blue-50 transition-colors">
      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-800 transition-colors mb-4">
        {title}
      </h3>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </CardHeader>
    <CardContent className="p-6 space-y-4 flex-grow">
      <p className="text-gray-600 leading-relaxed text-base line-clamp-3">{excerpt}</p>
      <Link 
        href={link} 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group-hover:translate-x-1 transform"
      >
        Read Full Article <ChevronRight className="ml-1 h-5 w-5" />
      </Link>
    </CardContent>
    <CardFooter className="p-6 bg-gray-100 border-t border-gray-200 flex justify-between items-center">
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <span className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-blue-600" />
          {format(parseISO(date), 'MMM d, yyyy')}
        </span>
        <span className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-blue-600" />
          {readTime} read
        </span>
      </div>
      <span className="flex items-center text-sm">
        <User className="w-4 h-4 mr-2 text-blue-600" />
        {author}
      </span>
    </CardFooter>
  </Card>
);

const BlogContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const postsPerPage = 6;

  const posts = [
    {
      title: 'Overcoming Job Search Obstacles: Your Path to Success',
      excerpt: 'Facing challenges in your job search? Discover strategies to navigate setbacks and turn obstacles into opportunities for growth.',
      link: '/blog/overcoming-job-search-obstacles',
      date: '2024-01-15',
      readTime: '7 min',
      author: 'Jane Doe',
      tags: ['Career Growth', 'Job Search']
    },
    {
      title: 'Building Confidence in Your Job Search Journey',
      excerpt: 'Learn how to boost your self-confidence and present your best self to potential employers. Confidence can be your greatest asset.',
      link: '/blog/building-confidence-job-search',
      date: '2024-01-10',
      readTime: '6 min',
      author: 'John Smith',
      tags: ['Personal Development', 'Interview Tips']
    },
  ];

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term);
    return posts.filter(post => {
      const searchableText = `${post.title} ${post.excerpt} ${post.author} ${post.tags.join(' ')}`.toLowerCase();
      return searchTerms.every(term => searchableText.includes(term));
    });
  }, [posts, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <>
      <div className="w-full bg-gradient-to-b from-blue-50 to-white pt-20">
        <Navbar />
      </div>
      <BlogHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        totalPosts={posts.length}
      />
      <section className="max-w-6xl mx-auto w-full px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 mt-12">
        {currentPosts.length > 0 ? (
          currentPosts.map((post, index) => (
            <div key={index} className="flex flex-col h-full">
              <BlogPost {...post} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-16 text-center">
            <Compass className="w-24 h-24 text-blue-500 mb-6" />
            <p className="text-3xl text-gray-600 max-w-xl mx-auto mb-6">
              No posts found matching "{searchQuery}".
            </p>
            <Button
              onClick={() => setSearchQuery('')}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 text-lg"
            >
              Reset Search
            </Button>
          </div>
        )}
      </section>
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mb-16 mt-12">
          <Button 
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            className="rounded-full px-6 py-3"
          >
            <ChevronLeft className="mr-2 h-5 w-5" /> Previous
          </Button>
          <div className="flex items-center space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                variant={currentPage === index + 1 ? "default" : "outline"}
                className="rounded-full w-10 h-10"
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <Button 
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
            className="rounded-full px-6 py-3"
          >
            Next <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
      <Footer />
    </>
  );
};

const Blog: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <BlogContent />
    </div>
  );
};

export default Blog;