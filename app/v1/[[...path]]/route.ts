import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) { return proxyRequest(request); }
export async function POST(request: NextRequest) { return proxyRequest(request); }
export async function PUT(request: NextRequest) { return proxyRequest(request); }
export async function PATCH(request: NextRequest) { return proxyRequest(request); }
export async function DELETE(request: NextRequest) { return proxyRequest(request); }
export async function OPTIONS(request: NextRequest) { return proxyRequest(request); }

async function proxyRequest(request: NextRequest) {
    const trace: string[] = [];
    try {
        const { pathname, search } = request.nextUrl;
        const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1";
        
        const base = endpoint.endsWith('/') ? endpoint : `${endpoint}/`;
        const path = pathname.replace(/^\/v1\//, "").replace(/^\/v1/, "");
        const targetUrl = new URL(path + search, base).toString();

        trace.push(`Target URL: ${targetUrl}`);

        const headers = new Headers();
        request.headers.forEach((value, key) => {
            if (!['host', 'connection', 'content-encoding', 'transfer-encoding'].includes(key.toLowerCase())) {
                headers.set(key, value);
            }
        });
        
        // Ensure project ID is set
        headers.set('x-appwrite-project', process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

        trace.push(`Headers prepared`);

        let body: any = undefined;
        if (request.method !== "GET" && request.method !== "HEAD") {
            trace.push(`Reading body...`);
            body = await request.arrayBuffer();
            trace.push(`Body read, size: ${body.byteLength}`);
        }

        trace.push(`Fetching...`);
        const response = await fetch(targetUrl, {
            method: request.method,
            headers: headers,
            body: body,
            cache: "no-store",
            // @ts-ignore
            duplex: "half",
        });

        trace.push(`Response received: ${response.status}`);

        const responseHeaders = new Headers();
        response.headers.forEach((value, key) => {
            if (!['content-encoding', 'content-length', 'transfer-encoding'].includes(key.toLowerCase())) {
                responseHeaders.set(key, value);
            }
        });

        const responseData = await response.arrayBuffer();
        trace.push(`Response body read, size: ${responseData.byteLength}`);

        return new Response(responseData, {
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders,
        });
    } catch (error: any) {
        console.error("[Proxy Error]:", error);
        return new Response(JSON.stringify({ 
            error: "Proxy failed", 
            message: error.message,
            trace: trace,
            stack: error.stack 
        }), { 
            status: 500, 
            headers: { 'Content-Type': 'application/json' } 
        });
    }
}
