import { NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';

export async function POST(request: Request) {
    try {
        const { amount, userId } = await request.json();

        let snap = new midtransClient.Snap({
            isProduction: false, // Ubah ke true jika rilis
            serverKey: process.env.MIDTRANS_SERVER_KEY || '',
            clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ''
        });

        let parameter = {
            transaction_details: {
                order_id: `TOPUP-${userId}-${Date.now()}`,
                gross_amount: amount
            },
            credit_card: { secure: true }
        };

        const transaction = await snap.createTransaction(parameter);
        return NextResponse.json({ token: transaction.token });
    } catch (error) {
        return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
    }
}