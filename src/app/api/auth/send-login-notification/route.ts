import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, customer_name, device_info } = await request.json();

    if (!email || !customer_name) {
      return NextResponse.json(
        { error: "Missing required fields: email and customer_name" },
        { status: 400 }
      );
    }

    // Call the backend API to send the email
    const response = await fetch("http://localhost:4000/api/email/send-login-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to_email: email,
        customer_name: customer_name,
        device_info: device_info || "Web Browser",
      }),
    });

    if (!response.ok) {
      console.error("Backend email service error:", await response.text());
      return NextResponse.json(
        { error: "Failed to send login notification" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Login notification sent successfully",
    });
  } catch (error: any) {
    console.error("Email route error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
