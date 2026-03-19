import messages from '../lib/messages.json';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const generateAIMessage = async (occasion) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

  try {
    if (!OPENROUTER_API_KEY) throw new Error("API Key missing");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-lite-preview-02-05:free",
        messages: [
          {
            role: "system",
            content: "You are a creative celebration message generator. Generate a warm greeting for an invitation. Return ONLY a JSON object with 'ar' (Arabic) and 'en' (English) keys. No other text."
          },
          {
            role: "user",
            content: `Generate a short creative invitation message for: ${occasion}`
          }
        ],
        response_format: { type: "json_object" }
      })
    });

    clearTimeout(timeoutId);
    const data = await response.json();
    const content = data.choices[0].message.content;
    const parsed = typeof content === 'string' ? JSON.parse(content) : content;
    
    if (parsed && parsed.ar && parsed.en) {
      return parsed;
    }
    throw new Error("Invalid response format");
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn("AI generation failed or timed out, falling back:", error);
    const categoryMessages = messages[occasion] || messages['birthday'];
    return categoryMessages[Math.floor(Math.random() * categoryMessages.length)];
  }
};
