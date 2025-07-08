// Mock data for the subscription service
export const mockData = {
  // Hero section data
  hero: {
    title: "Premium Streaming Unleashed",
    subtitle: "Experience unlimited entertainment with 25,000+ live channels and 100,000+ VOD titles in stunning 4K quality",
    backgroundImage: "https://images.unsplash.com/photo-1593280359364-5242f1958068",
    ctaText: "Start Free Trial",
    features: ["Instant Activation", "24/7 Support", "99.9% Uptime"]
  },

  // Features data
  features: [
    {
      id: 1,
      title: "25,000+ Live Channels",
      description: "Access to premium live TV channels from around the world in HD and 4K quality",
      icon: "📺",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "100,000+ VOD Titles",
      description: "Massive library of movies, TV shows, documentaries, and exclusive content",
      icon: "🎬",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 3,
      title: "4K Ultra HD Streaming",
      description: "Crystal clear streaming with 4K resolution for the ultimate viewing experience",
      icon: "✨",
      color: "from-pink-500 to-orange-600"
    },
    {
      id: 4,
      title: "Multi-Device Support",
      description: "Watch on any device - TV, mobile, tablet, laptop, smart TV, and streaming devices",
      icon: "📱",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 5,
      title: "Global Content",
      description: "International channels and content in multiple languages from every continent",
      icon: "🌍",
      color: "from-green-500 to-blue-600"
    },
    {
      id: 6,
      title: "24/7 Premium Support",
      description: "Round-the-clock customer support to ensure seamless streaming experience",
      icon: "🛠️",
      color: "from-indigo-500 to-purple-600"
    }
  ],

  // Pricing plans
  pricing: [
    {
      id: 1,
      duration: "1 Month",
      price: 12,
      originalPrice: 15,
      popular: false,
      features: [
        "25,000+ Live Channels",
        "100,000+ VOD Titles",
        "4K Ultra HD Quality",
        "Multi-Device Access",
        "24/7 Customer Support",
        "Instant Activation",
        "EPG Included",
        "99.9% Uptime Guarantee"
      ],
      color: "from-blue-500 to-blue-600",
      buttonText: "Get Started"
    },
    {
      id: 2,
      duration: "3 Months",
      price: 25,
      originalPrice: 45,
      popular: true,
      features: [
        "25,000+ Live Channels",
        "100,000+ VOD Titles",
        "4K Ultra HD Quality",
        "Multi-Device Access",
        "24/7 Customer Support",
        "Instant Activation",
        "EPG Included",
        "99.9% Uptime Guarantee",
        "Priority Support"
      ],
      color: "from-purple-500 to-pink-600",
      buttonText: "Most Popular"
    },
    {
      id: 3,
      duration: "6 Months",
      price: 45,
      originalPrice: 90,
      popular: false,
      features: [
        "25,000+ Live Channels",
        "100,000+ VOD Titles",
        "4K Ultra HD Quality",
        "Multi-Device Access",
        "24/7 Customer Support",
        "Instant Activation",
        "EPG Included",
        "99.9% Uptime Guarantee",
        "Priority Support",
        "Exclusive Content"
      ],
      color: "from-green-500 to-teal-600",
      buttonText: "Best Value"
    },
    {
      id: 4,
      duration: "12 Months",
      price: 79,
      originalPrice: 180,
      popular: false,
      features: [
        "25,000+ Live Channels",
        "100,000+ VOD Titles",
        "4K Ultra HD Quality",
        "Multi-Device Access",
        "24/7 Customer Support",
        "Instant Activation",
        "EPG Included",
        "99.9% Uptime Guarantee",
        "Priority Support",
        "Exclusive Content",
        "Premium Sports Package"
      ],
      color: "from-orange-500 to-red-600",
      buttonText: "Ultimate Deal"
    }
  ],

  // Reseller program data
  reseller: {
    title: "Join Our Reseller Program",
    subtitle: "Become a partner and earn up to 60% commission on every sale",
    benefits: [
      {
        title: "High Commission Rates",
        description: "Earn up to 60% commission on every successful subscription sale",
        icon: "💰"
      },
      {
        title: "Marketing Support",
        description: "Access to marketing materials, banners, and promotional content",
        icon: "📈"
      },
      {
        title: "Dedicated Dashboard",
        description: "Track your sales, earnings, and customer analytics in real-time",
        icon: "📊"
      },
      {
        title: "24/7 Support",
        description: "Dedicated support team to help you succeed as a reseller",
        icon: "🤝"
      }
    ],
    ctaText: "Apply Now"
  },

  // Free trial data
  trial: {
    title: "Try Before You Buy",
    subtitle: "Experience our premium service with a 48-hour free trial",
    features: [
      "Full access to all channels",
      "No credit card required",
      "Instant activation",
      "Cancel anytime"
    ],
    ctaText: "Start Free Trial"
  },

  // Navigation items
  navigation: [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Reseller", href: "#reseller" },
    { name: "Free Trial", href: "#trial" }
  ],

  // Footer data
  footer: {
    company: "StreamMax Pro",
    description: "Premium streaming service with unlimited entertainment options",
    socialLinks: [
      { name: "Twitter", icon: "🐦", href: "#" },
      { name: "Facebook", icon: "📘", href: "#" },
      { name: "Instagram", icon: "📷", href: "#" },
      { name: "YouTube", icon: "📺", href: "#" }
    ],
    quickLinks: [
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Support", href: "#" },
      { name: "Contact", href: "#" }
    ]
  }
};