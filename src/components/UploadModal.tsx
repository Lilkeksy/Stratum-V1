import { FileText, UploadCloud, X } from 'lucide-react'
import { useRef, useState } from 'react'

export function UploadModal({ open, onClose, onUploaded }: {
  open: boolean
  onClose: () => void
  onUploaded: (name: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  if (!open) return null

  const close = () => { setFile(null); setDragging(false); onClose() }
  const upload = () => {
    if (!file) return
    onUploaded(file.name)
    close()
  }

  return (
    <div className="modal-backdrop upload-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close() }}>
      <section className="modal upload-modal" role="dialog" aria-modal="true" aria-labelledby="upload-title">
        <div className="modal__header"><div><span className="section-label">Policy library</span><h2 id="upload-title">Upload Policy</h2><p>Upload a photo or document of a policy — screenshots, PDFs, or files shared from a browser.</p></div><button onClick={close} aria-label="Close upload"><X size={18} /></button></div>
        <button
          className={`upload-dropzone ${dragging ? 'upload-dropzone--active' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => { event.preventDefault(); setDragging(false); setFile(event.dataTransfer.files[0] || null) }}
        >
          {file ? <><span className="upload-file-icon"><FileText size={28} /></span><strong>{file.name}</strong><small>{Math.max(1, Math.round(file.size / 1024))} KB · Ready to upload</small></> : <><span className="upload-file-icon"><UploadCloud size={28} /></span><strong>Drag and drop a file here, or click to browse</strong><small>Supports JPG, PNG, PDF, DOCX · up to 25MB</small></>}
        </button>
        <input ref={inputRef} className="sr-only" type="file" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt" onChange={(event) => setFile(event.target.files?.[0] || null)} />
        <div className="modal__actions"><button className="secondary-button" onClick={close}>Cancel</button><button className="primary-button" disabled={!file} onClick={upload}>Upload policy</button></div>
      </section>
    </div>
  )
}
