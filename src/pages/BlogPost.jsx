import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import LeadForm from '@/components/landing/LeadForm';
import SeoHead from '@/components/blog/SeoHead';
import BlogHeroBand from '@/components/blog/BlogHeroBand';
import ArticleConsultBanner from '@/components/blog/ArticleConsultBanner';
import BlogReadMore from '@/components/blog/BlogReadMore';
import BackToTop from '@/components/blog/BackToTop';
import PageNotFound from '@/lib/PageNotFound';
import { getAllPosts, getPostBySlug, getRelatedPosts, splitBodyForBanner } from '@/lib/blog';
import { buildArticleJsonLd, canonicalBlogUrl } from '@/lib/blog-seo';
import { useLanguage } from '@/lib/LanguageContext';

const markdownComponents = {
  h2: ({ children }) => <h2 className="b2g-h text-b2g-obsidian text-2xl mt-12 mb-4">{children}</h2>,
  h3: ({ children }) => <h3 className="b2g-h text-b2g-obsidian text-xl mt-8 mb-3">{children}</h3>,
  p: ({ children }) => <p className="mb-5 text-base">{children}</p>,
  ul: ({ children }) => <ul className="mb-5 list-disc pl-5 space-y-2">{children}</ul>,
  ol: ({ children }) => <ol className="mb-5 list-decimal pl-5 space-y-2">{children}</ol>,
  a: ({ href, children }) => (
    <a href={href} className="text-b2g-copper b2g-link-underline">
      {children}
    </a>
  ),
  img: ({ src, alt }) => (
    <img src={src} alt={alt || ''} className="my-8 w-full border border-black/10" style={{ borderRadius: '2px' }} />
  ),
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-black/15 px-3 py-2 text-left text-b2g-obsidian">{children}</th>
  ),
  td: ({ children }) => <td className="border border-black/15 px-3 py-2">{children}</td>,
};

function ArticleBody({ markdown }) {
  if (!markdown) return null;
  return (
    <div className="b2g-prose text-[#1a2035] leading-relaxed">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const copy = t.blog;
  const post = getPostBySlug(slug);

  if (!post) return <PageNotFound />;

  const canonical = canonicalBlogUrl(post.slug);
  const jsonLd = buildArticleJsonLd(post);
  const related = getRelatedPosts(getAllPosts(), post.slug, 3);
  const { before, after } = splitBodyForBanner(post.body);

  return (
    <div className="b2g-page min-h-screen">
      <SeoHead
        title={`${post.title} · B2G Global`}
        description={post.description}
        canonical={canonical}
        image={post.coverImage}
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-16">
        <BlogHeroBand kicker={post.category} title={post.title} />
        <article className="b2g-blog relative overflow-x-hidden py-12 lg:py-16">
          <div className="max-w-[760px] mx-auto px-6 lg:px-10">
            <Link to="/blog" className="b2g-label b2g-link-underline inline-block mb-8 text-b2g-copper">
              {copy.back}
            </Link>
            <p className="text-sm text-neutral-500 mb-10">
              {post.author.name}
              {post.datePublished ? ` · ${post.datePublished}` : ''}
              {post.readTime ? ` · ${post.readTime}` : ''}
            </p>
            {post.coverImage ? (
              <img
                src={post.coverImage}
                alt=""
                className="w-full h-56 sm:h-72 lg:h-[22rem] object-cover mb-12 border border-black/10"
                style={{ borderRadius: '2px' }}
              />
            ) : null}

            <ArticleBody markdown={before} />
            <ArticleConsultBanner />
            <ArticleBody markdown={after} />

            {post.faq.length > 0 ? (
              <section className="mt-16">
                <h2 className="b2g-h text-b2g-obsidian text-2xl mb-6">{copy.faq}</h2>
                <dl className="space-y-6">
                  {post.faq.map((item) => (
                    <div key={item.question}>
                      <dt className="text-b2g-obsidian font-medium mb-2">{item.question}</dt>
                      <dd className="text-neutral-600 text-sm leading-relaxed">{item.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            <section id="blog-lead-form" className="mt-16 pt-12 border-t border-black/10 scroll-mt-24">
              <h2 className="b2g-h text-b2g-obsidian text-2xl mb-4">{copy.ctaHeading}</h2>
              <p className="text-neutral-600 mb-8">{copy.ctaBody}</p>
              <LeadForm
                tone="light"
                source="blog"
                form={`blog-${post.slug}`}
                page={typeof window !== 'undefined' ? window.location.href : `/blog/${post.slug}/`}
                messagePlaceholder={copy.messagePlaceholder}
              />
            </section>

            <BlogReadMore posts={related} />
          </div>
        </article>
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
}
