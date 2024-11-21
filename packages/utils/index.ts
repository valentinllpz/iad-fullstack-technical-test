/**
 * Combines multiple class names into a single string, filtering out any falsy values.
 *
 * @param {...string[]} classes - The class names to combine.
 * @returns {string} The combined class names as a single string.
 */
export function classnames(
  ...args: (string | undefined | null | false | Record<string, boolean>)[]
) {
  return args
    .filter(<T>(v: T | boolean | null | undefined): v is T => Boolean(v))
    .map((arg) => {
      if (typeof arg === "string") {
        return arg;
      }
      return Object.keys(arg)
        .filter((key) => arg[key])
        .join(" ");
    })
    .join(" ");
}
