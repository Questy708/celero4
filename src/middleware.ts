import { NextRequest, NextResponse } from "next/server";

// In-memory rate limit store for middleware-level protection
const middlewareRateLimits = new Map<
  string,
  { count: number; windowStart: number }
>();

const API_RATE_LIMIT = 60; // requests per window
const API_RATE_WINDOW = 60 * 1000; // 1 minute

// Counter for periodic cleanup (avoids running on every request)
let rateLimitCheckCount = 0;

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Remove stale rate limit entries whose window has expired beyond
 * twice the normal window length. Called every 100th check.
 */
function cleanupRateLimits(): void {
  const now = Date.now();
  const maxAge = API_RATE_WINDOW * 2;
  for (const [ip, entry] of middlewareRateLimits) {
    if (now - entry.windowStart > maxAge) {
      middlewareRateLimits.delete(ip);
    }
  }
}

function checkMiddlewareRateLimit(ip: string): boolean {
  // Periodic cleanup: every 100th check
  rateLimitCheckCount += 1;
  if (rateLimitCheckCount % 100 === 0) {
    cleanupRateLimits();
  }

  const now = Date.now();
  const entry = middlewareRateLimits.get(ip);

  if (!entry || now - entry.windowStart > API_RATE_WINDOW) {
    middlewareRateLimits.set(ip, { count: 1, windowStart: now });
    return true;
  }

  if (entry.count >= API_RATE_LIMIT) {
    return false;
  }

  entry.count += 1;
  return true;
}

/**
 * Build CORS headers for the response.
 * In production, uses NEXT_PUBLIC_SITE_URL or https://xcelerolabs.com.
 * In development, uses *.
 */
function getCorsHeaders(): Record<string, string> {
  const isDev = process.env.NODE_ENV !== "production";
  const allowedOrigin = isDev
    ? "*"
    : (process.env.NEXT_PUBLIC_SITE_URL || "https://xcelerolabs.com");

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ─── HTTPS redirect in production ───
  if (
    process.env.NODE_ENV === "production" &&
    req.headers.get("x-forwarded-proto") === "http"
  ) {
    const httpsUrl = new URL(req.url);
    httpsUrl.protocol = "https:";
    return NextResponse.redirect(httpsUrl, 301);
  }

  // ─── Handle CORS preflight (OPTIONS) ───
  if (req.method === "OPTIONS") {
    const corsHeaders = getCorsHeaders();
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // ─── Rate limit all API routes ───
  if (pathname.startsWith("/api/")) {
    const ip = getClientIp(req);
    const allowed = checkMiddlewareRateLimit(ip);

    if (!allowed) {
      const response = NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429 }
      );
      // Add CORS headers even on rate-limited responses
      const corsHeaders = getCorsHeaders();
      for (const [key, value] of Object.entries(corsHeaders)) {
        response.headers.set(key, value);
      }
      return response;
    }
  }

  // ─── Block access to sensitive paths ───
  const blockedPaths = ["/.env", "/.git", "/prisma", "/db"];
  if (blockedPaths.some((p) => pathname.startsWith(p))) {
    return new NextResponse(null, { status: 404 });
  }

  const response = NextResponse.next();

  // ─── Add CORS headers to all responses ───
  const corsHeaders = getCorsHeaders();
  for (const [key, value] of Object.entries(corsHeaders)) {
    response.headers.set(key, value);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
