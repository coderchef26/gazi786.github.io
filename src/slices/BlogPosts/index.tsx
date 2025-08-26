"use client";

import { FC, useEffect, useState } from "react";
import { Content, asDate, isFilled } from "@prismicio/client";
import * as prismic from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { motion } from "framer-motion";
import { useAtlas } from "@/components/atlas/AtlasProvider";
import Link from "next/link";
import { FaCalendarAlt, FaClock, FaTag, FaArrowRight, FaNewspaper } from "react-icons/fa";

/**
 * Props for `BlogPosts`.
 */
export type BlogPostsProps = SliceComponentProps<Content.BlogpostsSlice>;

/**
 * Component for "BlogPosts" Slices.
 */
const BlogPosts: FC<BlogPostsProps> = ({ slice }) => {
  const { announce, speak, config } = useAtlas();
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  // Format date helper
  const formatDate = (dateField: prismic.DateField) => {
    if (!dateField) return "No date";
    const date = asDate(dateField);
    return date?.toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }) || "No date";
  };

  // Calculate reading time (rough estimate)
  const calculateReadingTime = (content: any) => {
    if (!isFilled.richText(content)) return "1 min read";
    const text = content
      .map((block: any) => block.text || "")
      .join(" ");
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Extract unique tags from all blog posts
  const allTags = slice.items && slice.items.length > 0
    ? Array.from(new Set(
        slice.items.flatMap((item: any) => 
          item.post_tags && isFilled.keyText(item.post_tags)
            ? item.post_tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
            : []
        )
      ))
    : [];

  // Voice command registration
  useEffect(() => {
    if (!config.assistant.enabled) return;

    const commands = [
      {
        pattern: /read.*blog|show.*articles?|display.*posts?/i,
        action: () => {
          announce("Here are my latest blog posts and articles");
          if (isFilled.keyText(slice.primary?.title)) {
            speak(slice.primary.title);
          }
        }
      },
      {
        pattern: /filter.*tag|show.*(\w+).*posts?/i,
        action: (match: string) => {
          const tagMatch = match.match(/show.*(\w+).*posts?/i);
          if (tagMatch?.[1] && allTags.includes(tagMatch[1])) {
            setSelectedTag(tagMatch[1]);
            announce(`Filtering posts by ${tagMatch[1]}`);
          }
        }
      }
    ];

    // Register commands with ATLAS
    commands.forEach(cmd => {
      // Command registration would happen here
    });
  }, [config.assistant.enabled, announce, speak, slice.primary, allTags]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section 
      data-slice-type={slice.slice_type} 
      data-slice-variation={slice.variation}
      className="relative py-20 overflow-hidden"
      aria-label="Blog Posts Section"
    >
      {/* ATLAS HUD Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950/50 to-slate-900" />
      
      {/* Arc Reactor Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, #00d4ff 1px, transparent 1px),
            linear-gradient(#00d4ff 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <FaNewspaper className="text-3xl text-cyan-400" />
            <h2 className="text-4xl font-orbitron font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {isFilled.keyText(slice.primary?.title) 
                ? slice.primary.title 
                : "Blog Posts"}
            </h2>
          </div>
          
          {isFilled.keyText(slice.primary?.excerpt) && (
            <p className="text-lg text-cyan-200/80 max-w-3xl mx-auto mt-4 font-inter">
              {slice.primary.excerpt}
            </p>
          )}
        </motion.div>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <button
              onClick={() => setSelectedTag("all")}
              className={`px-4 py-2 rounded-full font-inter text-sm transition-all duration-300 ${
                selectedTag === "all"
                  ? "bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/50"
                  : "bg-slate-800/50 text-cyan-300 hover:bg-slate-700/50 border border-cyan-500/30"
              }`}
              aria-pressed={selectedTag === "all"}
            >
              All Posts
            </button>
            {allTags.map((tag: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full font-inter text-sm transition-all duration-300 ${
                  selectedTag === tag
                    ? "bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/50"
                    : "bg-slate-800/50 text-cyan-300 hover:bg-slate-700/50 border border-cyan-500/30"
                }`}
                aria-pressed={selectedTag === tag}
              >
                <FaTag className="inline mr-2" />
                {tag}
              </button>
            ))}
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        {slice.items && slice.items.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {slice.items
              .filter((item: any) => {
                if (selectedTag === "all") return true;
                if (!item.post_tags || !isFilled.keyText(item.post_tags)) return false;
                const tags = item.post_tags.split(',').map((tag: string) => tag.trim());
                return tags.includes(selectedTag);
              })
              .map((item: any, index: number) => (
                <motion.article
                  key={index}
                  variants={itemVariants}
                  className="relative group"
                  onMouseEnter={() => setExpandedPost(index)}
                  onMouseLeave={() => setExpandedPost(null)}
                >
                  <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-xl border border-cyan-500/30 overflow-hidden transition-all duration-500 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 h-full">
                    {/* Featured Image */}
                    {isFilled.image(item.featured_image) && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.featured_image.url}
                          alt={item.featured_image.alt || item.post_title || "Blog post"}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                      </div>
                    )}

                    {/* Holographic Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse" />
                    </div>

                    <div className="p-6 flex flex-col h-full">
                      {/* Post Header */}
                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-cyan-300/70">
                        {item.publish_date && (
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-cyan-400" />
                            <time dateTime={item.publish_date}>
                              {formatDate(item.publish_date)}
                            </time>
                          </div>
                        )}
                        {item.post_content && (
                          <div className="flex items-center gap-2">
                            <FaClock className="text-cyan-400" />
                            <span>{calculateReadingTime(item.post_content)}</span>
                          </div>
                        )}
                      </div>

                      {/* Post Title */}
                      {isFilled.keyText(item.post_title) && (
                        <h3 className="text-xl font-orbitron font-bold text-cyan-100 mb-3 group-hover:text-cyan-300 transition-colors">
                          {item.post_title}
                        </h3>
                      )}

                      {/* Post Excerpt */}
                      {isFilled.keyText(item.post_excerpt) && (
                        <p className="text-cyan-200/70 mb-4 line-clamp-3 flex-grow">
                          {item.post_excerpt}
                        </p>
                      )}

                      {/* Post Content Preview */}
                      {isFilled.richText(item.post_content) && (
                        <div className="rich-text prose prose-invert prose-sm max-w-none line-clamp-3 mb-4">
                          <PrismicRichText 
                            field={item.post_content}
                            components={{
                              paragraph: ({ children }) => (
                                <p className="text-cyan-100/60 text-sm leading-relaxed">{children}</p>
                              ),
                              strong: ({ children }) => (
                                <strong className="text-cyan-300 font-medium">{children}</strong>
                              ),
                              em: ({ children }) => (
                                <em className="text-cyan-200 italic">{children}</em>
                              )
                            }}
                          />
                        </div>
                      )}

                      {/* Tags */}
                      {isFilled.keyText(item.post_tags) && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {item.post_tags.split(',').map((tag: string, tagIndex: number) => {
                            const trimmedTag = tag.trim();
                            return trimmedTag && (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-inter border border-cyan-500/30"
                              >
                                <FaTag className="inline mr-1" />
                                {trimmedTag}
                              </span>
                            );
                          }).slice(0, 3)}
                          {item.post_tags.split(',').length > 3 && (
                            <span className="px-2 py-1 text-cyan-300/50 text-xs">
                              +{item.post_tags.split(',').length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* ATLAS Integration Indicator */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                        <span className="text-xs text-cyan-300 font-mono">ATLAS READY</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
          </motion.div>
        ) : (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <p className="text-cyan-300/70 text-lg">
              No blog posts available yet. Check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogPosts;
