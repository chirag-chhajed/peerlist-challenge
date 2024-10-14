import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <main className="h-screen grid place-content-center">
      <div className="flex flex-col gap-4 items-center">
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
