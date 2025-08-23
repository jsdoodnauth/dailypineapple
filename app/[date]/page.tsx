import { getStoriesByDate, getFeaturedStories } from '@/lib/database';
import StoryCard from '@/components/ui/story-card';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface DatePageProps {
  params: {
    date: string;
  };
}

export default async function DatePage({ params }: DatePageProps) {
  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(params.date)) {
    notFound();
  }
  
  const [year, month, day] = params.date.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  if (isNaN(date.getTime())) {
    notFound();
  }

  const dateString = params.date;
  const stories = await getStoriesByDate(dateString);
  const featuredStories = await getFeaturedStories(dateString);
  const mainFeatured = featuredStories[0];
  const otherFeatured = featuredStories.slice(1);

  const nationalStories = stories.filter(s => s.section === 'National' && !s.featured);
  const internationalStories = stories.filter(s => s.section === 'International' && !s.featured);
  const sidebarStories = stories.filter(s => !s.featured && !['National', 'International'].includes(s.section)).slice(0, 6);

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  console.log('formatted: ', date, formattedDate);

  // Calculate previous day
  const previousDay = new Date(date);
  const previousDayString = previousDay.toISOString().split('T')[0];

  // Check if this is today
  const today = new Date().toISOString().split('T')[0];
  const isToday = dateString === today;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8 bg-gradient-to-r from-purple-100 via-pink-50 to-blue-50 rounded-2xl border border-purple-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {isToday ? "Today's Stories" : "Stories from the Past"}
        </h1>
        <p className="text-gray-600 text-lg">{formattedDate}</p>
        <p className="text-gray-500 mt-2">
          {isToday ? "Your daily dose of ridiculous news" : "Catching up on the day's most ridiculous news"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {stories.length > 0 ? (
            <>
              {/* Featured Story */}
              {mainFeatured && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {isToday ? "Today's Top Story" : "Top Story"}
                  </h2>
                  <StoryCard story={mainFeatured} featured={true} />
                </div>
              )}

              {/* Other Featured Stories */}
              {otherFeatured.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Other Featured Stories</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {otherFeatured.map(story => (
                      <StoryCard key={story.id} story={story} featured={true} />
                    ))}
                  </div>
                </div>
              )}

              {/* National News */}
              {nationalStories.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">National News</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {nationalStories.map(story => (
                      <StoryCard key={story.id} story={story} />
                    ))}
                  </div>
                </div>
              )}

              {/* International News */}
              {internationalStories.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">International News</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {internationalStories.map(story => (
                      <StoryCard key={story.id} story={story} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-600 mb-4">No stories available for this date</h2>
              <p className="text-gray-500">Check back later or browse other dates!</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center py-8">
            <Link 
              href={`/${previousDayString}`}
              className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center gap-2"
            >
              ← View Previous Day's Stories
            </Link>
            {!isToday && (
              <Link 
                href="/"
                className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center gap-2 ml-auto"
              >
                View Today's Stories
              </Link>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Top Stories from Other Sections</h3>
            <div className="space-y-4">
              {sidebarStories.map(story => (
                <StoryCard key={story.id} story={story} compact={true} />
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Quick Navigation</h3>
            <div className="grid grid-cols-1 gap-2">
              {['Business', 'Sports', 'Entertainment', 'Politics', 'Opinion', 'Weather'].map(section => (
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