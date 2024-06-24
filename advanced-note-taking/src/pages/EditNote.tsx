import { NoteForm } from "../components/NoteForm";
import { useNote } from "../layouts/NoteLayout";
import { NoteData } from "../types/note";
import { Tag } from "../types/tag";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function EditNote({ onAddTag, availableTags, onSubmit }: EditNoteProps) {
  const note = useNote();

  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
