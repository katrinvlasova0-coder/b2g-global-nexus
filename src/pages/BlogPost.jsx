import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import LeadForm from '@/components/landing/LeadForm';
import SeoHead from '@/components/blog/SeoHead';
import PageNotFound from '@/lib/PageNotFound';
import { getPostBySlug } from '@/lib/blog';
import { buildArticleJsonLd, canonicalBlogUrl } from '@/lib/blog-seo';
import { useLanguage } from '@/lib/LanguageContext';

export default function BlogPost() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const copy = t.blog;
  const post = getPostBySlug(slug);

  if (!post) return <PageNotFound />;

  const canonical = canonicalBlogUrl(post.slug);
  const jsonLd = buildArticleJsonLd(post);

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
        <article className="relative py-16 lg:py-24" style={{ backgroundColor: '#00001a' }}>
          <div className="max-w-[760px] mx-auto px-6 lg:px-10">
            <Link to="/blog" className="b2g-label b2g-link-underline inline-block mb-8 text-b2g-cyan">
              {copy.back}
            </Link>
            <p className="b2g-label mb-4">{post.category}</p>
            <h1 className="b2g-h text-b2g-white text-4xl lg:text-5xl leading-[1.1] mb-6">{post.title}</h1>
            <p className="text-sm text-b2g-slate/80 mb-10">
              {post.author.name}
              {post.datePublished ? ` · ${post.datePublished}` : ''}
              {post.readTime ? ` · ${post.readTime}` : ''}
            </p>
            {post.coverImage ? (
              <img
                src={post.coverImage}
                alt=""
                className="w-full mb-12 border border-b2g-copper/15"
                style={{ borderRadius: '2px' }}
              />
            ) : null}

            <div className="b2g-prose text-b2g-slate leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className="b2g-h text-b2g-white text-2xl mt-12 mb-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="b2g-h text-b2g-white text-xl mt-8 mb-3">{children}</h3>
                  ),
                  p: ({ children }) => <p className="mb-5 text-base">{children}</p>,
                  ul: ({ children }) => <ul className="mb-5 list-disc pl-5 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-5 list-decimal pl-5 space-y-2">{children}</ol>,
                  a: ({ href, children }) => (
                    <a href={href} className="text-b2g-cyan b2g-link-underline">
                      {children}
                    </a>
                  ),
                  img: ({ src, alt }) => (
                    <img src={src} alt={alt || ''} className="my-8 w-full border border-b2g-copper/15" style={{ borderRadius: '2px' }} />
                  ),
                  table: ({ children }) => (
                    <div className="my-8 overflow-x-auto">
                      <table className="w-full text-sm border-collapse">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-b2g-copper/20 px-3 py-2 text-left text-b2g-white">{children}</th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-b2g-copper/20 px-3 py-2">{children}</td>
                  ),
                }}
              >
                {post.body}
              </ReactMarkdown>
            </div>

            {post.faq.length > 0 ? (
              <section className="mt-16">
                <h2 className="b2g-h text-b2g-white text-2xl mb-6">{copy.faq}</h2>
                <dl className="space-y-6">
                  {post.faq.map((item) => (
                    <div key={item.question}>
                      <dt className="text-b2g-white font-medium mb-2">{item.question}</dt>
                      <dd className="text-b2g-slate text-sm leading-relaxed">{item.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            <section id="blog-lead-form" className="mt-16 pt-12 border-t border-b2g-copper/15">
              <h2 className="b2g-h text-b2g-white text-2xl mb-4">{copy.ctaHeading}</h2>
              <p className="text-b2g-slate mb-8">{copy.ctaBody}</p>
              <LeadForm
                source="blog"
                form={`blog-${post.slug}`}
                page={typeof window !== 'undefined' ? window.location.href : `/blog/${post.slug}/`}
                messagePlaceholder={copy.messagePlaceholder}
              />
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
