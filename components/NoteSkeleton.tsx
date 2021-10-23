import NoteSkeletonItem from "./NoteSkeletonItem";

export default function NoteSkeleton() {
  return (
    <div className="flex flex-col w-full gap-8 mx-auto md:w-1/2 animate-pulse">
      <NoteSkeletonItem />
      <NoteSkeletonItem />
      <NoteSkeletonItem />
    </div>
  );
}
