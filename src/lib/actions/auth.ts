"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function login(_prev: unknown, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const user = await prisma.adminUser.findUnique({
    where: { username, active: true },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: "Invalid username or password" };
  }

  await prisma.adminUser.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  const token = Buffer.from(
    JSON.stringify({
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      ts: Date.now(),
    }),
  ).toString("base64");

  (await cookies()).set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  redirect("/admin/dashboard");
}

export async function logout() {
  (await cookies()).delete("admin_session");
  redirect("/admin");
}

export async function getSession() {
  const session = (await cookies()).get("admin_session");
  if (!session?.value) return null;

  try {
    const data = JSON.parse(Buffer.from(session.value, "base64").toString());
    if (!data.id || !data.username) return null;
    return { id: data.id, username: data.username, name: data.name, role: data.role };
  } catch {
    return null;
  }
}
