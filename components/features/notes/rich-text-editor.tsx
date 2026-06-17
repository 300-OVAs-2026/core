import { useEffect } from 'react';

import { useOvaStore } from '@/store/ova-store';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { i18nNotes } from './lib/constants';
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

import type { RichTextEditorProps } from './types/types';

import css from './floating-notes.module.css';

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, placeholder }) => {
  const lang = useOvaStore((state) => state.lang);
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
          aria-label={i18nNotes[lang].textSizeLabel}>
          <option value="p">{i18nNotes[lang].paragraph}</option>
          <option value="1">{i18nNotes[lang].heading1}</option>
          <option value="2">{i18nNotes[lang].heading2}</option>
          <option value="3">{i18nNotes[lang].heading3}</option>
        </select>

        <span className={css['fn-toolbar-divider']} />

        {/* Formato de texto */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive('bold') ? css['is-active'] : ''}`}
          aria-label={i18nNotes[lang].bold}
          title={i18nNotes[lang].bold}>
          <BoldIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive('italic') ? css['is-active'] : ''}`}
          aria-label={i18nNotes[lang].italic}
          title={i18nNotes[lang].italic}>
          <ItalicIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive('underline') ? css['is-active'] : ''}`}
          aria-label={i18nNotes[lang].underline}
          title={i18nNotes[lang].underline}>
          <UnderlineIcon />
        </button>

        <span className={css['fn-toolbar-divider']} />

        {/* Alineación de texto */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive({ textAlign: 'left' }) ? css['is-active'] : ''}`}
          aria-label={i18nNotes[lang].alignLeft}
          title={i18nNotes[lang].alignLeftTitle}>
          <TextStartIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive({ textAlign: 'center' }) ? css['is-active'] : ''}`}
          aria-label={i18nNotes[lang].alignCenter}
          title={i18nNotes[lang].alignCenter}>
          <TextCenterIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive({ textAlign: 'right' }) ? css['is-active'] : ''}`}
          aria-label={i18nNotes[lang].alignRight}
          title={i18nNotes[lang].alignRightTitle}>
          <TextEndIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive({ textAlign: 'justify' }) ? css['is-active'] : ''}`}
          aria-label={i18nNotes[lang].alignJustify}
          title={i18nNotes[lang].alignJustify}>
          <TextJustifyIcon />
        </button>

        <span className={css['fn-toolbar-divider']} />

        {/* Listas */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive('bulletList') ? css['is-active'] : ''}`}
          aria-label={i18nNotes[lang].bulletList}
          title={i18nNotes[lang].bulletListTitle}>
          <BulletListIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive('orderedList') ? css['is-active'] : ''}`}
          aria-label={i18nNotes[lang].orderedList}
          title={i18nNotes[lang].orderedListTitle}>
          <NumberedListIcon />
        </button>

        <span className={css['fn-toolbar-divider']} />

        {/* Blockquote y Linea horizontal */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${css['fn-toolbar-button']} ${editor.isActive('blockquote') ? css['is-active'] : ''}`}
          aria-label={i18nNotes[lang].blockquote}
          title={i18nNotes[lang].blockquote}>
          <BlockquoteIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={css['fn-toolbar-button']}
          aria-label={i18nNotes[lang].horizontalRule}
          title={i18nNotes[lang].horizontalRuleTitle}>
          <HorizontalRuleIcon />
        </button>

        <span className={css['fn-toolbar-divider']} />

        {/* Undo y Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={css['fn-toolbar-button']}
          aria-label={i18nNotes[lang].undo}
          title={i18nNotes[lang].undo}>
          <UndoIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={css['fn-toolbar-button']}
          aria-label={i18nNotes[lang].redo}
          title={i18nNotes[lang].redo}>
          <RedoIcon />
        </button>
      </div>
      <EditorContent editor={editor} placeholder={placeholder} />
    </div>
  );
};
