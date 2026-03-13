"use client";

import { updateDisplayOrders } from "@/app/actions/updateDisplayOrders";
import { Photo } from "@/components/JustifiedGallery";
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { useRef } from "react";

export default function SortableProvider({
  children,
  photos,
}: {
  children: React.ReactNode;
  photos: Photo[];
}) {
  const order = useRef(photos);
  return (
    <DragDropProvider
      onDragEnd={async (e) => {
        if (e.canceled) return;
        const { source } = e.operation;
        if (isSortable(source)) {
          const { initialIndex, index } = source;
          if (initialIndex === index) return;
          const target = order.current.splice(initialIndex, 1);
          order.current.splice(index, 0, target[0]);
          const newPhotos = order.current;
          await updateDisplayOrders(
            newPhotos.map((p, i) => ({
              id: p.id ?? "",
              displayOrder: i,
            }))
          );
        }
      }}
    >
      {children}
    </DragDropProvider>
  );
}
