import Link from 'next/link';
import { Story } from '@/lib/database';
import { appConfig } from '@/lib/utils';

interface StoryCardProps {
  story: Story;
  featured?: boolean;
  compact?: boolean;
}

export default function StoryCard({ story, featured = false, compact = false }: StoryCardProps) {
  const cardClass = featured
    ? "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg hover:shadow-purple-100"
    : "bg-white hover:shadow-md hover:shadow-gray-100";

  if (compact) {
    return (
      <div className="group h-full">
        <Link href={`/story/${story.url_slug}`}>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-purple-100 hover:bg-white/80 hover:border-purple-200 transition-all duration-200 hover:shadow-md h-full flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                {story.section}
              </span>
              { appConfig.storyViewsToggle && <span className="text-gray-500 text-xs">{story.views} views</span>}
            </div>
            <h3 className="font-bold text-gray-800 text-sm mb-2 group-hover:text-purple-600 transition-colors line-clamp-2 flex-grow">
              {story.title}
            </h3>
            <p className="text-xs text-gray-500">By {story.author}</p>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="group h-full">
      <Link href={`/story/${story.url_slug}`}>
        <div className={`bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100 hover:bg-white hover:border-purple-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden h-full flex flex-col ${
          featured ? 'p-6' : 'p-5'
        }`}>
          {/* Story Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
              {story.section}
            </span>
            { appConfig.storyViewsToggle && 
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span>{story.views} views</span>
              </div>
            }
          </div>

          {/* Story Title */}
          <h2 className={`font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors line-clamp-3 flex-grow ${
            featured ? 'text-2xl' : 'text-lg'
          }`}>
            {story.title}
          </h2>

          {/* Story Excerpt */}
          {!compact && (
            <p className={`text-gray-600 mb-4 line-clamp-3 ${
              featured ? 'text-base' : 'text-sm'
            }`}>
              {story.excerpt}
            </p>
          )}

          {/* Story Footer */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-gray-500 text-sm">By {story.author}</span>
            <span className="text-purple-600 group-hover:text-purple-700 font-medium text-sm transition-colors">
              Read more →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}