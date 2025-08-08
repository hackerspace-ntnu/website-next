import { createSlateEditor, type Value } from 'platejs';
import { BaseEditorKit } from '@/components/ui/plate/base-kits/EditorBaseKit';
import { EditorStatic } from '@/components/ui/plate/EditorStatic';

export const EditorViewStatic = ({ value }: { value: Value }) => {
  const editor = createSlateEditor({
    plugins: BaseEditorKit,
    value: value,
  });

  return <EditorStatic editor={editor} variant='none' />;
};
