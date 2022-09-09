const ACCESS_MODIFIERS = [
  "private",
  "public",
  "protected"
];

const onFunctionCheckAccModifiersInjectable = (context) => {
  const sourceCode = context.getSourceCode().getText();
  const isInjectable = sourceCode.indexOf("@Injectable()") >= 0;
  return {
    PropertyDefinition: (node) => {
      const accessibility = node.accessibility;
      const start = node.range[0];
      const end = accessibility ? start + accessibility.length : start;
      const insertRange = [start, end];

      if (isInjectable && !node.readonly) {
        if(ACCESS_MODIFIERS.includes(accessibility)) {
          context.report({
            node: node,
            messageId: "cannnotUseAccessModifier",
            suggest: [
              {
                messageId: "remove",
                fix: function(fixer) {
                  return fixer.removeRange(node.range);
                }
              },
              {
                messageId: "addReadonly1",
                data: { accessibility },
                fix: function(fixer) {
                  return fixer.insertTextAfterRange(insertRange, " readonly")
                }
              }
            ]
          });
        } else {
          context.report({
            node: node,
            messageId: "cannnotUseAccessModifier",
            suggest: [
              {
                messageId: "remove",
                fix: function(fixer) {
                  return fixer.removeRange(node.range);
                }
              },
              {
                messageId: "addReadonly2",
                data: { name: node.key.name },
                fix: function(fixer) {
                  return fixer.insertTextAfterRange(insertRange, "readonly ")
                }
              }
            ]
          });
        }
      }
    }
  }
}

module.exports = { onFunctionCheckAccModifiersInjectable };