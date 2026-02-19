"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    try {
      const response = await fetch(
  `https://graph.facebook.com/v22.0/${process.env.NEXT_PUBLIC_PHONE_NUMBER_ID}/messages`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: process.env.NEXT_PUBLIC_RECIPIENT_NUMBER,
      type: "template",
      template: {
        name: "hello_world",
        language: { code: "en_US" }
      }
    }),
  }
);


      const data = await response.json();
      console.log("WhatsApp API Response:", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className='bg-black h-screen w-full flex justify-center items-center'>
      <div className='w-1/3 gap-3 text-white flex flex-col justify-between'>
        <h1>WhatsApp API Test</h1>
        <div className="input">
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Type your message'
            className='p-2  outline-none border-amber-50 '
          />
        </div>
        <button onClick={sendMessage} className='btn-secondary w-full'>
          Send
        </button>
      </div>
    </div>
  );
}
