import { MapPin, Link as LinkIcon } from "lucide-react"
import { VerifiedBadge } from "@/components/common/verified-badge"

interface ProfileHeaderProps {
  name: string
  headline: string
  bio: string
  location: string
  avatarUrl?: string
  websiteUrl?: string
  isVerified?: boolean
}

export function ProfileHeader({
  name,
  headline,
  bio,
  location,
  avatarUrl,
  websiteUrl,
  isVerified = false,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start">
      <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-ink-soft overflow-hidden">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          name.slice(0, 2).toUpperCase()
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-ink">{name}</h1>
          {isVerified && <VerifiedBadge />}
        </div>
        {headline && <p className="text-ink-soft mt-1">{headline}</p>}
        {bio && <p className="text-sm text-ink mt-3">{bio}</p>}
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-ink-soft">
          {location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {location}
            </span>
          )}
          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-ink"
            >
              <LinkIcon size={14} />
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
