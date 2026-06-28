import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;

  const body = await req.json();
  const { name, email, message } = body as {
    name: string;
    email: string;
    message: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — contact form unavailable");
    return NextResponse.json(
      { error: "Contact form not configured" },
      { status: 503 }
    );
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Portfolio <portfolio@sareli.dev>",
    to: ["sarelisg3@gmail.com"],
    replyTo: email,
    subject: `Nuevo mensaje de ${name}`,
    text: `De: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
