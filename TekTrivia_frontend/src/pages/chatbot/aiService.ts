const askAI = async (prompt: string): Promise<string> => {
  const apiKey =
    "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";

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1-zero:free", //"gpt-4", ou "gpt-3.5-turbo"
      messages: [{ role: "client assistance", content: prompt }],
      temperature: 0.7,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || "Erreur serveur");
  }

  return data.choices[0].message.content.trim();
};

export default askAI;
