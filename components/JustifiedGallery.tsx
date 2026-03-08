"use client";

import { photos } from "@/lib/schema";
import justifiedLayout from "justified-layout";
import Image from "next/image";
import { useEffect, useState } from "react";

type Photo = typeof photos.$inferInsert & { url: string };

export default function JustifiedGallery({ photos }: { photos: Photo[] }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const layout = justifiedLayout(
    photos.map((p) => p.width / p.height),
    { containerWidth, targetRowHeight: 250, boxSpacing: 8 }
  );
  useEffect(() => {
    setContainerWidth(window.innerWidth);
  }, []);
  return (
    <div>
      <div className="relative">
        {layout.boxes.map((box, i) => {
          const photo = photos[i];
          return (
            <div
              key={photo.id}
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
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
