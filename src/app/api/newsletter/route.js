import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, name, lang, source } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }

    const API_KEY = process.env.MAILERLITE_API_KEY;
    const GROUP_ID = process.env.MAILERLITE_GROUP_ID;

    if (!API_KEY || !GROUP_ID) {
      console.error('MailerLite credentials missing');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    // Add subscriber to MailerLite group
    const response = await fetch(`https://connect.mailerlite.com/api/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        email,
        fields: {
          name: name || '',
          last_name: '',
        },
        groups: [GROUP_ID],
        status: 'active',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // MailerLite returns 422 if already subscribed — treat as success
      if (response.status === 422 || data?.message?.includes('already')) {
        return NextResponse.json({ success: true, already: true });
      }
      console.error('MailerLite error:', data);
      return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
