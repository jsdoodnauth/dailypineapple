import { getStoryBySlug, getRandomStories, Story } from '@/lib/database';
import StoryCard from '@/components/ui/story-card';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ShareButtons from '@/components/ui/share-buttons';
import { appConfig } from '@/lib/utils';

interface StoryPageProps {
  params: {
    slug: string;
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const story = await getStoryBySlug(params.slug);
  
  if (!story) {
    notFound();
  }

  const relatedStories = getRandomStories(4, story.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2">
        <article className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-100">
          {/* Article Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Link 
                href={`/section/${story.section.toLowerCase()}`}
                className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold hover:bg-purple-300 transition-colors"
              >
                {story.section}
              </Link>
              { appConfig.storyViewsToggle && <span className="text-gray-500 text-sm">{story.views} views</span> }
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
              {story.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <span>By <span className="font-semibold">{story.author}</span></span>
              <span>•</span>
              <span>{new Date(story.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            
            <div className="h-px bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 mb-6"></div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {story.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Article Footer */}
          <div className="mt-8 pt-6 border-t border-purple-100">
            <div className="flex flex-wrap gap-2 mb-4">
              {JSON.parse(story.tags).length > 0 &&  JSON.parse(story.tags).map((tag: string) => (
                <span key={tag} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <Link 
                href="/"
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                ← Back to Home
              </Link>
              <span className="text-sm text-gray-500">
                Article #{story.id}
              </span>
            </div>
          </div>
        </article>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Related Stories */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">You Might Also Enjoy</h3>
          <div className="space-y-4">
            {(await relatedStories).map((relatedStory: Story) => (
              <StoryCard key={relatedStory.id} story={relatedStory} compact={true} />
            ))}
          </div>
        </div>

        {/* Share Article */}
        <ShareButtons 
          title={story.title}
          url={`/story/${story.url_slug}`}
          excerpt={story.excerpt}
        />
      </div>
    </div>
  );
}