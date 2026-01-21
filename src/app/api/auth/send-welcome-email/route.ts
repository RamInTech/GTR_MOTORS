import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, customer_name } = await request.json();

    if (!email || !customer_name) {
      return NextResponse.json(
        { error: "Missing required fields: email and customer_name" },
        { status: 400 }
      );
    }

    // Call the backend API to send the email
    const response = await fetch("http://localhost:4000/api/email/send-account-created", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to_email: email,
        customer_name: customer_name,
      }),
    });

    if (!response.ok) {
      console.error("Backend email service error:", await response.text());
      return NextResponse.json(
        { error: "Failed to send welcome email" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Welcome email sent successfully",
    });
  } catch (error: any) {
    console.error("Email route error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
