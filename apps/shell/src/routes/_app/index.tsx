import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/')({
  component: Home,
})

function Home() {
  return (
    <section className="hero">
      <h1>Food that fits you</h1>
      <p>Personalised, allergen-safe meals from restaurants and home-chefs, guided by AI.</p>
      <div className="actions">
        <Link to="/menu" className="button">
          Browse menu
        </Link>
        <Link to="/profile">Set up your wellness profile →</Link>
      </div>
    </section>
  )
}
