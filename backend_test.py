#!/usr/bin/env python3
import requests
import json
import sys
import os
from datetime import datetime
import uuid

# Get the backend URL from the frontend/.env file
def get_backend_url():
    with open('/app/frontend/.env', 'r') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                return line.strip().split('=')[1].strip('"\'')
    return None

# Base URL for API requests
BASE_URL = get_backend_url()
if not BASE_URL:
    print("Error: Could not find REACT_APP_BACKEND_URL in frontend/.env")
    sys.exit(1)

API_URL = f"{BASE_URL}/api"
print(f"Using API URL: {API_URL}")

# Test results tracking
test_results = {
    "total": 0,
    "passed": 0,
    "failed": 0,
    "failures": []
}

def run_test(test_func):
    """Run a test function and track results"""
    test_results["total"] += 1
    test_name = test_func.__name__
    print(f"\n{'='*80}\nRunning test: {test_name}\n{'='*80}")
    
    try:
        result = test_func()
        if result:
            test_results["passed"] += 1
            print(f"✅ Test {test_name} PASSED")
            return True
        else:
            test_results["failed"] += 1
            test_results["failures"].append(test_name)
            print(f"❌ Test {test_name} FAILED")
            return False
    except Exception as e:
        test_results["failed"] += 1
        test_results["failures"].append(f"{test_name}: {str(e)}")
        print(f"❌ Test {test_name} FAILED with exception: {str(e)}")
        return False

def test_health_check():
    """Test the health check endpoint"""
    response = requests.get(f"{API_URL}/health")
    
    # Check status code
    if response.status_code != 200:
        print(f"Expected status code 200, got {response.status_code}")
        return False
    
    # Check response data
    data = response.json()
    if "status" not in data or data["status"] != "healthy":
        print(f"Expected status 'healthy', got {data.get('status', 'missing')}")
        return False
    
    if "message" not in data or "StreamMax Pro API is running" not in data["message"]:
        print(f"Expected message about API running, got {data.get('message', 'missing')}")
        return False
    
    print("Health check response:", data)
    return True

def test_subscription_plans():
    """Test the subscription plans endpoint"""
    response = requests.get(f"{API_URL}/plans")
    
    # Check status code
    if response.status_code != 200:
        print(f"Expected status code 200, got {response.status_code}")
        return False
    
    # Check response data
    data = response.json()
    if not isinstance(data, list):
        print(f"Expected a list of plans, got {type(data)}")
        return False
    
    if len(data) == 0:
        print("Expected at least one subscription plan, got empty list")
        return False
    
    # Check plan structure
    required_fields = ["id", "duration", "price", "original_price", "features", "color", "button_text"]
    for plan in data:
        for field in required_fields:
            if field not in plan:
                print(f"Plan missing required field: {field}")
                return False
    
    print(f"Found {len(data)} subscription plans")
    return True

def test_features():
    """Test the features endpoint"""
    response = requests.get(f"{API_URL}/features")
    
    # Check status code
    if response.status_code != 200:
        print(f"Expected status code 200, got {response.status_code}")
        return False
    
    # Check response data
    data = response.json()
    if not isinstance(data, list):
        print(f"Expected a list of features, got {type(data)}")
        return False
    
    if len(data) == 0:
        print("Expected at least one feature, got empty list")
        return False
    
    # Check feature structure
    required_fields = ["id", "title", "description", "icon", "color", "order", "active"]
    for feature in data:
        for field in required_fields:
            if field not in feature:
                print(f"Feature missing required field: {field}")
                return False
        
        # Verify only active features are returned
        if not feature["active"]:
            print(f"Found inactive feature in response: {feature['id']}")
            return False
    
    print(f"Found {len(data)} active features")
    return True

def test_app_settings():
    """Test the app settings endpoint"""
    response = requests.get(f"{API_URL}/settings")
    
    # Check status code
    if response.status_code != 200:
        print(f"Expected status code 200, got {response.status_code}")
        return False
    
    # Check response data
    data = response.json()
    if not isinstance(data, dict):
        print(f"Expected a dictionary of settings, got {type(data)}")
        return False
    
    # Check settings structure
    if "id" not in data or data["id"] != "app_settings_main":
        print(f"Expected id 'app_settings_main', got {data.get('id', 'missing')}")
        return False
    
    if "hero_data" not in data:
        print("Missing hero_data in settings")
        return False
    
    hero_data = data["hero_data"]
    hero_fields = ["title", "subtitle", "background_image", "cta_text", "features", "stats"]
    for field in hero_fields:
        if field not in hero_data:
            print(f"Hero data missing required field: {field}")
            return False
    
    required_fields = ["company_name", "company_description", "contact_email", "support_email", "social_links"]
    for field in required_fields:
        if field not in data:
            print(f"Settings missing required field: {field}")
            return False
    
    print("App settings retrieved successfully")
    return True

def test_trial_signup():
    """Test the trial signup endpoint"""
    # Generate a unique email to avoid conflicts
    test_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
    
    payload = {
        "email": test_email
    }
    
    response = requests.post(f"{API_URL}/trial", json=payload)
    
    # Check status code
    if response.status_code != 200:
        print(f"Expected status code 200, got {response.status_code}")
        return False
    
    # Check response data
    data = response.json()
    if not isinstance(data, dict):
        print(f"Expected a dictionary response, got {type(data)}")
        return False
    
    # Check trial signup structure
    required_fields = ["id", "email", "status", "trial_start", "activation_code", "message"]
    for field in required_fields:
        if field not in data:
            print(f"Trial signup response missing required field: {field}")
            return False
    
    if data["email"] != test_email:
        print(f"Expected email {test_email}, got {data['email']}")
        return False
    
    if data["status"] != "active":
        print(f"Expected status 'active', got {data['status']}")
        return False
    
    # Test retrieving the trial status
    status_response = requests.get(f"{API_URL}/trial/{test_email}")
    
    if status_response.status_code != 200:
        print(f"Expected status code 200 for trial status, got {status_response.status_code}")
        return False
    
    status_data = status_response.json()
    if status_data["email"] != test_email:
        print(f"Expected email {test_email} in status, got {status_data['email']}")
        return False
    
    print("Trial signup and status check successful")
    return True

def test_reseller_application():
    """Test the reseller application endpoint"""
    # Generate a unique email to avoid conflicts
    test_email = f"reseller_{uuid.uuid4().hex[:8]}@example.com"
    
    payload = {
        "name": "Test Reseller",
        "email": test_email,
        "company": "Test Company",
        "message": "This is a test reseller application"
    }
    
    response = requests.post(f"{API_URL}/reseller", json=payload)
    
    # Check status code
    if response.status_code != 200:
        print(f"Expected status code 200, got {response.status_code}")
        return False
    
    # Check response data
    data = response.json()
    if not isinstance(data, dict):
        print(f"Expected a dictionary response, got {type(data)}")
        return False
    
    # Check reseller application structure
    required_fields = ["id", "name", "email", "status", "message"]
    for field in required_fields:
        if field not in data:
            print(f"Reseller application response missing required field: {field}")
            return False
    
    if data["email"] != test_email:
        print(f"Expected email {test_email}, got {data['email']}")
        return False
    
    if data["status"] != "pending":
        print(f"Expected status 'pending', got {data['status']}")
        return False
    
    # Test retrieving all reseller applications
    list_response = requests.get(f"{API_URL}/reseller")
    
    if list_response.status_code != 200:
        print(f"Expected status code 200 for reseller list, got {list_response.status_code}")
        return False
    
    list_data = list_response.json()
    if not isinstance(list_data, list):
        print(f"Expected a list of reseller applications, got {type(list_data)}")
        return False
    
    # Check if our application is in the list
    found = False
    for app in list_data:
        if app["email"] == test_email:
            found = True
            break
    
    if not found:
        print(f"Could not find our reseller application in the list")
        return False
    
    print("Reseller application test successful")
    return True

def test_error_handling():
    """Test error handling for invalid endpoints"""
    # Test non-existent endpoint
    response = requests.get(f"{API_URL}/nonexistent")
    
    # Check status code (should be 404)
    if response.status_code != 404:
        print(f"Expected status code 404 for non-existent endpoint, got {response.status_code}")
        return False
    
    # Test invalid trial email
    response = requests.get(f"{API_URL}/trial/invalid@email")
    
    # Check status code (should be 404)
    if response.status_code != 404:
        print(f"Expected status code 404 for invalid trial email, got {response.status_code}")
        return False
    
    # Test invalid method (PUT on /health)
    response = requests.put(f"{API_URL}/health")
    
    # Check status code (should be 405 Method Not Allowed)
    if response.status_code != 405:
        print(f"Expected status code 405 for invalid method, got {response.status_code}")
        return False
    
    print("Error handling tests successful")
    return True

def run_all_tests():
    """Run all API tests"""
    print(f"\n{'='*80}\nTesting StreamMax Pro Backend API\n{'='*80}")
    print(f"API URL: {API_URL}")
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    
    # Run all tests
    run_test(test_health_check)
    run_test(test_subscription_plans)
    run_test(test_features)
    run_test(test_app_settings)
    run_test(test_trial_signup)
    run_test(test_reseller_application)
    run_test(test_error_handling)
    
    # Print summary
    print(f"\n{'='*80}\nTest Summary\n{'='*80}")
    print(f"Total tests: {test_results['total']}")
    print(f"Passed: {test_results['passed']}")
    print(f"Failed: {test_results['failed']}")
    
    if test_results['failed'] > 0:
        print("\nFailed tests:")
        for failure in test_results['failures']:
            print(f"  - {failure}")
    
    return test_results['failed'] == 0

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)