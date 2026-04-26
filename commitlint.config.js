export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation
        "style", // Code style (formatting, etc)
        "refactor", // Code refactoring
        "perf", // Performance improvements
        "test", // Adding tests
        "chore", // Maintenance tasks
        "ci", // CI/CD changes
        "build", // Build system changes
        "revert", // Revert previous commit
      ],
    ],

    // Subject line length
    "header-max-length": [2, "always", 72],

    // Body line length
    "body-max-line-length": [2, "always", 100],

    // Subject case (lowercase)
    "subject-case": [2, "always", "lower-case"],

    // No trailing period
    "subject-full-stop": [2, "never", "."],

    // Empty line between subject and body
    "body-leading-blank": [2, "always"],

    // Empty line between body and footer
    "footer-leading-blank": [2, "always"],
  },
};
