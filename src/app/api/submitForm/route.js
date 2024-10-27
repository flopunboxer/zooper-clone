// /app/api/submitForm/route.js
import dbConnect from '@/utils/mongo/dbConnect';
import { getEmailTemplate } from '@/utils/mongo/emailTemplate';
import User from '@/utils/mongo/models/userSchema'
import nodemailer from 'nodemailer';

export async function POST(req) {
  console.log("trying db...")
  await dbConnect();
  
  const formData = await req.json();
console.log(formData)
  try {
    // Save to MongoDB
    const newUser = new User(formData);
    await newUser.save();

     // Set up email transporter
     const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

     // Generate email content using the template
     console.log(formData,"here")
     const emailContent = getEmailTemplate({
      email: formData.email,
      name: formData.name,
      gender: formData.gender,
      phone: formData.phone,
      city: formData.city,
      age: formData.age,
      children: formData.children || [],
      signature: formData.signature,
      
    });
    
     // Email send to user
     const mailOptions = {
      from: `"YooHoo" <${process.env.EMAIL_USER}>`,
      to: `${formData.email}, ${process.env.ADMIN_EMAIL}`,
      subject: 'Thank You for Your Waiver Form Submission',
      html: emailContent,
      text: `Thank you ${formData.name} for submitting your waiver form. This email contains a copy of your submission.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Form submitted successfully!',code:200 }), { status: 200 });
  } catch (error) {
    console.log("error is ",error)
    return new Response(JSON.stringify({ message: 'Submission failed',error ,code:500}), { status: 500 });
  }
}
