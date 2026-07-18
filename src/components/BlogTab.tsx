import React, { useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  organization: string;
  excerpt: string;
  content: string;
  tags: string[];
}

const BlogTab: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 'aiml-chatbot',
      title: 'Building a Chatbot using AIML parser in CMS',
      date: 'Nov 25, 2016',
      organization: 'Faichi Solutions Pvt. Ltd.',
      excerpt: 'Learn how to integrate Artificial Intelligence Markup Language (AIML) parser into Drupal CMS to build intelligent chatbots for automated user interactions.',
      tags: ['AI', 'Chatbot', 'AIML', 'Drupal', 'CMS'],
      content: `# Building a Chatbot using AIML parser in CMS

## Introduction

Artificial Intelligence Markup Language (AIML) is an XML-based markup language designed to create natural language software agents. In this tutorial, I'll walk you through building a chatbot using the AIML Parser module in Drupal CMS.

## What is AIML?

AIML (Artificial Intelligence Markup Language) was developed by Richard Wallace and the Alicebot free software community between 1995-2002. It allows developers to create conversational agents that can understand and respond to user inputs in natural language.

## AIML Parser Module for Drupal

The AIML Parser module brings the power of AIML to Drupal, enabling developers to:
- Create intelligent chatbots directly within their CMS
- Define conversation patterns and responses
- Handle complex dialogue flows
- Integrate chatbot functionality into any Drupal site

## Key Features

### Pattern Matching
AIML uses pattern matching to understand user inputs. The chatbot can recognize various phrasings of the same question and provide appropriate responses.

### Context Awareness
The parser maintains conversation context, allowing for more natural multi-turn dialogues.

### Easy Integration
The module integrates seamlessly with Drupal's architecture, making it easy to add chatbot functionality to existing sites.

## Implementation Steps

1. **Install the AIML Parser Module**
   - Download from drupal.org/project/aiml_parser
   - Enable the module in your Drupal site

2. **Create AIML Files**
   - Define your conversation patterns
   - Set up responses and dialogue flows

3. **Configure the Chatbot**
   - Set up the chatbot interface
   - Customize appearance and behavior

4. **Test and Deploy**
   - Test various conversation scenarios
   - Deploy to production

## Use Cases

- **Customer Support**: Automate common customer queries
- **Developer Assistance**: Help developers with common tasks
- **Content Discovery**: Guide users to relevant content
- **Interactive Forms**: Create conversational form experiences

## Conclusion

The AIML Parser module for Drupal provides a powerful way to add AI-powered chatbot functionality to your CMS. It's particularly useful for automating developer workflows, customer support, and creating interactive user experiences.

For more information, visit the project page on drupal.org or check out the module on GitLab.
`
    },
    {
      id: 'eu-cookie',
      title: 'EU cookie implementation in CMS, JAVASCRIPT',
      date: 'Nov 25, 2016',
      organization: 'Faichi Solutions Pvt. Ltd.',
      excerpt: 'Comprehensive guide to implementing EU Cookie Compliance in Drupal CMS using JavaScript for GDPR compliance.',
      tags: ['JavaScript', 'GDPR', 'Cookies', 'Drupal', 'Privacy'],
      content: `# EU Cookie Implementation in CMS with JavaScript

## Introduction

With the introduction of the EU Cookie Law (now part of GDPR), websites must obtain user consent before storing or retrieving information from their devices. This guide covers implementing cookie compliance in Drupal CMS.

## EU Cookie Law Requirements

The EU Cookie Law (Directive 2009/136/EC) requires websites to:
- Inform users about cookies being used
- Obtain consent before setting non-essential cookies
- Provide a way to withdraw consent
- Keep records of consent

## Implementation in Drupal

### Module Overview

The EU Cookie Compliance module for Drupal provides:
- Customizable cookie consent banner
- Category-based cookie management
- JavaScript API for consent checking
- GDPR-compliant consent storage

### Cookie Categories

Cookies are typically categorized as:
- **Strictly Necessary**: Essential for site functionality
- **Performance**: Analytics and performance tracking
- **Functional**: Enhanced functionality and personalization
- **Targeting**: Marketing and advertising cookies

## JavaScript Implementation

### Checking Consent Status

\`\`\`javascript
// Check if user has consented
if (Drupal.eu_cookie_compliance.hasAgreed()) {
  // Load analytics or other scripts
  loadAnalytics();
}
\`\`\`

### Listening for Consent Events

\`\`\`javascript
// React to consent changes
document.addEventListener('eu_cookie_compliance.changeStatus', function(e) {
  if (e.detail.status === 'agreed') {
    // User agreed - load tracking scripts
    initializeTracking();
  }
});
\`\`\`

### Category-Based Loading

\`\`\`javascript
// Load scripts based on category consent
if (Drupal.eu_cookie_compliance.hasAgreedWithCategory('analytics')) {
  // Load analytics
  loadGoogleAnalytics();
}
\`\`\`

## Best Practices

1. **Default to Privacy**: Don't load non-essential cookies until consent is given
2. **Clear Communication**: Explain what each cookie category does
3. **Easy Withdrawal**: Make it simple for users to change their preferences
4. **Minimal Disruption**: Design the consent interface to be user-friendly

## Configuration Steps

1. Install and enable the EU Cookie Compliance module
2. Configure cookie categories in admin settings
3. Customize the consent banner appearance
4. Update JavaScript to respect consent status
5. Test across different scenarios

## Testing Checklist

- [ ] Consent banner appears on first visit
- [ ] Non-essential cookies are blocked until consent
- [ ] Users can modify their preferences
- [ ] Consent is remembered across sessions
- [ ] Works correctly with browser privacy modes

## Conclusion

Implementing EU Cookie Compliance is essential for any website serving EU users. By following GDPR requirements and using proper JavaScript implementation, you can ensure both legal compliance and a good user experience.

The EU Cookie Compliance module for Drupal provides a robust solution that handles the complexity of consent management while giving developers the flexibility to integrate with their existing tracking and analytics setup.
`
    }
  ];

  // Handle hash-based routing for direct post links
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/blog/')) {
      const postId = hash.replace('#/blog/', '');
      const post = blogPosts.find(p => p.id === postId);
      if (post) {
        setSelectedPost(post);
      }
    }
  }, []);

  // Update hash when post is selected
  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
    window.location.hash = `/blog/${post.id}`;
  };

  // Clear hash when going back to list
  const handleBackToList = () => {
    setSelectedPost(null);
    window.location.hash = '/blog';
  };

  if (selectedPost) {
    return (
      <div className="p-4 sm:p-8 overflow-auto h-full bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleBackToList}
            className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2"
          >
            ← Back to all posts
          </button>

          <article className="prose prose-invert max-w-none">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{selectedPost.title}</h1>
              <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-4">
                <span>{selectedPost.organization}</span>
                <span>·</span>
                <span>{selectedPost.date}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 rounded bg-blue-900/30 text-blue-300 border border-blue-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {selectedPost.content}
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 overflow-auto h-full bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Technical Blog</h1>
          <p className="text-sm sm:text-base text-gray-400">
            Tutorials, guides, and insights on AI, web development, and open source.
          </p>
        </div>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors cursor-pointer"
              onClick={() => handleSelectPost(post)}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <h2 className="text-lg sm:text-xl font-semibold text-white hover:text-blue-400">
                  {post.title}
                </h2>
                <span className="text-sm text-gray-500 whitespace-nowrap">{post.date}</span>
              </div>

              <p className="text-gray-400 text-sm mb-3">{post.excerpt}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 rounded bg-blue-900/30 text-blue-300 border border-blue-700">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{post.organization}</span>
                <span className="text-sm text-blue-400 flex items-center gap-1">
                  Read more →
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-gray-600 text-xs mt-10 pt-6 border-t border-gray-800">
          <p>More blog posts coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default BlogTab;
