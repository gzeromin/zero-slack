const utils = require("eslint-utils");

const ACCESS_MODIFIERS = [
  "private",
  "public"
]

const onAccessTest = (context) => {
  const sourceCode = context.getSourceCode().getText();
  const isInjectable =
    sourceCode.indexOf("import { Injectable } from '@nestjs/common'") >= 0 ||
    sourceCode.indexOf("@Injectable()") >= 0;

  return {

    MethodDefinition: (node) => {

      // for(const obj in node) {
      //   context.report(node, `101${JSON.stringify(obj)}`);
      // }
      // context.report(node, `isInjectable: ${isInjectable}`);

      // context.report(node, `101node.key.name: ${node.key.name}`);
      // context.report(node, `101accessibility: ${node.accessibility}`);
      // context.report(node, `101readonly: ${node.readonly}`);
      const character = node.key.name;
      const range = node.range;
      if(isInjectable &&
        ACCESS_MODIFIERS.includes(node.accessibility) &&
        !node.readonly
      ) {
        context.report({
          node: node,
          messageId: "unnecessaryEscape",
          data: { character }, // data for the unnecessaryEscape overall message
          suggest: [
            {
              messageId: "removeEscape",
              data: { character }, // data for the removeEscape suggestion message
              fix: function(fixer) {
                  return fixer.removeRange(range);
              }
            }
          ]
        });
      }
    },
    TSParameterProperty: (node) => {

      // for(const obj in node) {
      //   context.report(node, `111${JSON.stringify(obj)}`);
      // }

      // context.report(node, `111node.parameter.name: ${node.parameter.name}`);
      // context.report(node, `111accessibility: ${node.accessibility}`);
      // context.report(node, `111readonly: ${node.readonly}`);
      const character = node.parameter.name;
      const range = node.range;
      if(isInjectable &&
        ACCESS_MODIFIERS.includes(node.accessibility) &&
        !node.readonly
      ) {
        context.report({
          node: node,
          messageId: "unnecessaryEscape",
          data: { character }, // data for the unnecessaryEscape overall message
          suggest: [
            {
                messageId: "removeEscape",
                data: { character }, // data for the removeEscape suggestion message
                fix: function(fixer) {
                    return fixer.removeRange(range);
                }
            }
          ]
        });
      }
    },
    PropertyDefinition: (node) => {

      // for(const obj in node) {
      //   context.report(node, `139${JSON.stringify(obj)}`);
      // }
      // context.report(node, `139node.key.name: ${node.key.name}`);

      // context.report(node, `139accssibility: ${node.accessibility}`);
      // context.report(node, `139readonly: ${node.readonly}`);
      const character = node.key.name;
      const range = node.range;
      if(isInjectable &&
        ACCESS_MODIFIERS.includes(node.accessibility) &&
        !node.readonly
      ) {
        context.report({
          node: node,
          messageId: "unnecessaryEscape",
          data: { character }, // data for the unnecessaryEscape overall message
          suggest: [
            {
              messageId: "removeEscape",
              data: { character }, // data for the removeEscape suggestion message
              fix: function(fixer) {
                  return fixer.removeRange(range);
              }
            }
          ]
        });
      }

    },
  }
}

module.exports = { onAccessTest };
