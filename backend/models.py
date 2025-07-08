from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Subscription Plan Models
class SubscriptionPlan(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    duration: str
    price: float
    original_price: float
    popular: bool = False
    features: List[str]
    color: str
    button_text: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class SubscriptionPlanCreate(BaseModel):
    duration: str
    price: float
    original_price: float
    popular: bool = False
    features: List[str]
    color: str
    button_text: str

# Feature Models
class Feature(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    icon: str
    color: str
    order: int = 0
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class FeatureCreate(BaseModel):
    title: str
    description: str
    icon: str
    color: str
    order: int = 0
    active: bool = True

# Trial Signup Models
class TrialSignup(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    status: str = "active"  # active, expired, cancelled
    trial_start: datetime = Field(default_factory=datetime.utcnow)
    trial_end: Optional[datetime] = None
    activated: bool = False
    activation_code: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class TrialSignupCreate(BaseModel):
    email: EmailStr

class TrialSignupResponse(BaseModel):
    id: str
    email: str
    status: str
    trial_start: datetime
    activation_code: str
    message: str

# Reseller Application Models
class ResellerApplication(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: Optional[str] = None
    status: str = "pending"  # pending, approved, rejected
    commission_rate: float = 0.0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ResellerApplicationCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: Optional[str] = None

class ResellerApplicationResponse(BaseModel):
    id: str
    name: str
    email: str
    status: str
    message: str

# Contact Message Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    status: str = "new"  # new, read, replied
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactMessageResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    status: str

# Hero and General Data Models
class HeroData(BaseModel):
    title: str
    subtitle: str
    background_image: str
    cta_text: str
    features: List[str]
    stats: dict

class AppSettings(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    hero_data: HeroData
    company_name: str
    company_description: str
    contact_email: str
    support_email: str
    social_links: dict
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)