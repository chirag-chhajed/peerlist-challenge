import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <main className="grid h-screen place-content-center">
      <div className="flex flex-col items-center gap-4">
        <Image
          priority
          src={"/cover.png"}
          alt="cover image"
          height={630}
          width={1200}
          draggable={false}
        />
        <Link className="hover:underline" href="/peerlist/day-1">
          Go here
        </Link>
      </div>
    </main>
  );
};

export default Page;
