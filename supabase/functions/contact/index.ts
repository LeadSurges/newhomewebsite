import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, phone, message, type, to, propertyTitle } = await req.json()

    // Validate required fields
    if (!name || !email || !phone || !message || !type || !to) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const client = new SmtpClient()

    await client.connectTLS({
      hostname: "smtp.gmail.com",
      port: 465,
      username: "officialleadsurge@gmail.com",
      password: Deno.env.get("GMAIL_APP_PASSWORD") || "",
    })

    let subject = `New ${type} Inquiry from ${name}`
    let emailBody = `
      New ${type} Inquiry
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
      Type: ${type}
    `

    if (propertyTitle) {
      subject = `Property Inquiry: ${propertyTitle}`
      emailBody += `\nProperty: ${propertyTitle}`
    }

    await client.send({
      from: "officialleadsurge@gmail.com",
      to: to,
      subject: subject,
      content: emailBody,
    })

    await client.close()

    console.log('Email sent successfully to:', to)

    return new Response(
      JSON.stringify({ message: 'Message sent successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})