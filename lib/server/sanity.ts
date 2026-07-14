import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { pbkdf2Sync, randomBytes } from "crypto";

const JWT_SECRET = new TextEncoder().encode(
    process.env.SESSION_SECRET || "e9a7e47b0e1234c56789afde0123456789abcde0123456789abcdef012345678"
);

export interface SessionPayload {
    userId: string;
    email: string;
    name: string;
}

export async function encryptSession(payload: SessionPayload) {
    return await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(JWT_SECRET);
}

export async function decryptSession(token: string): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET, {
            algorithms: ["HS256"],
        });
        return payload as unknown as SessionPayload;
    } catch (error) {
        return null;
    }
}

export async function getLoggedInUser(): Promise<SessionPayload | null> {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("locallify-session");
        if (!session || !session.value) {
            return null;
        }
        return await decryptSession(session.value);
    } catch (error) {
        console.error("Error retrieving logged-in user:", error);
        return null;
    }
}

export function hashPassword(password: string): string {
    const salt = randomBytes(16).toString("hex");
    const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
    if (!storedHash || !storedHash.includes(":")) {
        return false;
    }
    const [salt, hash] = storedHash.split(":");
    const verifyHash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return hash === verifyHash;
}
