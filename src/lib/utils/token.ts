import { getToken } from "next-auth/jwt";
import { encode, decode } from "next-auth/jwt";
import { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET!;

export async function createAccessToken(payload: {
  id: string;
  email: string;
}) {
  return await encode({ token: payload, secret, maxAge: 15 * 60 });
}

export async function verifyAccessToken(req: NextRequest) {
  return await getToken({ req, secret });
}
