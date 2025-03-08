import Link from "next/link";
import { Metadata } from "next";
import LandingPage from "@/components/landing-page";

export const metadata: Metadata = {
  title: "TODO APP YOUTUBE | Modern Task Management",
  description: "Streamline your workflow with our intuitive task management application",
};

export default function Home() {
  return <LandingPage  />;
}
