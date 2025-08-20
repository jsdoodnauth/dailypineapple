import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-purple-200 max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Story Not Found</h2>
          <p className="text-gray-600 mb-8">
            Looks like this story escaped our newsroom! Don't worry, we have plenty more ridiculous news to keep you entertained.
          </p>
          <div className="space-y-3">
            <Link 
              href="/"
              className="block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Back to Home
            </Link>
            <Link 
              href="/section/entertainment"
              className="block bg-purple-100 hover:bg-purple-200 text-purple-700 px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Browse Entertainment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}