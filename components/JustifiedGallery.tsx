"use client";

import { useContainerWidth } from "@/hooks/useContainerWidth";
import { photos } from "@/lib/schema";
import justifiedLayout from "justified-layout";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

export type Photo = typeof photos.$inferInsert & { url: string };

export default function JustifiedGallery({ photos }: { photos: Photo[] }) {
  const startX = useRef<number | null>(null);
  const searchParams = useSearchParams();
  const photoId = searchParams.get("photo");
  const selectedPhoto = photos.find((p) => p.id === photoId);

  const currentIndex = useMemo(
    () => photos.findIndex((p) => p.id === selectedPhoto?.id),
    [selectedPhoto?.id]
  );
  const isFirstImage = currentIndex === 0;
  const isLastImage = currentIndex === photos.length - 1;
  const router = useRouter();
  const { ref, width } = useContainerWidth();
  const layout = useMemo(
    () =>
      justifiedLayout(
        photos.map((p) => p.width / p.height),
        { containerWidth: width, targetRowHeight: 250, boxSpacing: 8 }
      ),
    [photos, width]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const diff = e.clientX - startX.current;
    const threshold = 50;
    if (diff > threshold) {
      showPrevImage();
    }
    if (diff < -threshold) {
      showNextImage();
    }
    startX.current = null;
  };

  const openPhoto = (photo: Photo) => {
    router.replace(`?photo=${photo.id}`, { scroll: false });
  };
  const closePhoto = () => {
    router.replace("/gallery", { scroll: false });
  };
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPhoto]);

  const showPrevImage = () => {
    if (!selectedPhoto || isFirstImage) return;
    openPhoto(photos[currentIndex - 1]);
  };

  const showNextImage = () => {
    if (!selectedPhoto || isLastImage) return;
    openPhoto(photos[currentIndex + 1]);
  };

  useEffect(() => {
    if (!selectedPhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape": {
          closePhoto();
          break;
        }
        case "ArrowLeft": {
          showPrevImage();
          break;
        }
        case "ArrowRight": {
          showNextImage();
          break;
        }
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto, currentIndex]);

  return (
    <div
      className="relative"
      ref={ref}
      style={{ height: layout.containerHeight }}
    >
      {layout.boxes.map((box, i) => {
        const photo = photos[i];
        return (
          <button
            key={photo.id}
            style={{
              top: box.top,
              left: box.left,
              width: box.width,
              height: box.height,
            }}
            className="absolute overflow-hidden rounded-sm"
            onClick={() => openPhoto(photo)}
          >
            <Image
              src={photo.url}
              alt={photo.title ?? ""}
              fill
              className="object-cover opacity-0 transition-opacity duration-500 hover:opacity-70"
              onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
            />
          </button>
        );
      })}
      <div
        className={`fixed inset-0 touch-none bg-black/80 flex flex-col items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300 ${
          selectedPhoto ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div>
          <button className="fixed z-[60]" onClick={closePhoto}>
            <div className="relative w-8 h-8">
              <span className="absolute left-0 top-1/2 h-0.5 w-8 rotate-45 bg-gray-200"></span>
              <span className="absolute left-0 top-1/2 h-0.5 w-8 -rotate-45 bg-gray-200"></span>
            </div>
          </button>
          {selectedPhoto && !isFirstImage && (
            <button
              className="fixed sm:left-10 left-2 top-1/2 z-[60]"
              onClick={showPrevImage}
            >
              <div className="relative w-8 h-8">
                <span className="absolute left-0 top-1/2 h-0.5 w-6 rotate-45 translate-y-2  bg-gray-200"></span>
                <span className="absolute left-0 top-1/2 h-0.5 w-6 -rotate-45 -translate-y-2  bg-gray-200"></span>
              </div>
            </button>
          )}
          {selectedPhoto && !isLastImage && (
            <button
              className="fixed sm:right-10 right-0 top-1/2 z-[60]"
              onClick={showNextImage}
            >
              <div className="relative w-8 h-8">
                <span className="absolute left-0 top-1/2 h-0.5 w-6 -rotate-45 translate-y-2  bg-gray-200"></span>
                <span className="absolute left-0 top-1/2 h-0.5 w-6 rotate-45 -translate-y-2  bg-gray-200"></span>
              </div>
            </button>
          )}

          {/* {selectedPhoto && (
            <div className="fixed right-10 text-sm text-gray-300 flex flex-col items-end">
              <p>{selectedPhoto.camera}</p>
              <p>{selectedPhoto.lens}</p>
              <p>F{selectedPhoto.aperture}</p>
              <p>1/{1 / Number(selectedPhoto.shutter)}</p>
              <p>ISO{selectedPhoto.iso}</p>
              <p>{selectedPhoto.focalLength}mm</p>
            </div>
          )} */}

          <div className="relative flex items-center justify-center w-[80vw] h-[80vh]">
            {selectedPhoto && (
              <Image
                key={selectedPhoto.id}
                src={selectedPhoto.url}
                alt={selectedPhoto.title ?? ""}
                fill
                className="object-contain rounded-sm opacity-0 transition duration-300 scale-[0.98]"
                onLoad={(e) => {
                  e.currentTarget.classList.remove("opacity-0");
                  e.currentTarget.classList.remove("scale-[0.98]");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
