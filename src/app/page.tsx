import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" h-screen bg-white w-full flex justify-center items-center">
      <div className="flex flex-col gap-5">
        <Typography size={'h1'} as={'h1'} className="text-wrap w-full text-success-green whitespace-normal">
          AAAAAAAAAAAAAAAAAAAAAAAAAA
        </Typography>
        <Button disabled>
          Hello
        </Button>
        <Button variant={'danger'}>
          Hello
        </Button>
        <Button variant={'secondary'}>
          Hello
        </Button>
        <Button variant={'ghost'}>
          Hello
        </Button>
      </div>
    </div>
  );
}
