// middleware.js  (repo root)
export const config = {
  matcher: '/internal/:path*',   // ONLY this path — nothing else is touched
};

export default function middleware(request) {
  const auth = request.headers.get('authorization');

  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic') {
      const decoded = atob(encoded);           // "user:pass"
      const [user, pass] = decoded.split(':');
      if (
        user === process.env.INTERNAL_USER &&
        pass === process.env.INTERNAL_PASSWORD
      ) {
        return; // authorized — let the request through to the static file
      }
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="LAM Internal"' },
  });
}
