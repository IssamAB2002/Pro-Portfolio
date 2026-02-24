export const blogsData = [
  {
    id: 'scaling-ecommerce-platform',
    title: 'How I Built a Scalable E-Commerce Platform from 0 to Launch',
    excerpt:
      'A behind-the-scenes story on architecture choices, payment integrations, and performance improvements that made the platform production ready.',
    category: 'Web App',
    readTime: '7 min read',
    date: 'Jan 2026',
    image: 'https://placehold.co/1200x700/31194D/FFD700?text=E-Commerce+Build+Story',
    images: [
      'https://placehold.co/1200x700/31194D/FFD700?text=E-Commerce+Build+Story',
      'https://placehold.co/1200x700/31194D/FFD700?text=Architecture+Board',
      'https://placehold.co/1200x700/31194D/FFD700?text=Checkout+Optimization',
    ],
    story:
      'The project started with a fast MVP objective but quickly grew into a full commerce platform. I prioritized clean API contracts, modular UI blocks, and payment flow reliability from day one.',
    highlights: [
      'Planned API resources around real business workflows, not UI screens.',
      'Used reusable React primitives to speed up feature delivery.',
      'Added payment webhooks with robust retry and state reconciliation.',
      'Reduced response times by optimizing key catalog and checkout queries.',
    ],
  },
  {
    id: 'mobile-fitness-app-journey',
    title: 'From Idea to App Store: Fitness App Development Journey',
    excerpt:
      'Designing a Flutter app that balances smooth UX, offline support, and real-time progress tracking for active users.',
    category: 'Mobile App',
    readTime: '6 min read',
    date: 'Dec 2025',
    image: 'https://placehold.co/1200x700/31194D/FFD700?text=Mobile+App+Story',
    images: [
      'https://placehold.co/1200x700/31194D/FFD700?text=Mobile+App+Story',
      'https://placehold.co/1200x700/31194D/FFD700?text=Workout+UX+Flow',
      'https://placehold.co/1200x700/31194D/FFD700?text=Progress+Analytics',
    ],
    story:
      'The goal was simple: make consistency easier for users. We designed the app around daily friction points and optimized for fast interactions and clear progress feedback.',
    highlights: [
      'Shipped a unified Flutter codebase for Android and iOS.',
      'Implemented offline-first data handling for unstable connections.',
      'Improved perceived speed with aggressive UI rebuild control.',
      'Built onboarding paths that increased early retention.',
    ],
  },
  {
    id: 'ai-support-automation',
    title: 'Building AI Support Automation Without Losing Human Touch',
    excerpt:
      'How prompt design, fallbacks, and handoff logic helped deliver practical AI automation for real customer conversations.',
    category: 'AI Automation',
    readTime: '8 min read',
    date: 'Nov 2025',
    image: 'https://placehold.co/1200x700/31194D/FFD700?text=AI+Automation+Story',
    images: [
      'https://placehold.co/1200x700/31194D/FFD700?text=AI+Automation+Story',
      'https://placehold.co/1200x700/31194D/FFD700?text=Intent+Routing',
      'https://placehold.co/1200x700/31194D/FFD700?text=Agent+Handoff',
    ],
    story:
      'Instead of replacing agents, the assistant was designed to remove repetitive effort while preserving escalation quality. The key was balancing speed, accuracy, and transparency.',
    highlights: [
      'Created intent-aware prompts with scoped context windows.',
      'Introduced confidence thresholds and safe fallback responses.',
      'Implemented seamless human handoff with full conversation context.',
      'Monitored quality metrics to continuously tune behavior.',
    ],
  },
  {
    id: 'api-design-decisions',
    title: 'API Design Decisions That Saved Weeks of Refactoring',
    excerpt:
      'A practical breakdown of versioning, payload modeling, and endpoint planning across a fast-moving full-stack project.',
    category: 'Web App',
    readTime: '5 min read',
    date: 'Oct 2025',
    image: 'https://placehold.co/1200x700/31194D/FFD700?text=API+Architecture+Story',
    images: [
      'https://placehold.co/1200x700/31194D/FFD700?text=API+Architecture+Story',
      'https://placehold.co/1200x700/31194D/FFD700?text=Versioning+Plan',
      'https://placehold.co/1200x700/31194D/FFD700?text=Payload+Design',
    ],
    story:
      'Fast projects often collapse under API churn. I focused early on consistency conventions and data contracts that would survive product changes.',
    highlights: [
      'Defined consistent naming and response envelopes.',
      'Versioned endpoints where change risk was highest.',
      'Structured payloads around domain entities and clear ownership.',
      'Reduced breaking frontend changes during iteration cycles.',
    ],
  },
  {
    id: 'mobile-performance-fixes',
    title: 'My Process for Fixing Mobile Performance Bottlenecks',
    excerpt:
      'Profiling, rendering optimization, and UI rebuild control techniques that noticeably improved app responsiveness.',
    category: 'Mobile App',
    readTime: '6 min read',
    date: 'Sep 2025',
    image: 'https://placehold.co/1200x700/31194D/FFD700?text=Performance+Optimization',
    images: [
      'https://placehold.co/1200x700/31194D/FFD700?text=Performance+Optimization',
      'https://placehold.co/1200x700/31194D/FFD700?text=Frame+Profiler',
      'https://placehold.co/1200x700/31194D/FFD700?text=Render+Tuning',
    ],
    story:
      'Performance work had the highest user impact in this project. I used profiling data to target the few rendering paths causing most frame drops.',
    highlights: [
      'Measured frame build times before touching code.',
      'Reduced unnecessary widget rebuilds and re-layout cycles.',
      'Optimized list-heavy screens with lazy loading patterns.',
      'Improved startup sequence for faster time-to-interaction.',
    ],
  },
  {
    id: 'automation-roi-playbook',
    title: 'Automation ROI: Where AI Gives the Fastest Wins',
    excerpt:
      'The exact workflow mapping and prioritization method I use to identify high-impact automation opportunities.',
    category: 'AI Automation',
    readTime: '7 min read',
    date: 'Aug 2025',
    image: 'https://placehold.co/1200x700/31194D/FFD700?text=Automation+ROI+Playbook',
    images: [
      'https://placehold.co/1200x700/31194D/FFD700?text=Automation+ROI+Playbook',
      'https://placehold.co/1200x700/31194D/FFD700?text=Workflow+Mapping',
      'https://placehold.co/1200x700/31194D/FFD700?text=Impact+Prioritization',
    ],
    story:
      'The best automation projects start with business pain, not technology hype. I map process friction, estimate effort, and prioritize opportunities with clear payoff.',
    highlights: [
      'Mapped manual tasks into measurable workflow stages.',
      'Ranked opportunities by impact, effort, and implementation risk.',
      'Started with narrow pilots to prove value quickly.',
      'Expanded automations only after stable operational feedback.',
    ],
  },
];

