import { getStoriesBySection } from '@/lib/database';
import StoryCard from '@/components/ui/story-card';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories } from '@/lib/models';

interface CategoryDatePageProps {
  params: {
    category: string;
    date: string;
  };
}

export default async function CategoryDatePage({ params }: CategoryDatePageProps) {
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  
  if (!categories.includes(category)) {
    notFound();
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(params.date)) {
    notFound();
  }

  const date = new Date(params.date);
  if (isNaN(date.getTime())) {
    notFound();
  }

  const dateString = params.date;
  const stories = await getStoriesBySection(category, dateString);
  const featuredStory = stories.find(s => s.featured);
  const otherStories = stories.filter(s => !s.featured);

  // Get sidebar stories from other categories
  const sidebarStoriesArrays = await Promise.all(
    categories
      .filter(cat => cat !== category)
      .map(cat => getStoriesBySection(cat, dateString))
  );
  const allDateStories = sidebarStoriesArrays
    .flat()
    .filter(s => !s.featured)
    .slice(0, 6);

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate previous day
  const previousDay = new Date(date);
  previousDay.setDate(previousDay.getDate() - 1);
  const previousDayString = previousDay.toISOString().split('T')[0];

  // Check if this is today
  const today = new Date().toISOString().split('T')[0];
  const isToday = dateString === today;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8 bg-gradient-to-r from-purple-100 via-pink-50 to-blue-50 rounded-2xl border border-purple-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {isToday ? `Today's ${category} News` : `${category} News`}
        </h1>
        <p className="text-gray-600 text-lg">{formattedDate}</p>
        <p className="text-gray-500 mt-2">
          {isToday 
            ? `The most important ${category.toLowerCase()} stories you never knew you needed`
            : `The ${category.toLowerCase()} stories from this date`
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {stories.length > 0 ? (
            <>
              {/* Featured Story */}
              {featuredStory && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {isToday ? `Today's Featured ${category} Story` : `Featured ${category} Story`}
                  </h2>
                  <StoryCard story={featuredStory} featured={true} />
                </div>
              )}

              {/* Other Stories */}
              {otherStories.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {featuredStory 
                      ? `Other ${category} Stories` 
                      : `${category} Stories`
                    }
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {otherStories.map(story => (
                      <StoryCard key={story.id} story={story} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-600 mb-4">No {category.toLowerCase()} stories for this date</h2>
              <p className="text-gray-500">Check out other sections or browse different dates!</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center py-8">
            <Link 
              href={`/section/${params.category}/${previousDayString}`}
              className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center gap-2"
            >
              ← View Previous Day's {category} Stories
            </Link>
            {!isToday && (
              <Link 
                href={`/section/${params.category}`}
                className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center gap-2 ml-auto"
              >
                Back to Today's {category}
              </Link>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Top Stories</h3>
            <div className="space-y-4">
              {allDateStories.map(story => (
                <StoryCard key={story.id} story={story} compact={true} />
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Sections</h3>
            <div className="grid grid-cols-1 gap-2">
              {categories.filter(cat => cat !== category).map(section => (
                <Link 
                  key={section}
                  href={`/section/${section.toLowerCase()}/${dateString}`}
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-100 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  {section} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  // Generate params for categories and recent dates
  const dates: string[] = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }

  return categories.flatMap(category =>
    dates.map(date => ({
      category: category.toLowerCase(),
      date: date
    }))
  );
}