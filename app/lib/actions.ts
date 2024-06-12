'use server';

import { sql } from "@vercel/postgres";
import { z } from "zod";
import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    date: z.string(),
    status: z.enum(['pending' , 'paid']),
})
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {

    // const rawFormData = {
    //     customerId: formData.get('customerId'),
    //     amount: formData.get('amount'),
    //     status: formData.get('status')
    // };
    //const rawFormData = Object.fromEntries(formData.entries()); //Se puede de cualquier manera

    const { customerId, amount, status } = CreateInvoice.parse({ //PARA VALIDAR DE QUE TENGA EL TIPADO QUE DEBE DE TENER
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql `
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

    revalidatePath('/dashboard/invoices');//para que vuelva a hacer las consultas y se actualice el cache
    redirect('/dashboard/invoices')
}