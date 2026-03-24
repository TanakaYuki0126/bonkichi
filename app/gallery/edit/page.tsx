import { getGalleryPhotosService } from "@/features/gallery/services/getGalleryPhotos";
import DraggableImage from "@/features/gallery/components/DraggableImage";
import SortableProvider from "@/features/gallery/providers/SortableProvider";

export default async function EditPage() {
  const photos = await getGalleryPhotosService();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <SortableProvider photos={photos}>
        {photos.map((photo, index) => {
          return <DraggableImage key={photo.id} photo={photo} index={index} />;
        })}
      </SortableProvider>
    </div>
  );
}
