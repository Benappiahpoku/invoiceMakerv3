/**
 * Safely parses JSON data with type checking and fallbacks
 * @param input - The input string to parse
 * @param fallback - Default value if parsing fails
 * @returns Parsed data or fallback value
 */
export function safeJsonParse<T>(input: string | null | undefined, fallback: T): T {
  if (!input || input === 'undefined') return fallback
  try {
    return JSON.parse(input) as T
  } catch {
    return fallback
  }
}