import { useState } from "react"
import { Upload } from "lucide-react"

interface QrisPanelProps {
  amount: number
  orderId: string
}

export function QrisPanel({ amount, orderId }: QrisPanelProps) {
  const [dragOver, setDragOver] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border-2 border-dashed border-line bg-muted/30 p-8 text-center">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="mx-auto"
        >
          <rect x="10" y="10" width="100" height="100" rx="8" fill="#fff" stroke="#1d3fd1" strokeWidth="4" />
          <rect x="30" y="30" width="60" height="60" rx="4" fill="#1d3fd1" />
          <text x="60" y="68" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="bold" fontFamily="monospace">
            QRIS
          </text>
          <text x="60" y="92" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="monospace">
            {amount.toLocaleString("id-ID")}
          </text>
        </svg>
        <p className="mt-4 text-sm text-ink-soft">
          Scan QR code menggunakan aplikasi e-wallet atau QRIS
        </p>
        <code className="mt-2 block text-xs text-ink-soft font-mono bg-muted px-2 py-1 rounded">
          {orderId}
        </code>
      </div>

      <h4 className="font-medium text-ink">Upload Bukti Pembayaran</h4>
      <div
        className="border-2 border-dashed border-line rounded-lg p-8 text-center cursor-pointer transition hover:border-ink"
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          const file = e.dataTransfer.files[0]
          if (file) handleFile(file)
        }}
      >
        <Upload className="mx-auto text-ink-soft h-8 w-8" />
        <p className="mt-2 text-sm text-ink-soft">
          {dragOver ? "Drop file here" : "Drag & drop bukti pembayaran atau click to upload"}
        </p>
        <p className="mt-1 text-xs text-ink-soft">
          Format: JPG, PNG, PDF | Maks: 5MB
        </p>
        {previewUrl && (
          <img src={previewUrl} alt="Preview" className="mt-4 max-h-40 rounded" />
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,application/pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
      </div>

      <div className="text-xs text-ink-soft space-y-1">
        <p>1. Lakukan pembayaran via QRIS / e-wallet</p>
        <p>2. Upload bukti pembayaran di atas</p>
        <p>3. Tunggu verifikasi admin (maks 1x24 jam)</p>
      </div>
    </div>
  )
}
