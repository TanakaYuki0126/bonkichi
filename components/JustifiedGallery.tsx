"use client";

import { useContainerWidth } from "@/hooks/useContainerWidth";
import { photos } from "@/lib/schema";
import justifiedLayout from "justified-layout";
import Image from "next/image";
import { useState } from "react";

type Photo = typeof photos.$inferInsert & { url: string };

export default function JustifiedGallery({ photos }: { photos: Photo[] }) {
  const { ref, width } = useContainerWidth();
  const [selected, setSelected] = useState<Photo | null>(null);
  const layout = justifiedLayout(
    photos.map((p) => p.width / p.height),
    { containerWidth: width, targetRowHeight: 250, boxSpacing: 8 }
  );
  return (
    <div
      className="relative"
      ref={ref}
      style={{ height: layout.containerHeight }}
    >
      {layout.boxes.map((box, i) => {
        const photo = photos[i];
        return (
          <button key={photo.id} onClick={() => setSelected(photo)}>
            <div
              className="absolute overflow-hidden rounded-sm"
              style={{
                top: box.top,
                left: box.left,
                width: box.width,
                height: box.height,
              }}
            >
              <Image
                src={photo.url}
                alt={photo.title ?? ""}
                fill
                className="object-cover opacity-0 transition-opacity duration-500 hover:opacity-70"
                onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
              />
            </div>
          </button>
        );
      })}
      {selected && (
        <div
          // onClick={() => setSelected(null)}
          className={`fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 backdrop-blur-sm`}
        >
          <div>
            <button className="fixed z-[60]" onClick={() => setSelected(null)}>
              <div className="relative w-8 h-8">
                <span className="absolute left-0 top-1/2 h-0.5 w-8 rotate-45 bg-white"></span>
                <span className="absolute left-0 top-1/2 h-0.5 w-8 -rotate-45 bg-white"></span>
              </div>
            </button>
            <div className="fixed right-10 text-sm text-gray-300 flex flex-col items-end">
              <p>{selected.camera}</p>
              <p>{selected.lens}</p>
              <p>F{selected.aperture}</p>
              <p>1/{1 / Number(selected.shutter)}</p>
              <p>ISO{selected.iso}</p>
              <p>{selected.focalLength}mm</p>
            </div>
            <div className="relative flex items-center justify-center w-[80vw] h-[80vh]">
              <Image
                src={selected.url}
                alt={selected.title ?? ""}
                objectFit="contain"
                fill
                className="rounded-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
