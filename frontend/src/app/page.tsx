import Image from "next/image";

export default function Home() {
  return (
    <div>
      <nav className="flex justify-between items-center w-full h-16 bg-white fixed top-0 left-0 right-0 px-4">
        <div>TCG Project Management Dashboard</div>
        <div><Image src="/tcg_logo.png" alt="Logo" width={100} height={40} /></div>
      </nav>
    </div>
  );
}
