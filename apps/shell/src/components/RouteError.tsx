/** Shown when a page fails — most often because a micro frontend's server is down */
export function RouteError() {
  return (
    <div className="route-error">
      <h2>This section is unavailable right now</h2>
      <p>Please try again in a moment.</p>
    </div>
  )
}
