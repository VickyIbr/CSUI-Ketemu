import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

interface PostEditorProps {
  initialData?: { title: string; excerpt: string; content: string; coverUrl?: string; status: "draft" | "published" }
  onSave: (data: any) => void
  onDelete?: () => void
}

export function PostEditor({ initialData, onSave, onDelete }: PostEditorProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [coverUrl, setCoverUrl] = useState(initialData?.coverUrl || "")
  const [status, setStatus] = useState<"draft" | "published">(initialData?.status || "draft")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave({ title, excerpt, content, coverUrl, status })
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="title">Judul</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Input id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Isi</Label>
        <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={10} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="coverUrl">Cover URL</Label>
        <Input id="coverUrl" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "draft" | "published")}
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <div className="flex gap-2">
        <Button type="submit">Simpan</Button>
        {onDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Hapus</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Hapus postingan?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tindakan ini tidak dapat dibatalkan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>Hapus</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </form>
  )
}
