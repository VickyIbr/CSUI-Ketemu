import { Link } from "react-router-dom"

interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  coverUrl?: string
  createdAt: string
}

interface PostListProps {
  posts: Post[]
  limit?: number
}

export function PostList({ posts, limit }: PostListProps) {
  const displayed = limit ? posts.slice(0, limit) : posts

  if (displayed.length === 0) {
    return (
      <div className="text-center py-8 text-ink-soft">
        <p>Belum ada postingan</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {displayed.map((post) => (
        <Link
          key={post.id}
          to={`/posts/${post.slug}`}
          className="block border border-line rounded-lg overflow-hidden hover:border-line-strong transition"
        >
          <div className="aspect-video bg-muted flex items-center justify-center text-ink-soft">
            {post.coverUrl ? (
              <img src={post.coverUrl} alt={post.title} className="w-full h-full object-cover" />
            ) : (
              <span>Cover</span>
            )}
          </div>
          <div className="p-4">
            <h4 className="font-bold text-ink">{post.title}</h4>
            <p className="text-sm text-ink-soft mt-1">{post.excerpt}</p>
            <p className="text-xs text-ink-soft mt-2">
              {new Date(post.createdAt).toLocaleDateString("id-ID")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
