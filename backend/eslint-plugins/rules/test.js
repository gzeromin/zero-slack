const onTest = (context) => {
  const { options } = context;
  const { include = [], exclude = []} = options[0] || {};
  return {
    CallExpression: (node) => {

      for(const obj in node.callee) {
        context.report(node, `1${JSON.stringify(obj)}`);
      }

    },
    Decorator: (node) => {
      context.report(node, `2${JSON.stringify(node.type)}`);


    },
    AssignmentExpression: (node) => {


      context.report(node, `3${JSON.stringify(node.left)}`);
      context.report(node, `4${JSON.stringify(node.right)}`);


    },
    AssignmentPattern: (node) => {


      context.report(node, `5${JSON.stringify(node.left)}`);
      context.report(node, `6${JSON.stringify(node.right)}`);


    },
    ArrayExpression: (node) => {


      context.report(node, `7${JSON.stringify(node.elements)}`);


    },
    ArrayPattern: (node) => {


      context.report(node, `8${JSON.stringify(node.elements)}`);


    },
    ArrowFunctionExpression: (node) => {


      for(const obj in node.params) {
        context.report(node, `9${JSON.stringify(obj)}`);
      }
      for(const obj in node.body) {
        context.report(node, `10${JSON.stringify(obj)}`);
      }


    },
    AwaitExpression: (node) => {


      context.report(node, `11${JSON.stringify(node.argument)}`);


    },
    BlockStatement: (node) => {


      for(const obj in node.body) {
        context.report(node, `12${JSON.stringify(obj)}`);
      }


    },
    BinaryExpression: (node) => {


      context.report(node, `13${JSON.stringify(node.left)}`);
      context.report(node, `14${JSON.stringify(node.right)}`);

    },
    BreakStatement: (node) => {


      context.report(node, `15${JSON.stringify(node.label)}`);


    },
    CallExpression: (node) => {


      for(const obj in node.callee) {
        context.report(node, `16${JSON.stringify(obj)}`);
      }
      context.report(node, `16node.callee.type: ${node.callee.type}`);
      context.report(node, `16node.callee.name: ${node.callee.name}`);

      context.report(node, `17${JSON.stringify(node.arguments)}`);

    },
    CatchClause: (node) => {


      context.report(node, `18${JSON.stringify(node.param)}`);
      for(const obj in node.body) {
        context.report(node, `19${JSON.stringify(obj)}`);
      }

    },
    ClassBody: (node) => {


      for(const obj in node.body) {
        context.report(node, `20${JSON.stringify(obj)}`);
      }


    },
    ClassDeclaration: (node) => {


      for(const obj in node.id) {
        context.report(node, `21${JSON.stringify(obj)}`);
      }
      context.report(node, `22${JSON.stringify(node.superClass)}`);
      for(const obj in node.body) {
        context.report(node, `23${JSON.stringify(obj)}`);
      }

    },
    ClassExpression: (node) => {


      for(const obj in node.id) {
        context.report(node, `24${JSON.stringify(obj)}`);
      }
      context.report(node, `25${JSON.stringify(node.superClass)}`);
      for(const obj in node.body) {
        context.report(node, `26${JSON.stringify(obj)}`);
      }


    },
    ConditionalExpression: (node) => {


      context.report(node, `27${JSON.stringify(node.test)}`);
      context.report(node, `28${JSON.stringify(node.consequent)}`);
      context.report(node, `29${JSON.stringify(node.alternate)}`);

    },
    ContinueStatement: (node) => {


      context.report(node, `30${JSON.stringify(node.label)}`);


    },
    DebuggerStatement: (node) => {


      for(const obj in node) {
        context.report(node, `31${JSON.stringify(obj)}`);
      }


    },
    DoWhileStatement: (node) => {


      for(const obj in node.body) {
        context.report(node, `32${JSON.stringify(obj)}`);
      }
      context.report(node, `33${JSON.stringify(node.test)}`);

    },
    EmptyStatement: (node) => {


      for(const obj in node) {
        context.report(node, `34${JSON.stringify(obj)}`);
      }


    },
    ExportAllDeclaration: (node) => {


      for(const obj in node.source) {
        context.report(node, `35${JSON.stringify(obj)}`);
      }

    },
    ExportDefaultDeclaration: (node) => {


      for(const obj in node.declaration) {
        context.report(node, `36${JSON.stringify(obj)}`);
      }


    },
    ExportNamedDeclaration: (node) => {


      for(const obj in node.declaration) {
        context.report(node, `37${JSON.stringify(obj)}`);
      }
      for(const obj in node.declaration.decorators[0].expression) {
        context.report(node, `37decorators: ${JSON.stringify(obj)}`);
      }
      context.report(node, `37decorators: ${node.declaration.decorators[0].expression.callee.name}`);
      for(const obj in node.specifiers) {
        context.report(node, `38${JSON.stringify(obj)}`);
      }
      for(const obj in node.source) {
        context.report(node, `39${JSON.stringify(obj)}`);
      }

    },
    ExportSpecifier: (node) => {


      context.report(node, `40${JSON.stringify(node.exported)}`);
      for(const obj in node.local) {
        context.report(node, `41${JSON.stringify(obj)}`);
      }


    },
    ExpressionStatement: (node) => {


      context.report(node, `42${JSON.stringify(node.expression)}`);


    },
    ExperimentalRestProperty: (node) => {


      context.report(node, `43${JSON.stringify(node.argument)}`);


    },
    ExperimentalSpreadProperty: (node) => {


      context.report(node, `44${JSON.stringify(node.argument)}`);


    },
    ForStatement: (node) => {


      context.report(node, `45${JSON.stringify(node.init)}`);
      context.report(node, `46${JSON.stringify(node.test)}`);
      context.report(node, `47${JSON.stringify(node.update)}`);
      for(const obj in node.body) {
        context.report(node, `48${JSON.stringify(obj)}`);
      }


    },
    ForInStatement: (node) => {


      context.report(node, `49${JSON.stringify(node.left)}`);
      context.report(node, `50${JSON.stringify(node.right)}`);
      for(const obj in node.body) {
        context.report(node, `51${JSON.stringify(obj)}`);
      }


    },
    ForOfStatement: (node) => {


      context.report(node, `52${JSON.stringify(node.left)}`);
      context.report(node, `53${JSON.stringify(node.right)}`);
      for(const obj in node.body) {
        context.report(node, `54${JSON.stringify(obj)}`);
      }


    },
    FunctionDeclaration: (node) => {


      for(const obj in node.id) {
        context.report(node, `55${JSON.stringify(obj)}`);
      }
      for(const obj in node.params) {
        context.report(node, `56${JSON.stringify(obj)}`);
      }
      for(const obj in node.body) {
        context.report(node, `57${JSON.stringify(obj)}`);
      }


    },
    FunctionExpression: (node) => {


      for(const obj in node.id) {
        context.report(node, `58${JSON.stringify(obj)}`);
      }
      for(const obj in node.params) {
        context.report(node, `59${JSON.stringify(obj)}`);
      }
      for(const obj in node.body) {
        context.report(node, `60${JSON.stringify(obj)}`);
      }


    },
    Identifier: (node) => {


      for(const obj in node) {
        context.report(node, `61${JSON.stringify(obj)}`);
      }
      context.report(node, `61node.type: ${node.type}`);
      context.report(node, `61node.name: ${node.name}`);
    },
    IfStatement: (node) => {


      context.report(node, `62${JSON.stringify(node.test)}`);
      context.report(node, `63${JSON.stringify(node.consequent)}`);
      context.report(node, `64${JSON.stringify(node.alternate)}`);


    },
    ImportDeclaration: (node) => {


      for(const obj in node.specifiers) {
        context.report(node, `65${JSON.stringify(obj)}`);
      }
      context.report(node, `65${node.specifiers[0]}`);
      for(const obj in node.source) {
        context.report(node, `66${JSON.stringify(obj)}`);
      }
      context.report(node, `66type: ${node.source.type}`);
      context.report(node, `66value: ${node.source.value}`);
    },
    ImportDefaultSpecifier: (node) => {


      for(const obj in node.local) {
        context.report(node, `67${JSON.stringify(obj)}`);
      }

    },
    ImportExpression: (node) => {

      for(const obj in node.source) {
        context.report(node, `68${JSON.stringify(obj)}`);
      }

    },
    ImportNamespaceSpecifier: (node) => {


      for(const obj in node.local) {
        context.report(node, `69${JSON.stringify(obj)}`);
      }


    },
    ImportSpecifier: (node) => {


      for(const obj in node.imported) {
        context.report(node, `70${JSON.stringify(obj)}`);
      }
      context.report(node, `70name: ${node.imported.name}`);
      context.report(node, `70type: ${node.imported.type}`);
      for(const obj in node.local) {
        context.report(node, `71${JSON.stringify(obj)}`);
      }
      context.report(node, `71name: ${node.local.name}`);
      context.report(node, `71type: ${node.local.type}`);
    },
    JSXAttribute: (node) => {


      context.report(node, `72${JSON.stringify(node.name)}`);
      for(const obj in node.value) {
        context.report(node, `73${JSON.stringify(obj)}`);
      }


    },
    JSXClosingElement: (node) => {


      context.report(node, `74${JSON.stringify(node.name)}`);


    },
    JSXElement: (node) => {


      context.report(node, `75${JSON.stringify(node.openingElement)}`);
      context.report(node, `76${JSON.stringify(node.children)}`);
      context.report(node, `77${JSON.stringify(node.closingElement)}`);


    },
    JSXEmptyExpression: (node) => {


      for(const obj in node) {
        context.report(node, `78${JSON.stringify(obj)}`);
      }

    },
    JSXExpressionContainer: (node) => {


      context.report(node, `79${JSON.stringify(node.expression)}`);


    },
    JSXIdentifier: (node) => {


      for(const obj in node) {
        context.report(node, `80${JSON.stringify(obj)}`);
      }


    },
    JSXMemberExpression: (node) => {


      context.report(node, `81${JSON.stringify(node.object)}`);
      context.report(node, `82${JSON.stringify(node.property)}`);


    },
    JSXNamespacedName: (node) => {


      context.report(node, `83${JSON.stringify(node.namespace)}`);
      context.report(node, `84${JSON.stringify(node.name)}`);


    },
    JSXOpeningElement: (node) => {


      context.report(node, `85${JSON.stringify(node.name)}`);
      context.report(node, `86${JSON.stringify(node.attributes)}`);


    },
    JSXSpreadAttribute: (node) => {


      context.report(node, `87${JSON.stringify(node.argument)}`);


    },
    JSXText: (node) => {


      for(const obj in node) {
        context.report(node, `88${JSON.stringify(obj)}`);
      }


    },
    JSXFragment: (node) => {


      context.report(node, `89${JSON.stringify(node.openingFragment)}`);
      context.report(node, `90${JSON.stringify(node.children)}`);
      context.report(node, `91${JSON.stringify(node.closingFragment)}`);


    },
    Literal: (node) => {


      for(const obj in node) {
        context.report(node, `92${JSON.stringify(obj)}`);
      }


    },
    LabeledStatement: (node) => {


      context.report(node, `93${JSON.stringify(node.label)}`);
      for(const obj in node.body) {
        context.report(node, `94${JSON.stringify(obj)}`);
      }


    },
    LogicalExpression: (node) => {


      context.report(node, `95${JSON.stringify(node.left)}`);
      context.report(node, `96${JSON.stringify(node.right)}`);


    },
    MemberExpression: (node) => {


      context.report(node, `97${JSON.stringify(node.object)}`);
      context.report(node, `98${JSON.stringify(node.property)}`);


    },
    MetaProperty: (node) => {


      context.report(node, `99${JSON.stringify(node.meta)}`);
      context.report(node, `100${JSON.stringify(node.property)}`);


    },
    MethodDefinition: (node) => {

      context.report(node, `101-0accessibility: ${node.accessibility}`);
      context.report(node, `101-0readonly: ${node.readonly}`);

      for(const obj in node.key) {
        context.report(node, `101${JSON.stringify(obj)}`);
      }
      context.report(node, `101node.key.type: ${node.key.type}`);
      context.report(node, `101node.key.name: ${node.key.name}`);
      context.report(node, `101node.key.loc: ${node.key.name}`);
      for(const obj in node.value) {
        context.report(node, `102${JSON.stringify(obj)}`);
      }
      context.report(node, `102node.key.type: ${node.key.type}`);
      context.report(node, `102node.key.generator: ${node.key.generator}`);
      context.report(node, `102node.key.expression: ${node.key.expression}`);
      context.report(node, `102node.key.async: ${node.key.async}`);
      context.report(node, `102node.key.params: ${node.key.params}`);
      context.report(node, `102node.key.loc: ${JSON.stringify(node.key.loc)}`);

    },
    NewExpression: (node) => {


      for(const obj in node.callee) {
        context.report(node, `103${JSON.stringify(obj)}`);
      }
      context.report(node, `104${JSON.stringify(node.arguments)}`);


    },
    ObjectExpression: (node) => {


      context.report(node, `105${JSON.stringify(node.properties)}`);


    },
    ObjectPattern: (node) => {


      context.report(node, `106${JSON.stringify(node.properties)}`);


    },
    Program: (node) => {


      for(const obj in node.body) {
        context.report(node, `107${JSON.stringify(obj)}`);
      }


    },
    Property: (node) => {


      for(const obj in node.key) {
        context.report(node, `108${JSON.stringify(obj)}`);
      }
      for(const obj in node.value) {
        context.report(node, `109${JSON.stringify(obj)}`);
      }


    },
    RestElement: (node) => {


      context.report(node, `110${JSON.stringify(node.argument)}`);


    },
    ReturnStatement: (node) => {


      context.report(node, `111${JSON.stringify(node.argument)}`);


    },
    SequenceExpression: (node) => {


      context.report(node, `112${JSON.stringify(node.expressions)}`);


    },
    SpreadElement: (node) => {


      context.report(node, `113${JSON.stringify(node.argument)}`);


    },
    Super: (node) => {


      for(const obj in node) {
        context.report(node, `114${JSON.stringify(obj)}`);
      }


    },
    SwitchStatement: (node) => {


      context.report(node, `115${JSON.stringify(node.discriminant)}`);
      context.report(node, `116${JSON.stringify(node.cases)}`);
      context.report(node, `116node.cases.name${node.cases.name}`);

    },
    SwitchCase: (node) => {


      context.report(node, `117${JSON.stringify(node.test)}`);
      context.report(node, `118${JSON.stringify(node.consequent)}`);


    },
    TaggedTemplateExpression: (node) => {


      context.report(node, `119${JSON.stringify(node.tag)}`);
      context.report(node, `120${JSON.stringify(node.quasi)}`);


    },
    TemplateElement: (node) => {


      for(const obj in node) {
        context.report(node, `121${JSON.stringify(obj)}`);
      }
      context.report(node, `121node.name${node.name}`);

    },
    TemplateLiteral: (node) => {


      context.report(node, `122${JSON.stringify(node.quasis)}`);
      context.report(node, `123${JSON.stringify(node.expressions)}`);


    },
    ThisExpression: (node) => {


      for(const obj in node) {
        context.report(node, `124${JSON.stringify(obj)}`);
      }


    },
    ThrowStatement: (node) => {


      context.report(node, `125${JSON.stringify(node.argument)}`);


    },
    TryStatement: (node) => {


      context.report(node, `126${JSON.stringify(node.block)}`);
      context.report(node, `127${JSON.stringify(node.handler)}`);
      context.report(node, `128${JSON.stringify(node.finalizer)}`);


    },
    UnaryExpression: (node) => {


      context.report(node, `129${JSON.stringify(node.argument)}`);


    },
    UpdateExpression: (node) => {


      context.report(node, `130${JSON.stringify(node.argument)}`);


    },
    VariableDeclaration: (node) => {


      for(const obj in node.declaration) {
        context.report(node, `131${JSON.stringify(obj)}`);
      }


    },
    VariableDeclarator: (node) => {


      for(const obj in node.id) {
        context.report(node, `132${JSON.stringify(obj)}`);
      }
      context.report(node, `133${JSON.stringify(node.init)}`);


    },
    WhileStatement: (node) => {


      context.report(node, `134${JSON.stringify(node.test)}`);
      for(const obj in node.body) {
        context.report(node, `135${JSON.stringify(obj)}`);
      }


    },
    WithStatement: (node) => {


      context.report(node, `136${JSON.stringify(node.object)}`);
      for(const obj in node.body) {
        context.report(node, `137${JSON.stringify(obj)}`);
      }


    },
    YieldExpression: (node) => {


      context.report(node, `138${JSON.stringify(node.argument)}`);


    },
    PropertyDefinition: (node) => {

      for(const obj in node) {
        context.report(node, `139${JSON.stringify(obj)}`);
      }
      context.report(node, `139accssibility: ${node.accessibility}`);
      context.report(node, `139readonly: ${node.readonly}`);


    },
    ClassDecorator: (node) => {

      for(const obj in node) {
        context.report(node, `140${JSON.stringify(obj)}`);
      }
      //context.report(node, `139${JSON.stringify(node)}`);


    }
  }
}

module.exports = { onTest };
