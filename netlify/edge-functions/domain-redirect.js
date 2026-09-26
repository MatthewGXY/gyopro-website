// Netlify Edge Function: domain-redirect
// Runs at the edge BEFORE content serving. If request Host matches
// gyopro.net.au (with or without www), 301 redirect to gyopro.com.au.
// This bypasses Netlify's "domain alias" behavior which would otherwise
// serve the same content without redirecting.

export default async (request) => {
  const url = new URL(request.url);
  const host = (request.headers.get("host") || url.host).toLowerCase();

  if (host === "gyopro.net.au" || host === "www.gyopro.net.au") {
    const target = "https://gyopro.com.au" + url.pathname + url.search;
    return Response.redirect(target, 301);
  }

  // Pass-through for all other hosts
  return; // returning undefined lets the request proceed normally
};

export const config = { path: "/*" };