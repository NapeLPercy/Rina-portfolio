import getExpiryTimeFormatted from "./dateTime";
const REQUIRED_ENV_KEYS = [
  "VITE_EMAILJS_SERVICE_ID",
  "VITE_EMAILJS_PUBLIC_KEY",
];

const EMAIL_TIMEOUT_MS = 15000;

function getEmailConfig() {
  const missing = REQUIRED_ENV_KEYS.filter((key) => !import.meta.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required EmailJS env vars: ${missing.join(", ")}`);
  }

  return {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  };
}

function assertTemplateParams(templateParams) {
  if (!templateParams || typeof templateParams !== "object" || Array.isArray(templateParams)) {
    throw new Error("templateParams must be a plain object.");
  }
}

async function withTimeout(promise, timeoutMs = EMAIL_TIMEOUT_MS) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Email request timed out.")), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function sendEmailSafe(templateParams, templateId) {


  assertTemplateParams(templateParams);
  const { serviceId, publicKey } = getEmailConfig();

  templateParams.time = getExpiryTimeFormatted();

  try {
    const emailjs = await import("@emailjs/browser");
    const sendPromise = emailjs.default.send(serviceId, templateId, templateParams, {
      publicKey,
    });

    const result = await withTimeout(sendPromise);

    return {
      success: true,
      status: result?.status ?? 200,
      text: result?.text ?? "OK",
    };
  } catch (error) {
    const message =
      error && typeof error === "object" && "message" in error
        ? error.message
        : "Failed to send email.";

    return {
      success: false,
      status: 500,
      error: message,
    };
  }
}

