import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME', 'streammax_db')

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Collections
subscription_plans_collection = db.subscription_plans
features_collection = db.features
trial_signups_collection = db.trial_signups
reseller_applications_collection = db.reseller_applications
contact_messages_collection = db.contact_messages
app_settings_collection = db.app_settings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def init_default_data():
    """Initialize the database with default data"""
    try:
        # Check if subscription plans exist
        plans_count = await subscription_plans_collection.count_documents({})
        if plans_count == 0:
            # Insert default subscription plans
            default_plans = [
                {
                    "id": "plan_1_month",
                    "duration": "1 Month",
                    "price": 12.0,
                    "original_price": 15.0,
                    "popular": False,
                    "features": [
                        "25,000+ Live Channels",
                        "100,000+ VOD Titles",
                        "4K Ultra HD Quality",
                        "Multi-Device Access",
                        "24/7 Customer Support",
                        "Instant Activation",
                        "EPG Included",
                        "99.9% Uptime Guarantee"
                    ],
                    "color": "from-blue-500 to-blue-600",
                    "button_text": "Get Started"
                },
                {
                    "id": "plan_3_months",
                    "duration": "3 Months",
                    "price": 25.0,
                    "original_price": 45.0,
                    "popular": True,
                    "features": [
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
                    "color": "from-purple-500 to-pink-600",
                    "button_text": "Most Popular"
                },
                {
                    "id": "plan_6_months",
                    "duration": "6 Months",
                    "price": 45.0,
                    "original_price": 90.0,
                    "popular": False,
                    "features": [
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
                    "color": "from-green-500 to-teal-600",
                    "button_text": "Best Value"
                },
                {
                    "id": "plan_12_months",
                    "duration": "12 Months",
                    "price": 79.0,
                    "original_price": 180.0,
                    "popular": False,
                    "features": [
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
                    "color": "from-orange-500 to-red-600",
                    "button_text": "Ultimate Deal"
                }
            ]
            await subscription_plans_collection.insert_many(default_plans)
            logger.info("Default subscription plans inserted")

        # Check if features exist
        features_count = await features_collection.count_documents({})
        if features_count == 0:
            # Insert default features
            default_features = [
                {
                    "id": "feature_channels",
                    "title": "25,000+ Live Channels",
                    "description": "Access to premium live TV channels from around the world in HD and 4K quality",
                    "icon": "📺",
                    "color": "from-blue-500 to-purple-600",
                    "order": 1,
                    "active": True
                },
                {
                    "id": "feature_vod",
                    "title": "100,000+ VOD Titles",
                    "description": "Massive library of movies, TV shows, documentaries, and exclusive content",
                    "icon": "🎬",
                    "color": "from-purple-500 to-pink-600",
                    "order": 2,
                    "active": True
                },
                {
                    "id": "feature_4k",
                    "title": "4K Ultra HD Streaming",
                    "description": "Crystal clear streaming with 4K resolution for the ultimate viewing experience",
                    "icon": "✨",
                    "color": "from-pink-500 to-orange-600",
                    "order": 3,
                    "active": True
                },
                {
                    "id": "feature_multidevice",
                    "title": "Multi-Device Support",
                    "description": "Watch on any device - TV, mobile, tablet, laptop, smart TV, and streaming devices",
                    "icon": "📱",
                    "color": "from-orange-500 to-red-600",
                    "order": 4,
                    "active": True
                },
                {
                    "id": "feature_global",
                    "title": "Global Content",
                    "description": "International channels and content in multiple languages from every continent",
                    "icon": "🌍",
                    "color": "from-green-500 to-blue-600",
                    "order": 5,
                    "active": True
                },
                {
                    "id": "feature_support",
                    "title": "24/7 Premium Support",
                    "description": "Round-the-clock customer support to ensure seamless streaming experience",
                    "icon": "🛠️",
                    "color": "from-indigo-500 to-purple-600",
                    "order": 6,
                    "active": True
                }
            ]
            await features_collection.insert_many(default_features)
            logger.info("Default features inserted")

        # Check if app settings exist
        settings_count = await app_settings_collection.count_documents({})
        if settings_count == 0:
            # Insert default app settings
            default_settings = {
                "id": "app_settings_main",
                "hero_data": {
                    "title": "Premium Streaming Unleashed",
                    "subtitle": "Experience unlimited entertainment with 25,000+ live channels and 100,000+ VOD titles in stunning 4K quality",
                    "background_image": "https://images.unsplash.com/photo-1593280359364-5242f1958068",
                    "cta_text": "Start Free Trial",
                    "features": ["Instant Activation", "24/7 Support", "99.9% Uptime"],
                    "stats": {
                        "channels": "25,000+",
                        "vod_titles": "100,000+",
                        "uptime": "99.9%"
                    }
                },
                "company_name": "StreamMax Pro",
                "company_description": "Premium streaming service with unlimited entertainment options",
                "contact_email": "support@streammaxpro.com",
                "support_email": "support@streammaxpro.com",
                "social_links": {
                    "twitter": "#",
                    "facebook": "#",
                    "instagram": "#",
                    "youtube": "#"
                }
            }
            await app_settings_collection.insert_one(default_settings)
            logger.info("Default app settings inserted")

        logger.info("Database initialization completed successfully")

    except Exception as e:
        logger.error(f"Error initializing database: {e}")
        raise

async def close_db_connection():
    """Close database connection"""
    client.close()