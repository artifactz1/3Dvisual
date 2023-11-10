import Image from "next/image";
import { ThreeModel } from "./components/threemodel";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="w-screen h-screen">
        <ThreeModel />
      </div>
    </main>
  );
}
