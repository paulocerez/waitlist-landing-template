"use client";
import Content from "@/components/Content";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loom from "@/components/Loom";

export default function Home() {
  return (
    <main className="flex flex-col p-8 justify-between items-center space-y-12">
      <Header />
      <Content />
      <Loom />
      <Footer />
    </main>
  );
}
