#!/usr/bin/env python3
"""
AWS SES Email Verification Helper
Usage: python verify_email.py your-email@example.com
"""

import boto3
import sys
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

def verify_email(email_address):
    client = boto3.client(
        'ses',
        region_name=os.getenv('AWS_REGION', 'us-east-1'),
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
    )
    
    try:
        response = client.verify_email_identity(EmailAddress=email_address)
        print(f'✓ Verification email sent to: {email_address}')
        print(f'\n📧 Check inbox and SPAM folder')
        print(f'⚠️  Click the verification link!')
        return True
    except Exception as e:
        print(f'✗ Error: {str(e)}')
        return False

def list_verified_emails():
    client = boto3.client(
        'ses',
        region_name=os.getenv('AWS_REGION', 'us-east-1'),
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
    )
    
    try:
        response = client.list_verified_email_addresses()
        verified = response.get('VerifiedEmailAddresses', [])
        
        if verified:
            print(f'\n✓ Verified Emails ({len(verified)}):')
            for email in verified:
                print(f'  - {email}')
        else:
            print('\n✗ No verified emails yet')
        return verified
    except Exception as e:
        print(f'✗ Error: {str(e)}')
        return []

if __name__ == '__main__':
    if len(sys.argv) > 1:
        email = sys.argv[1]
        verify_email(email)
    else:
        print('Current verified emails:')
        list_verified_emails()
        print('\nTo verify an email: python verify_email.py your-email@example.com')
