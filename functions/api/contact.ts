interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
}

interface ContactPayload {
  name?: string;
  email?: string;
  school?: string;
  message?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let payload: ContactPayload;
  try {
    payload = await context.request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const school = (payload.school ?? "").trim();
  const message = (payload.message ?? "").trim();

  if (!name || !email) {
    return new Response("Navn og e-mail er påkrævet", { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return new Response("Ugyldig e-mail", { status: 400 });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = context.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return new Response("Formularen er ikke konfigureret endnu", { status: 500 });
  }

  const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (char) => {
      const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return map[char];
    });

  const html = `
    <h2>Ny pilot-forespørgsel</h2>
    <p><strong>Navn:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Skole / SFO:</strong> ${escapeHtml(school) || "(ikke angivet)"}</p>
    <p><strong>Besked:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>") || "(ingen besked)"}</p>
  `;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `Ny pilot-forespørgsel fra ${name}`,
      html,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Resend error", errorText);
    return new Response("Kunne ikke sende e-mail", { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
