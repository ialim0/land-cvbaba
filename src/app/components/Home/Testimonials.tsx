import React from 'react';
import { Quote, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';

interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  avatar: string;
  rating: number;
}

const testimonials: TestimonialItem[] = [
  {
    name: "Michael T.",
    role: "Marketing Manager",
    text: "CVBABA helped me quantify my project successes in a way that resonated with hiring managers. The resume versions for different companies were a huge time-saver.",
    avatar: "/testimonial/michael_t.jpg",
    rating: 5
  },
  {
    name: "Sarah J.",
    role: "Software Engineer",
    text: "CVBABA’s  was a total game-changer for my application! CVBABA's AI ZEN 2.0 truly excelled at merging my technical skills with my creative accomplishments seamlessly! I even received compliments on my resume design during interviews, which really boosted my confidence!",
    avatar: "/testimonial/sarah_j.jpg",
    rating: 5
  },
 
  {
    name: "Emily R.",
    role: "Recent Graduate",
    text: "As a recent graduate competing against experienced candidates, I needed every advantage. CVBABA's AI ZEN 2.0 helped translate my internship projects into compelling achievements. The ATS optimization was crucial.",
    avatar: "/testimonial/emily_r.jpg",
    rating: 5
  },
  {
    name: "David L.",
    role: "Financial Analyst",
    text: "Transitioning from teaching to finance felt like an impossible leap—until I discovered CVBABA. Their AI ZEN 2.0 helped me uncover transferable skills I never even realized I had, making the shift so much smoother! ",
    avatar: "/testimonial/david_l.jpg",
    rating: 5
  }
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        aria-hidden="true"
      />
    ))}
  </div>
);

interface TestimonialsProps {
  t: (key: string) => string;
}

const Testimonials: React.FC<TestimonialsProps> = ({ t }) => (
  <section className="py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto text-center mb-10">
    <h2 className="text-2xl sm:text-3xl lg:text-1xl font-bold text-blue-900 mb-4 sm:mb-6">
    {t('testimonials.title')}</h2>
      <p className="text-xl text-blue-800 mb-8">
        {t('testimonials.subtitle')}
      </p>
    </div>
    <Tabs defaultValue="0" className="w-full max-w-6xl mx-auto">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
        {testimonials.map((testimonial, index) => (
          <TabsTrigger key={index} value={index.toString()} className="text-sm font-semibold text-blue-800 hover:text-blue-600 transition duration-300">
            {testimonial.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {testimonials.map((testimonial, index) => (
        <TabsContent key={index} value={index.toString()}>
          <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 border-2 border-blue-200">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl font-semibold text-blue-800">{testimonial.name}</CardTitle>
                  <CardDescription className="text-blue-600">
                    {testimonial.role}
                  </CardDescription>
                  <StarRating rating={testimonial.rating} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 pb-6 text-left">
              <Quote className="h-8 w-8 text-blue-300 mb-2" />
              <p className="text-gray-700 italic text-lg leading-relaxed">{testimonial.text}</p>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  </section>
);

export default Testimonials;
