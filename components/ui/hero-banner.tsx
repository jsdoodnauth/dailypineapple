import Link from 'next/link';
import { Story } from '@/lib/database';

interface HeroBannerProps {
  story: Story;
}

export default function HeroBanner({ story }: HeroBannerProps) {
  return (
    <div className="bg-gradient-to-r from-purple-100 via-pink-50 to-blue-50 rounded-2xl p-8 mb-8 border border-purple-200">
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
          Featured Story
        </span>
        <span className="text-purple-600 text-sm font-medium">{story.category}</span>
        <span className="text-gray-500 text-sm">{story.views} views</span>
      </div>
      
      <Link href={`/story/${story.url_slug}`}>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-purple-600 transition-colors mb-4 leading-tight">
          {story.title}
        </h1>
      </Link>
      
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        {story.excerpt}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-gray-600">by <span className="font-semibold">{story.author}</span></span>
        <Link 
          href={`/story/${story.url_slug}`}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
        >
          Read Full Story
        </Link>
      </div>
    </div>
  );
}