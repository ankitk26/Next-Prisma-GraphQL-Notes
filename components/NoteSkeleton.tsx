import NoteSkeletonItem from "./NoteSkeletonItem";

export default function NoteSkeleton() {
  return (
    <div className="flex flex-col w-1/2 gap-8 mx-auto animate-pulse">
      <NoteSkeletonItem />
      <NoteSkeletonItem />
      <NoteSkeletonItem />
    </div>
  );
}
