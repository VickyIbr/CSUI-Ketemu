import { Album, BookOpen, ClipboardCheck, Megaphone, Users, Zap } from "lucide-react"

const CategoryIcons: Record<string, React.ElementType> = {
  Course: BookOpen,
  Workshop: ClipboardCheck,
  Seminar: Megaphone,
  Kompetisi: Zap,
  Bootcamp: Zap,
  Webinar: Users,
}

export function CategoryIcon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const Icon = CategoryIcons[name] || Album
  return <Icon className={className} />
}
