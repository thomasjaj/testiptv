from fastapi import FastAPI, APIRouter, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import logging
from pathlib import Path
from typing import List
import secrets

# Import models and database
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models import (
    SubscriptionPlan, SubscriptionPlanCreate,
    Feature, FeatureCreate,
    TrialSignup, TrialSignupCreate, TrialSignupResponse,
    ResellerApplication, ResellerApplicationCreate, ResellerApplicationResponse,
    ContactMessage, ContactMessageCreate, ContactMessageResponse,
    AppSettings
)
from database import (
    db, init_default_data, close_db_connection,
    subscription_plans_collection,
    features_collection,
    trial_signups_collection,
    reseller_applications_collection,
    contact_messages_collection,
    app_settings_collection
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(title="StreamMax Pro API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Subscription Plans Endpoints
@api_router.get("/plans", response_model=List[SubscriptionPlan])
async def get_subscription_plans():
    """Get all subscription plans"""
    try:
        plans = await subscription_plans_collection.find().to_list(1000)
        return [SubscriptionPlan(**plan) for plan in plans]
    except Exception as e:
        logger.error(f"Error fetching subscription plans: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error fetching subscription plans"
        )

@api_router.post("/plans", response_model=SubscriptionPlan)
async def create_subscription_plan(plan: SubscriptionPlanCreate):
    """Create a new subscription plan"""
    try:
        plan_dict = plan.dict()
        plan_obj = SubscriptionPlan(**plan_dict)
        await subscription_plans_collection.insert_one(plan_obj.dict())
        return plan_obj
    except Exception as e:
        logger.error(f"Error creating subscription plan: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating subscription plan"
        )

# Features Endpoints
@api_router.get("/features", response_model=List[Feature])
async def get_features():
    """Get all active features"""
    try:
        features = await features_collection.find({"active": True}).sort("order", 1).to_list(1000)
        return [Feature(**feature) for feature in features]
    except Exception as e:
        logger.error(f"Error fetching features: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error fetching features"
        )

@api_router.post("/features", response_model=Feature)
async def create_feature(feature: FeatureCreate):
    """Create a new feature"""
    try:
        feature_dict = feature.dict()
        feature_obj = Feature(**feature_dict)
        await features_collection.insert_one(feature_obj.dict())
        return feature_obj
    except Exception as e:
        logger.error(f"Error creating feature: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating feature"
        )

# Trial Signup Endpoints
@api_router.post("/trial", response_model=TrialSignupResponse)
async def create_trial_signup(trial: TrialSignupCreate):
    """Create a new trial signup"""
    try:
        # Check if email already exists
        existing_trial = await trial_signups_collection.find_one({"email": trial.email})
        if existing_trial:
            # Update existing trial
            activation_code = secrets.token_hex(16)
            await trial_signups_collection.update_one(
                {"email": trial.email},
                {"$set": {"activation_code": activation_code, "status": "active"}}
            )
            return TrialSignupResponse(
                id=existing_trial["id"],
                email=trial.email,
                status="active",
                trial_start=existing_trial["trial_start"],
                activation_code=activation_code,
                message="Trial reactivated successfully! Check your email for login credentials."
            )
        else:
            # Create new trial
            trial_dict = trial.dict()
            activation_code = secrets.token_hex(16)
            trial_obj = TrialSignup(**trial_dict, activation_code=activation_code)
            await trial_signups_collection.insert_one(trial_obj.dict())
            
            return TrialSignupResponse(
                id=trial_obj.id,
                email=trial.email,
                status="active",
                trial_start=trial_obj.trial_start,
                activation_code=activation_code,
                message="Trial activated successfully! Check your email for login credentials."
            )
    except Exception as e:
        logger.error(f"Error creating trial signup: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating trial signup"
        )

@api_router.get("/trial/{email}")
async def get_trial_status(email: str):
    """Get trial status for an email"""
    try:
        trial = await trial_signups_collection.find_one({"email": email})
        if not trial:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Trial not found"
            )
        return TrialSignup(**trial)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching trial status: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error fetching trial status"
        )

# Reseller Application Endpoints
@api_router.post("/reseller", response_model=ResellerApplicationResponse)
async def create_reseller_application(application: ResellerApplicationCreate):
    """Create a new reseller application"""
    try:
        # Check if email already exists
        existing_app = await reseller_applications_collection.find_one({"email": application.email})
        if existing_app:
            return ResellerApplicationResponse(
                id=existing_app["id"],
                name=application.name,
                email=application.email,
                status=existing_app["status"],
                message="Application already exists. We'll update you on the status soon."
            )
        
        # Create new application
        app_dict = application.dict()
        app_obj = ResellerApplication(**app_dict)
        await reseller_applications_collection.insert_one(app_obj.dict())
        
        return ResellerApplicationResponse(
            id=app_obj.id,
            name=application.name,
            email=application.email,
            status="pending",
            message="Application submitted successfully! We'll contact you within 24 hours."
        )
    except Exception as e:
        logger.error(f"Error creating reseller application: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating reseller application"
        )

@api_router.get("/reseller", response_model=List[ResellerApplication])
async def get_reseller_applications():
    """Get all reseller applications"""
    try:
        applications = await reseller_applications_collection.find().to_list(1000)
        return [ResellerApplication(**app) for app in applications]
    except Exception as e:
        logger.error(f"Error fetching reseller applications: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error fetching reseller applications"
        )

# Contact Message Endpoints
@api_router.post("/contact", response_model=ContactMessageResponse)
async def create_contact_message(message: ContactMessageCreate):
    """Create a new contact message"""
    try:
        message_dict = message.dict()
        message_obj = ContactMessage(**message_dict)
        await contact_messages_collection.insert_one(message_obj.dict())
        
        return ContactMessageResponse(
            id=message_obj.id,
            name=message.name,
            email=message.email,
            subject=message.subject,
            message=message.message,
            status="new"
        )
    except Exception as e:
        logger.error(f"Error creating contact message: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating contact message"
        )

# App Settings Endpoints
@api_router.get("/settings")
async def get_app_settings():
    """Get application settings"""
    try:
        settings = await app_settings_collection.find_one({"id": "app_settings_main"})
        if not settings:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Settings not found"
            )
        return settings
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching app settings: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error fetching app settings"
        )

# Health Check
@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "StreamMax Pro API is running"}

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "StreamMax Pro API", "version": "1.0.0"}

# Include the router in the main app
app.include_router(api_router)

# Startup event
@app.on_event("startup")
async def startup_db():
    """Initialize database on startup"""
    await init_default_data()

# Shutdown event
@app.on_event("shutdown")
async def shutdown_db():
    """Close database connection on shutdown"""
    await close_db_connection()