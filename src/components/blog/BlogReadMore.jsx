import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';

export default function BlogReadMore({ posts }) {
  const { t } = useLanguage();
  if (!posts?.length) return null;

  return (
    <section className="mt-16 pt-12 border-t border-black/10">
      <h2 className="b2g-h text-b2g-obsidian text-2xl mb-8">{t.blog.readMore}</h2>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={`/blog/${post.slug}`}
              className="block h-full border border-black/10 hover:border-b2g-copper/60 transition-colors b2g-focus-ring bg-white overflow-hidden"
              style={{ borderRadius: '2px' }}
            >
              {post.coverImage ? (
                <img src={post.coverImage} alt="" className="w-full h-36 object-cover" />
              ) : (
                <div className="w-full h-36" style={{ backgroundColor: '#00001a' }} />
              )}
              <div className="p-4">
                <p className="b2g-label mb-2">{post.category}</p>
                <h3 className="b2g-h text-b2g-obsidian text-base leading-snug mb-2">{post.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">{post.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
