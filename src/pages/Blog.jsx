import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import SeoHead from '@/components/blog/SeoHead';
import BlogHeroBand from '@/components/blog/BlogHeroBand';
import BackToTop from '@/components/blog/BackToTop';
import { BLOG_CATEGORIES, getAllPosts, getPostsByCategory } from '@/lib/blog';
import { canonicalBlogIndexUrl } from '@/lib/blog-seo';
import { useLanguage } from '@/lib/LanguageContext';

export default function Blog() {
  const { t } = useLanguage();
  const copy = t.blog;
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || '';
  const posts = useMemo(
    () => (category ? getPostsByCategory(category) : getAllPosts()),
    [category],
  );

  const setCategory = (next) => {
    const nextParams = new URLSearchParams(params);
    if (!next) nextParams.delete('category');
    else nextParams.set('category', next);
    setParams(nextParams, { replace: true });
  };

  return (
    <div className="b2g-page min-h-screen">
      <SeoHead
        title={`${copy.title} · B2G Global`}
        description={copy.subtitle}
        canonical={canonicalBlogIndexUrl()}
        type="website"
      />
      <Navbar />
      <main className="pt-16">
        <BlogHeroBand kicker={copy.label} title={copy.title} />
        <section className="b2g-blog relative py-12 lg:py-16">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
            <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">{copy.subtitle}</p>

            <div className="mt-10 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory('')}
                className={`px-4 py-2 text-sm border b2g-focus-ring ${!category ? 'border-b2g-copper text-b2g-copper bg-[#f0f5ff]' : 'border-black/15 text-neutral-600'}`}
                style={{ borderRadius: '2px' }}
              >
                {copy.all}
              </button>
              {BLOG_CATEGORIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`px-4 py-2 text-sm border b2g-focus-ring ${category === item ? 'border-b2g-copper text-b2g-copper bg-[#f0f5ff]' : 'border-black/15 text-neutral-600'}`}
                  style={{ borderRadius: '2px' }}
                >
                  {copy.categories?.[item] || item}
                </button>
              ))}
            </div>

            {posts.length === 0 ? (
              <p className="mt-16 text-neutral-600">{copy.empty}</p>
            ) : (
              <ul className="mt-12 space-y-6">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="flex flex-col md:flex-row overflow-hidden border border-black/10 hover:border-b2g-copper/60 transition-colors b2g-focus-ring bg-white"
                      style={{ borderRadius: '2px' }}
                    >
                      <div className="relative w-full md:w-80 h-48 md:self-stretch md:min-h-[12rem] shrink-0 overflow-hidden bg-b2g-obsidian">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="p-6 flex flex-col justify-center">
                        <p className="b2g-label mb-3">{post.category}</p>
                        <h2 className="b2g-h text-b2g-obsidian text-2xl mb-3">{post.title}</h2>
                        <p className="text-neutral-600 text-sm leading-relaxed">{post.description}</p>
                        <p className="mt-4 text-xs text-neutral-500">
                          {post.datePublished}
                          {post.readTime ? ` · ${post.readTime}` : ''}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
}
