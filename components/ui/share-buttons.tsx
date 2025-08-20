'use client';

import { useState } from 'react';
import { Share, Twitter, Facebook, Link, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
  excerpt: string;
}

export default function ShareButtons({ title, url, excerpt }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : url;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedExcerpt = encodeURIComponent(excerpt);

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=DailyChuckle`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
      <div className="flex items-center gap-2 mb-3">
        <Share className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-bold text-gray-800">Share This Story</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Spread the laughter with your friends and family!
      </p>
      <div className="space-y-2">
        <button 
          onClick={handleTwitterShare}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 font-medium"
        >
          <Twitter className="w-4 h-4" />
          Share on X (Twitter)
        </button>
        <button 
          onClick={handleFacebookShare}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 font-medium"
        >
          <Facebook className="w-4 h-4" />
          Share on Facebook
        </button>
        <button 
          onClick={handleCopyLink}
          className={`w-full py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 font-medium ${
            copied 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-gray-500 hover:bg-gray-600 text-white'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Link Copied!
            </>
          ) : (
            <>
              <Link className="w-4 h-4" />
              Copy Link
            </>
          )}
        </button>
      </div>
    </div>
  );
}