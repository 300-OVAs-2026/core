import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

import type { RichTextEditorProps } from './types/types';

import css from './floating-notes.module.css';
import {
  BlockquoteIcon,
  BoldIcon,
  BulletListIcon,
  HorizontalRuleIcon,
  ItalicIcon,
  NumberedListIcon,
  RedoIcon,
  TextCenterIcon,
  TextEndIcon,
  TextJustifyIcon,
  TextStartIcon,
  UnderlineIcon,
  UndoIcon
} from './notes-icons';

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        },
        code: false,
        codeBlock: false,
        horizontalRule: {},
        blockquote: {}
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'blockquote'],
        alignments: ['left', 'center', 'right', 'justify']
      })
    ],
    content,
    editorProps: {
      attributes: {
        class: css['fn-editor-content']
      }
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    }
  });

  useEffect(() => {
    if (editor && content && JSON.stringify(editor.getJSON()) !== JSON.stringify(content)) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={css['fn-rich-text-editor']}>
      <div className={css['fn-editor-toolbar']}>
        {/* Selector de tamaño de texto */}
        <select
          className={css['fn-toolbar-select']}
          onChange={(e) => {
            const value = e.target.value;
            if (value === 'p') {
              editor.chain().focus().setParagraph().run();
            } else {
              editor
                .chain()
                .focus()
                .toggleHeading({ level: parseInt(value) as 1 | 2 | 3 })
                .run();
            }
          }}
          value={
            editor.isActive('heading', { level: 1 })
              ? '1'
              : editor.isActive('heading', { level: 2 })
                ? '2'
                : editor.isActive('heading', { level: 3 })
                  ? '3'
                  : 'p'
          }
          aria-label="Tamaño de texto">
          <option value="p">Párrafo</option>
          <option value="1">Título 1</option>
          <option value="2">Título 2</option>
          <option value="3">Título 3</option>
        </select>

        <span className={css['fn-toolbar-divider']} />

        {/* Formato de texto */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive('bold') ? css['is-active'] : ''}`}
          aria-label="Negrita"
          title="Negrita">
          <BoldIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive('italic') ? css['is-active'] : ''}`}
          aria-label="Cursiva"
          title="Cursiva">
          <ItalicIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive('underline') ? css['is-active'] : ''}`}
          aria-label="Subrayado"
          title="Subrayado">
          <UnderlineIcon />
        </button>

        <span className={css['fn-toolbar-divider']} />

        {/* Alineación de texto */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive({ textAlign: 'left' }) ? css['is-active'] : ''}`}
          aria-label="Alinear a la izquierda"
          title="Izquierda">
          <TextStartIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive({ textAlign: 'center' }) ? css['is-active'] : ''}`}
          aria-label="Centrar"
          title="Centrar">
          <TextCenterIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive({ textAlign: 'right' }) ? css['is-active'] : ''}`}
          aria-label="Alinear a la derecha"
          title="Derecha">
          <TextEndIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive({ textAlign: 'justify' }) ? css['is-active'] : ''}`}
          aria-label="Justificar"
          title="Justificar">
          <TextJustifyIcon />
        </button>

        <span className={css['fn-toolbar-divider']} />

        {/* Listas */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive('bulletList') ? css['is-active'] : ''}`}
          aria-label="Lista con viñetas"
          title="Lista">
          <BulletListIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive('orderedList') ? css['is-active'] : ''}`}
          aria-label="Lista numerada"
          title="Numerada">
          <NumberedListIcon />
        </button>

        <span className={css['fn-toolbar-divider']} />

        {/* Blockquote y Linea horizontal */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive('blockquote') ? css['is-active'] : ''}`}
          aria-label="Cita"
          title="Cita">
          <BlockquoteIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={css['fn-toolbar-button']}
          aria-label="Línea horizontal"
          title="Línea">
          <HorizontalRuleIcon />
        </button>

        <span className={css['fn-toolbar-divider']} />

        {/* Undo y Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={css['fn-toolbar-button']}
          aria-label="Deshacer"
          title="Deshacer">
          <UndoIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={css['fn-toolbar-button']}
          aria-label="Rehacer"
          title="Rehacer">
          <RedoIcon />
        </button>
      </div>
      <EditorContent editor={editor} placeholder={placeholder} />
    </div>
  );
};
