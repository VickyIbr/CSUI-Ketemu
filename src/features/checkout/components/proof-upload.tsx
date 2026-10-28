import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"

interface ProofUploadProps {
  onUpload: (file: File) => void
  uploadedFile?: File | null
  onRemove?: () => void
  maxSize?: number
}

export function ProofUpload({
  onUpload,
  uploadedFile,
  onRemove,
  maxSize = 5 * 1024 * 1024,
}: ProofUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (file.size > maxSize) return
    onUpload(file)
  }

  return (
    <div className="space-y-3">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
          dragOver ? "border-link bg-link/5" : "border-line"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          const file = e.dataTransfer.files[0]
          if (file) handleFile(file)
        }}
        onClick={() => inputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-ink-soft" />
          <p className="text-sm text-ink-soft">
            {dragOver ? "Drop file here" : "Drag & drop bukti pembayaran"}
          </p>
          <p className="text-xs text-ink-soft">
            atau klik untuk browse (max {maxSize / 1024 / 1024}MB)
          </p>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,application/pdf"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFile(file)
            }}
          />
        </div>
      </div>
      {uploadedFile && (
        <div className="flex items-center gap-3 p-3 bg-muted rounded">
          <img
            src={URL.createObjectURL(uploadedFile)}
            alt="Bukti"
            className="h-16 w-16 object-cover rounded"
          />
          <div className="flex-1 text-sm text-ink-soft">
            {uploadedFile.name} ({Math.round(uploadedFile.size / 1024)}KB)
          </div>
          {onRemove && (
            <button
              onClick={() => {
                onRemove()
                inputRef.current?.click()
              }}
              className="text-ink-soft hover:text-ink"
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
