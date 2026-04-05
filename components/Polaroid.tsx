import Image from "next/image";

interface PolaroidProps {
  src: string;
  alt: string;
  caption: string;
  rotation?: number;
}

export default function Polaroid({
  src,
  alt,
  caption,
  rotation = 0,
}: PolaroidProps) {
  return (
    <div
      className="bg-white p-3 pb-0 rounded shadow-md hover:rotate-0 hover:scale-105 hover:z-10 transition-transform duration-300 w-[210px]"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="w-full aspect-square bg-parchment rounded-sm overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-sm text-center py-3 px-1 text-accent italic">
        {caption}
      </p>
    </div>
  );
}
