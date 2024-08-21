'use client';

import React from 'react';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Code from '@tiptap/extension-code'
import Link from '@tiptap/extension-link'
import { Markdown } from 'tiptap-markdown';
import { common, createLowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import BlockQuote from '@tiptap/extension-blockquote'
import './markdown.css'

interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer = ({ content }: MarkdownViewerProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        blockquote:false,
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
        lowlight:createLowlight(common)
      }),
      Code.configure({
        HTMLAttributes: {
          class: 'after:hidden px-2 before:hidden bg-primary-light rounded-md text-black text-xs p-1',
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'text-primary-main cursor-pointer hover:text-primary-dark',
        }
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
};

export default MarkdownViewer;
