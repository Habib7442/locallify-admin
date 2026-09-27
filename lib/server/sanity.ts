import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

// No fallback: a hard-coded default secret would let anyone forge a session
// on any deployment where SESSION_SECRET was forgotten. Fail closed instead.
function getJwtSecret() {
    const secret = process.env.SESSION_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error("SESSION_SECRET must be set (32+ characters)");
    }
    return new TextEncoder().encode(secret);
}

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
        .sign(getJwtSecret());
}

export async function decryptSession(token: string): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, getJwtSecret(), {
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

// OWASP 2023 guidance for PBKDF2-HMAC-SHA512. Hashes are stored as
// "pbkdf2$<iterations>$<salt>$<hash>"; the older "<salt>:<hash>" format
// (1,000 iterations) still verifies and is upgraded on the next login.
const PBKDF2_ITERATIONS = 210_000;
const LEGACY_ITERATIONS = 1_000;

export function hashPassword(password: string): string {
    const salt = randomBytes(16).toString("hex");
    const hash = pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 64, "sha512").toString("hex");
    return `pbkdf2$${PBKDF2_ITERATIONS}$${salt}$${hash}`;
}

function parseHash(storedHash: string) {
    if (storedHash?.startsWith("pbkdf2$")) {
        const [, iterations, salt, hash] = storedHash.split("$");
        return { iterations: Number(iterations), salt, hash };
    }
    if (storedHash?.includes(":")) {
        const [salt, hash] = storedHash.split(":");
        return { iterations: LEGACY_ITERATIONS, salt, hash };
    }
    return null;
}

export function verifyPassword(password: string, storedHash: string): boolean {
    const parsed = parseHash(storedHash);
    if (!parsed || !parsed.salt || !parsed.hash || !parsed.iterations) return false;
    const candidate = pbkdf2Sync(password, parsed.salt, parsed.iterations, 64, "sha512");
    const expected = Buffer.from(parsed.hash, "hex");
    return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

export function needsRehash(storedHash: string): boolean {
    const parsed = parseHash(storedHash);
    return !parsed || parsed.iterations < PBKDF2_ITERATIONS;
}
