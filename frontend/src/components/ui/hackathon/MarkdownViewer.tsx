'use client';

import BlockQuote from '@tiptap/extension-blockquote';
import Code from '@tiptap/extension-code';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Typography from '@tiptap/extension-typography';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';
import { Markdown } from 'tiptap-markdown';
import './MarkdownViewer.css';

interface MarkdownViewerProps {
  content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        blockquote: false,
      }),
      Highlight,
      Image.configure({ inline: true, allowBase64: true }),
      Typography,
      Markdown,
      Table,
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'flex space-x-2 [&_p]:m-0',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
      }),
      Code.configure({
        HTMLAttributes: {
          class: 'after:hidden px-2 before:hidden bg-primary-light rounded-md text-black text-xs p-1',
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'text-primary-main cursor-pointer hover:text-primary-dark',
        },
      }),
      BlockQuote,
    ],
    content,
    editable: false,
  });

  return (
    <div className="prose">
      <EditorContent editor={editor} />
    </div>
  );
}
