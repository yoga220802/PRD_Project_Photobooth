import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
    try {
        const apiKey = process.env.RESEND_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'Missing RESEND_API_KEY' },
                { status: 500 }
            );
        }

        const resend = new Resend(apiKey);

        const { email, imageUrl } = await request.json();

        const { data, error } = await resend.emails.send({
            from: 'Photobooth <onboarding@resend.dev>',
            to: [email],
            subject: '✨ Hasil Foto Kamu dari Photobooth!',
            html: `
                <p>Terima kasih sudah berfoto! Unduh momen kamu di sini:</p>
                <a href="${imageUrl}" download>Download Foto</a>
                <br/>
                <img src="${imageUrl}" alt="Your Photo" style="width:100%; max-width:500px;"/>
            `,
        });

        if (error) {
            return NextResponse.json({ error }, { status: 400 });
        }

        return NextResponse.json({ data });

    } catch (error) {
        return NextResponse.json(
            { error: 'Email failed to send' },
            { status: 500 }
        );
    }
}