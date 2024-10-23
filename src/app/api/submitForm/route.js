// /app/api/submitForm/route.js
import dbConnect from '@/utils/mongo/dbConnect';
import { getEmailTemplate } from '@/utils/mongo/emailTemplate';
import User from '@/utils/mongo/models/userSchema'
import nodemailer from 'nodemailer';

export async function POST(req) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
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
      from: `"Zooper" <${process.env.EMAIL_USER}>`,
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
