import { getStoriesByDate, getFeaturedStories } from '@/lib/database';
import HeroBanner from '@/components/ui/hero-banner';
import StoryCard from '@/components/ui/story-card';
import Link from 'next/link';

export default async function HomePage() {
  const today = new Date().toISOString().split('T')[0];
  const todayStories = await getStoriesByDate(today);
  const featuredStories = await getFeaturedStories(today);
  const mainFeatured = featuredStories[0];
  const otherFeatured = featuredStories.slice(1);

  const nationalStories = todayStories.filter(s => s.section === 'National' && !s.featured);
  const internationalStories = todayStories.filter(s => s.section === 'International' && !s.featured);
  const sidebarStories = todayStories.filter(s => !s.featured && !['National', 'International'].includes(s.section)).slice(0, 6);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content Column */}
      <div className="lg:col-span-2 space-y-8">
        {/* Hero Banner */}
        {mainFeatured && <HeroBanner story={mainFeatured} />}

        {/* Featured Stories Grid */}
        {otherFeatured.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Stories</h2>
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

        {/* Previous Day Button */}
        <div className="text-left py-8">
          {(() => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayString = yesterday.toISOString().split('T')[0];
            return (
              <Link 
                href={`/${yesterdayString}`}
                className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center gap-2"
              >
                ← View Previous Day's Stories
              </Link>
            );
          })()}
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Top Stories</h3>
          <div className="space-y-4">
            {sidebarStories.map(story => (
              <StoryCard key={story.id} story={story} compact={true} />
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Sections</h3>
          <div className="grid grid-cols-1 gap-2">
            {['Business', 'Sports', 'Entertainment', 'Politics', 'Opinion', 'Weather'].map(section => (
              <Link 
                key={section}
                href={`/section/${section.toLowerCase()}`}
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-100 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                {section} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}