import os
import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv

load_dotenv()

# AWS SES Configuration
AWS_REGION = os.getenv("AWS_REGION", "us-east-1")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID", "")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY", "")
FROM_EMAIL = os.getenv("AWS_SES_FROM_EMAIL", "noreply@gtrmotors.com")

# Initialize SES client
ses_client = None
if AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY:
    try:
        ses_client = boto3.client(
            'ses',
            region_name=AWS_REGION,
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY
        )
    except Exception as e:
        print(f"Warning: Failed to initialize AWS SES client: {e}")


def send_email(to_email: str, subject: str, html_body: str, text_body: str = None):
    """
    Send an email using AWS SES
    
    Args:
        to_email: Recipient email address
        subject: Email subject
        html_body: HTML version of email body
        text_body: Plain text version of email body (optional)
    
    Returns:
        dict: Response from SES or error dict
    """
    if not ses_client:
        print("Warning: AWS SES not configured. Email not sent.")
        return {"error": "SES not configured"}
    
    try:
        # Prepare email body
        body = {
            'Html': {'Data': html_body, 'Charset': 'UTF-8'}
        }
        
        if text_body:
            body['Text'] = {'Data': text_body, 'Charset': 'UTF-8'}
        
        # Send email
        response = ses_client.send_email(
            Source=FROM_EMAIL,
            Destination={'ToAddresses': [to_email]},
            Message={
                'Subject': {'Data': subject, 'Charset': 'UTF-8'},
                'Body': body
            }
        )
        
        print(f"Email sent successfully to {to_email}. MessageId: {response['MessageId']}")
        return response
        
    except ClientError as e:
        error_message = e.response['Error']['Message']
        print(f"Failed to send email to {to_email}: {error_message}")
        return {"error": error_message}
    except Exception as e:
        print(f"Unexpected error sending email: {e}")
        return {"error": str(e)}


def send_order_confirmation_email(to_email: str, customer_name: str, order_id: str, order_total: float, items: list):
    """Send order confirmation email"""
    
    # Generate items HTML
    items_html = ""
    for item in items:
        items_html += f"""
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">{item['name']}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">{item['quantity']}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item['price']:.2f}</td>
        </tr>
        """
    
    subject = f"Order Confirmation - {order_id}"
    
    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #EA580C 0%, #DC2626 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">GTR Motors</h1>
            <p style="color: white; margin: 5px 0;">High-Performance Auto Parts</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #EA580C;">Thank You for Your Order!</h2>
            <p>Hi {customer_name},</p>
            <p>We've received your order and are processing it now. Here are your order details:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #EA580C;">Order #{order_id}</h3>
                
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <thead>
                        <tr style="background: #f5f5f5;">
                            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #EA580C;">Item</th>
                            <th style="padding: 10px; text-align: center; border-bottom: 2px solid #EA580C;">Qty</th>
                            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #EA580C;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items_html}
                    </tbody>
                </table>
                
                <div style="text-align: right; padding: 15px 0; border-top: 2px solid #EA580C;">
                    <strong style="font-size: 18px;">Total: ${order_total:.2f}</strong>
                </div>
            </div>
            
            <p>Your order will be shipped within 2-3 business days. You'll receive a shipping confirmation email with tracking information once your order ships.</p>
            
            <div style="margin: 30px 0; padding: 20px; background: #fff3cd; border-left: 4px solid #EA580C; border-radius: 4px;">
                <strong>Need Help?</strong><br>
                Contact us at <a href="mailto:support@gtrmotors.com" style="color: #EA580C;">support@gtrmotors.com</a><br>
                Phone: 0091 80158 71346, 0091 95666 46777
            </div>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
            <p style="margin: 5px 0;">© 2026 GTR Motorsport India Private Limited</p>
            <p style="margin: 5px 0;">SF.No. 28/1, Polichalur Main Road, Pammal, Chennai - 75</p>
        </div>
    </body>
    </html>
    """
    
    # Plain text version
    text_body = f"""
    GTR Motors - Order Confirmation
    
    Hi {customer_name},
    
    Thank you for your order! We've received it and are processing it now.
    
    Order #{order_id}
    
    Items:
    {chr(10).join([f"- {item['name']} x {item['quantity']} - ${item['price']:.2f}" for item in items])}
    
    Total: ${order_total:.2f}
    
    Your order will be shipped within 2-3 business days.
    
    Need help? Contact us at support@gtrmotors.com
    Phone: 0091 80158 71346, 0091 95666 46777
    
    © 2026 GTR Motorsport India Private Limited
    """
    
    return send_email(to_email, subject, html_body, text_body)


def send_payment_success_email(to_email: str, customer_name: str, order_id: str, payment_id: str, amount: float):
    """Send payment confirmation email"""
    
    subject = f"Payment Confirmed - Order {order_id}"
    
    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">✓ Payment Successful</h1>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #10b981;">Payment Confirmed!</h2>
            <p>Hi {customer_name},</p>
            <p>Your payment has been successfully processed.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                <h3 style="margin-top: 0; color: #059669;">Payment Details</h3>
                <p><strong>Order ID:</strong> {order_id}</p>
                <p><strong>Payment ID:</strong> {payment_id}</p>
                <p><strong>Amount Paid:</strong> ₹{amount:.2f}</p>
                <p><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">✓ CONFIRMED</span></p>
            </div>
            
            <p>Your order is now being prepared for shipment. We'll send you another email with tracking information once it ships.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="http://localhost:9002/account/orders/{order_id}" style="display: inline-block; background: #EA580C; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Order Details</a>
            </div>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
            <p style="margin: 5px 0;">© 2026 GTR Motorsport India Private Limited</p>
        </div>
    </body>
    </html>
    """
    
    text_body = f"""
    GTR Motors - Payment Confirmed
    
    Hi {customer_name},
    
    Your payment has been successfully processed!
    
    Payment Details:
    Order ID: {order_id}
    Payment ID: {payment_id}
    Amount Paid: ₹{amount:.2f}
    Status: CONFIRMED
    
    Your order is now being prepared for shipment.
    
    © 2026 GTR Motorsport India Private Limited
    """
    
    return send_email(to_email, subject, html_body, text_body)


def send_account_created_email(to_email: str, customer_name: str):
    """Send welcome email when account is created"""
    
    subject = "Welcome to GTR Motors - Account Created!"
    
    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #EA580C 0%, #DC2626 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">🎉 Welcome to GTR Motors!</h1>
            <p style="color: white; margin: 5px 0;">Your Account is Ready</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #EA580C;">Welcome, {customer_name}!</h2>
            <p>Your GTR Motors account has been successfully created. You're now ready to shop for high-performance auto parts!</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #EA580C;">
                <h3 style="margin-top: 0; color: #EA580C;">✓ Account Created</h3>
                <p><strong>Email:</strong> {to_email}</p>
                <p><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">Active</span></p>
            </div>
            
            <h3 style="color: #EA580C;">What's Next?</h3>
            <ul style="line-height: 1.8;">
                <li>🛒 Browse our <a href="http://localhost:9002/products" style="color: #EA580C; text-decoration: none;">product catalog</a></li>
                <li>💳 Add items to your cart and checkout with Razorpay</li>
                <li>📦 Track your orders in your account dashboard</li>
                <li>⭐ Leave reviews for products you've purchased</li>
            </ul>
            
            <div style="margin: 30px 0; padding: 20px; background: #e8f5e9; border-left: 4px solid #10b981; border-radius: 4px;">
                <strong style="color: #059669;">🎁 Exclusive Offer:</strong><br>
                New members get access to our full product catalog with exclusive deals on high-performance auto parts!
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="http://localhost:9002/products" style="display: inline-block; background: #EA580C; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Start Shopping</a>
            </div>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
            <p style="margin: 5px 0;">Questions? Contact us at support@gtrmotors.com</p>
            <p style="margin: 5px 0;">© 2026 GTR Motorsport India Private Limited</p>
        </div>
    </body>
    </html>
    """
    
    text_body = f"""
    GTR Motors - Welcome!
    
    Hi {customer_name},
    
    Welcome to GTR Motors! Your account has been successfully created.
    
    Email: {to_email}
    Status: Active
    
    What's Next?
    - Browse our product catalog
    - Add items to your cart
    - Track your orders
    - Leave reviews
    
    Start shopping: http://localhost:9002/products
    
    Questions? Contact us at support@gtrmotors.com
    © 2026 GTR Motorsport India Private Limited
    """
    
    return send_email(to_email, subject, html_body, text_body)


def send_login_notification_email(to_email: str, customer_name: str, login_time: str = None, device_info: str = "Web Browser"):
    """Send login notification email"""
    
    from datetime import datetime
    if not login_time:
        login_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    subject = "Login Notification - GTR Motors Account"
    
    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">🔐 Login Notification</h1>
            <p style="color: white; margin: 5px 0;">Your Account Activity</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #3b82f6;">Hello {customer_name},</h2>
            <p>Your GTR Motors account was accessed. Here are the login details:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                <h3 style="margin-top: 0; color: #3b82f6;">✓ Login Detected</h3>
                <p><strong>Email:</strong> {to_email}</p>
                <p><strong>Time:</strong> {login_time}</p>
                <p><strong>Device:</strong> {device_info}</p>
                <p><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">✓ Successful</span></p>
            </div>
            
            <div style="margin: 30px 0; padding: 20px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                <strong style="color: #b45309;">⚠️ Security Tip:</strong><br>
                If you didn't recognize this login, please change your password immediately for security.
            </div>
            
            <h3 style="color: #3b82f6;">Quick Links:</h3>
            <ul style="line-height: 1.8;">
                <li><a href="http://localhost:9002/account" style="color: #3b82f6; text-decoration: none;">View Account</a></li>
                <li><a href="http://localhost:9002/account/orders" style="color: #3b82f6; text-decoration: none;">View Orders</a></li>
                <li><a href="http://localhost:9002" style="color: #3b82f6; text-decoration: none;">Continue Shopping</a></li>
            </ul>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
            <p style="margin: 5px 0;">Questions? Contact us at support@gtrmotors.com</p>
            <p style="margin: 5px 0;">© 2026 GTR Motorsport India Private Limited</p>
        </div>
    </body>
    </html>
    """
    
    text_body = f"""
    GTR Motors - Login Notification
    
    Hi {customer_name},
    
    Your GTR Motors account was accessed.
    
    Login Details:
    Email: {to_email}
    Time: {login_time}
    Device: {device_info}
    Status: Successful
    
    If you didn't recognize this login, please change your password.
    
    Questions? Contact us at support@gtrmotors.com
    © 2026 GTR Motorsport India Private Limited
    """
    
    return send_email(to_email, subject, html_body, text_body)
