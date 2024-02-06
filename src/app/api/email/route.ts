import { NextResponse } from 'next/server'

export async function POST(
    req: Request
) {
    try{
        let emailData = await req.json()
        emailData = {
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id:process.env.EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_USER_ID,
            accessToken: process.env.EMAILJS_ACCESSTOKEN,
            template_params: {...emailData, "to_name":"Victor"}
        }
        await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(emailData)
        })
        alert("Message sent. Thanks for reaching out!")
        return NextResponse.json({message:"Sent Email!"}, {status:200})
    }
    catch(e){
        console.log(e)
        alert("Failed to send! Please try again later. :(")
        return NextResponse.json({message:"Failed to send email!"}, {status:400})
    }
}

