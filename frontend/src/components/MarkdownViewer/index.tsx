import React from 'react';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';

interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer = ({ content }: MarkdownViewerProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Markdown.configure({
        html: false, // Ensures that only Markdown is parsed
      }),
    ],
    content,
    editable: false,
  });

  return (
    <div className="prose">
      <EditorContent editor={editor} />
    </div>
  );
};

export default MarkdownViewer;
