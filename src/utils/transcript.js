// Transcripts are written as plain Markdown: turns separated by `---`, each
// opening with a bold speaker label. The first chunk carries no label and is
// the intro; later unlabelled chunks are stage notes.
export function parseTranscript(body) {
  return body
    .split(/^---$/m)
    .map(chunk => chunk.trim())
    .filter(Boolean)
    .map(chunk => {
      const [, speaker, content] = chunk.match(/^\*\*(.+?):\*\*([\s\S]*)$/) || []
      return speaker ? { speaker, content: content.trim() } : { content: chunk }
    })
}
