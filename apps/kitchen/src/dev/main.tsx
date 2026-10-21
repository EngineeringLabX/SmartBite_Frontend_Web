// Async boundary: Module Federation must set up shared React before any of it is imported.
// Importing the app directly here crashes react-dom ("Cannot read properties of undefined").
import('./bootstrap')
