"use client";
import { useSortable } from "@dnd-kit/react/sortable";
import Image from "next/image";
import { Photo } from "@/components/JustifiedGallery";

export default function DraggableImage({
  photo,
  index,
}: {
  photo: Photo;
  index: number;
}) {
  const { ref } = useSortable({ id: photo.id ?? "id", index });
  return (
    <div key={photo.id} className="" ref={ref}>
      <Image
        src={photo.url}
        width={photo.width}
        height={photo.height}
        alt={photo.title ?? ""}
        className="w-[200px]"
      />
    </div>
  );
}
