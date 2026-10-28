import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ProfileFormProps {
  initialData?: {
    name: string
    headline: string
    bio: string
    location: string
    skills: string[]
  }
  onSave: (data: any) => void
}

export function ProfileForm({ initialData, onSave }: ProfileFormProps) {
  const [name, setName] = useState(initialData?.name || "")
  const [headline, setHeadline] = useState(initialData?.headline || "")
  const [bio, setBio] = useState(initialData?.bio || "")
  const [location, setLocation] = useState(initialData?.location || "")
  const [skills, setSkills] = useState(initialData?.skills || [])
  const [skillInput, setSkillInput] = useState("")

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave({ name, headline, bio, location, skills })
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nama</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="headline">Headline</Label>
        <Input id="headline" value={headline} onChange={(e) => setHeadline(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Lokasi</Label>
        <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Skills</Label>
        <div className="flex gap-2">
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            placeholder="Tambah skill"
          />
          <Button type="button" variant="secondary" onClick={addSkill}>
            Tambah
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-muted rounded text-sm flex items-center gap-1"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-ink-soft hover:text-ink"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      <Button type="submit">Simpan Perubahan</Button>
    </form>
  )
}
