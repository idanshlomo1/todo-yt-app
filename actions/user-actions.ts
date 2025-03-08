'use server'

import { hash } from "bcrypt";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function registerUser(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return { error: "All fields are required" };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return { error: "User already exists" };
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    // Return success instead of redirecting here
    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to register user" };
  }
}
