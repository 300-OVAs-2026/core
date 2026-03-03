/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import type { Note } from '../types/types';

// Variables de color
const COLORS = {
  // Colores Primarios
  primary: '#00294a',
  primaryHover: '#003d6b',

  // Colores de Fondo
  bgWhite: '#ffffff',
  bgGray50: '#f9fafb',
  bgGray100: '#f7f7f7',
  bgGray200: '#e7e7e7',

  // Colores de Texto
  textDark: '#1f2937',
  textMedium: '#374151',
  textGray: '#6b7280',
  textLight: '#9ca3af',

  // Colores de Borde
  borderGray: '#e5e7eb',
  borderMedium: '#d1d5db',
  borderDark: '#9ca3af',
  borderBlockquote: '#676767'
};

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.6
  },
  header: {
    marginBottom: 30,
    borderBottom: `3pt solid ${COLORS.textDark}`,
    paddingBottom: 15
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 10,
    color: COLORS.textGray,
    textAlign: 'center'
  },
  noteSection: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: COLORS.bgGray50,
    borderRadius: 8,
    border: `1pt solid ${COLORS.borderGray}`
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 8
  },
  noteDate: {
    fontSize: 9,
    color: COLORS.textGray,
    marginBottom: 12
  },
  capturedTextContainer: {
    backgroundColor: COLORS.bgWhite,
    borderLeft: `4pt solid ${COLORS.borderDark}`,
    padding: 10,
    marginVertical: 10
  },
  capturedTextLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.textGray,
    marginBottom: 5
  },
  capturedText: {
    fontSize: 10,
    color: COLORS.textMedium,
    fontStyle: 'italic'
  },
  contentContainer: {
    marginTop: 10
  },
  paragraph: {
    marginBottom: 8,
    color: COLORS.textMedium
  },
  heading1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginTop: 15,
    marginBottom: 8
  },
  heading2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginTop: 12,
    marginBottom: 6
  },
  heading3: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.textMedium,
    marginTop: 10,
    marginBottom: 5
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 4
  },
  listBullet: {
    width: 15,
    color: COLORS.textGray
  },
  listItemContent: {
    flex: 1,
    color: COLORS.textMedium
  },
  blockquote: {
    borderLeft: `3pt solid ${COLORS.borderBlockquote}`,
    paddingLeft: 10,
    marginVertical: 10,
    color: COLORS.textMedium,
    fontStyle: 'italic'
  },
  horizontalRule: {
    borderBottom: `2pt solid ${COLORS.borderGray}`,
    marginVertical: 12
  },
  bold: {
    fontWeight: 'bold'
  },
  italic: {
    fontStyle: 'italic'
  },
  code: {
    fontFamily: 'Courier',
    backgroundColor: COLORS.bgGray100,
    padding: 2,
    fontSize: 10
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: COLORS.textGray
  }
});

interface NotePDFDocumentProps {
  notes: Note[];
  pageTitle?: string;
}

/**
 * Mapea un nodo de Tiptap a componentes de react-pdf
 */
const renderTiptapNode = (node: any, key: number): JSX.Element | null => {
  if (!node) return null;

  // Nodo de texto
  if (node.type === 'text') {
    let textStyle: any = {};

    // Aplicar estilos de marca
    if (node.marks) {
      node.marks.forEach((mark: any) => {
        if (mark.type === 'bold') textStyle = { ...textStyle, ...styles.bold };
        if (mark.type === 'italic') textStyle = { ...textStyle, ...styles.italic };
        if (mark.type === 'code') textStyle = { ...textStyle, ...styles.code };
      });
    }

    return (
      <Text key={key} style={textStyle}>
        {node.text}
      </Text>
    );
  }

  // Nodo de párrafo
  if (node.type === 'paragraph') {
    return (
      <View key={key} style={styles.paragraph}>
        {node.content?.map((child: any, idx: number) => renderTiptapNode(child, idx))}
      </View>
    );
  }

  // Nodos de encabezado
  if (node.type === 'heading') {
    const level = node.attrs?.level || 1;
    const headingStyle = level === 1 ? styles.heading1 : level === 2 ? styles.heading2 : styles.heading3;

    return (
      <View key={key} style={headingStyle}>
        {node.content?.map((child: any, idx: number) => renderTiptapNode(child, idx))}
      </View>
    );
  }

  // Lista ordenada o desordenada
  if (node.type === 'bulletList' || node.type === 'orderedList') {
    return (
      <View key={key}>
        {node.content?.map((listItem: any, idx: number) => (
          <View key={idx} style={styles.listItem}>
            <Text style={styles.listBullet}>{node.type === 'bulletList' ? '•' : `${idx + 1}.`}</Text>
            <View style={styles.listItemContent}>
              {listItem.content?.map((child: any, childIdx: number) => renderTiptapNode(child, childIdx))}
            </View>
          </View>
        ))}
      </View>
    );
  }

  // Elemento de lista
  if (node.type === 'listItem') {
    return <View key={key}>{node.content?.map((child: any, idx: number) => renderTiptapNode(child, idx))}</View>;
  }

  // Cita en bloque
  if (node.type === 'blockquote') {
    return (
      <View key={key} style={styles.blockquote}>
        {node.content?.map((child: any, idx: number) => renderTiptapNode(child, idx))}
      </View>
    );
  }

  // Línea horizontal
  if (node.type === 'horizontalRule') {
    return <View key={key} style={styles.horizontalRule} />;
  }

  // Bloque de código
  if (node.type === 'codeBlock') {
    return (
      <View key={key} style={styles.code}>
        {node.content?.map((child: any, idx: number) => renderTiptapNode(child, idx))}
      </View>
    );
  }

  // Salto de línea
  if (node.type === 'hardBreak') {
    return <Text key={key}>{'\n'}</Text>;
  }

  // Renderizar contenido de nodos desconocidos
  if (node.content) {
    return <View key={key}>{node.content.map((child: any, idx: number) => renderTiptapNode(child, idx))}</View>;
  }

  return null;
};

/**
 * Componente de documento PDF para notas
 */
export const NotePDFDocument: React.FC<NotePDFDocumentProps> = ({ notes, pageTitle = 'Mis Notas' }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.mainTitle}>{pageTitle}</Text>
          <Text style={styles.subtitle}>
            {notes.length} {notes.length === 1 ? 'nota' : 'notas'}
          </Text>
        </View>

        {/* Notas */}
        {notes.map((note) => (
          <View key={note.id} style={styles.noteSection} wrap={false}>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteDate}>
              {new Date(note.timestamp).toLocaleString('es-ES', {
                dateStyle: 'full',
                timeStyle: 'short'
              })}
            </Text>

            {/* Texto capturado */}
            {note.selectedText && (
              <View style={styles.capturedTextContainer}>
                <Text style={styles.capturedTextLabel}>Texto capturado:</Text>
                <Text style={styles.capturedText}>"{note.selectedText}"</Text>
              </View>
            )}

            {/* Contenido de la nota */}
            <View style={styles.contentContainer}>
              {note.content?.content?.map((node: any, idx: number) => renderTiptapNode(node, idx))}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};
