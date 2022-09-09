const { onFunctionCheckAccModifiersInjectable } = require("./rules/check-access-modifiers-injectable");

module.exports = {
  rules: {
    "check-access-modifiers-injectable": {
      meta: {
        messages: {
          cannotIseAccessModifier: "error",
          remove: "remove this statement",
          addReadonly1: "add readonly after {{accessibility}}",
          addReadonly2: "add readonly before {{name}}"
        },
        hasSuggestions: true
      },
      create: onFunctionCheckAccModifiersInjectable
    }
  }
}