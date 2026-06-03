// netlify/functions/auth.js
// Step 1 of the OAuth flow: send the user to GitHub to authorize.

export const handler = async (event) => {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const host = event.headers.host;
  const proto = host.includes("localhost") ? "http" : "https";
  const redirectUri = `${proto}://${host}/.netlify/functions/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "repo,user",
    state: Math.random().toString(36).slice(2),
    allow_signup: "false",
  });

  return {
    statusCode: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
    },
  };
};
