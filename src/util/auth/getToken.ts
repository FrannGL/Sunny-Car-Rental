export function getToken(): string | null {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user-session="));

  if (!cookie) return null;

  try {
    const sessionValue = decodeURIComponent(cookie.split("=")[1]);
    const { token } = JSON.parse(sessionValue);
    return token || null;
  } catch (error) {
    console.error("Error parsing user-session cookie:", error);
    return null;
  }
}
