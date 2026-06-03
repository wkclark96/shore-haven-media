// netlify/functions/callback.js
// Step 2 of the OAuth flow: GitHub redirects here with a code.
// We exchange it for an access token and hand it back to the Decap CMS window.

export const handler = async (event) => {
  const code = event.queryStringParameters.code;
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  try {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await res.json();

    if (data.error || !data.access_token) {
      return html("error", { error: data.error || "no_token" });
    }

    return html("success", { token: data.access_token, provider: "github" });
  } catch (err) {
    return html("error", { error: err.message });
  }
};

function html(status, content) {
  const body = `<!DOCTYPE html>
<html>
  <head><meta charset="utf-8" /></head>
  <body>
    <script>
      (function () {
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:${status}:${JSON.stringify(content)}',
            e.origin
          );
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
    <p style="font-family: sans-serif; text-align: center; margin-top: 40px;">
      Completing sign-in…
    </p>
  </body>
</html>`;

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body,
  };
}
