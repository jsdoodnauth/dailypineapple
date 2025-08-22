import { getStoriesBySection } from '@/lib/database';
import StoryCard from '@/components/ui/story-card';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories } from '@/lib/models';

interface SectionPageProps {
  params: {
    category: string;
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  
  if (!categories.includes(category)) {
    notFound();
  }

  const today = new Date().toISOString().split('T')[0];
  const stories = await getStoriesBySection(category, today);
  const featuredStory = stories.find(s => s.featured);
  const otherStories = stories.filter(s => !s.featured);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8 bg-gradient-to-r from-purple-100 via-pink-50 to-blue-50 rounded-2xl border border-purple-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{category} News</h1>
        <p className="text-gray-600">The most important {category.toLowerCase()} stories you never knew you needed</p>
      </div>

      {/* Bento Grid Layout */}
      {stories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
          {/* Featured Story - Large Box */}
          {featuredStory && (
            <div className="lg:col-span-2 lg:row-span-2">
              <StoryCard story={featuredStory} featured={true} />
            </div>
          )}
          
          {/* Other Stories */}
          {otherStories.map((story, index) => (
            <div 
              key={story.id}
              className={`${
                !featuredStory && index === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <StoryCard story={story} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">No stories available today</h2>
          <p className="text-gray-500">Check back tomorrow for more {category.toLowerCase()} news!</p>
        </div>
      )}

      {/* Previous Day Button */}
      <div className="text-center py-8">
        <Link 
          href={`/section/${params.category}/previous-day`}
          className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center gap-2"
        >
          ← View Previous Day's {category} Stories
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return categories.map(category => ({
    category: category.toLowerCase()
  }));
}