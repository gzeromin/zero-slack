const onTest2 = (context) => {
  const { options } = context;
  const { include = [], exclude = []} = options[0] || {};
  return {
    CallExpression: (node) => {

      for(const obj in node.callee) {
        console.log(`1${JSON.stringify(obj)}`);
      }

    },
    Decorator: (node) => {
      console.log(`2${JSON.stringify(node.type)}`);


    },
    AssignmentExpression: (node) => {


      console.log(`3${JSON.stringify(node.left)}`);
      console.log(`4${JSON.stringify(node.right)}`);


    },
    AssignmentPattern: (node) => {


      console.log(`5${JSON.stringify(node.left)}`);
      console.log(`6${JSON.stringify(node.right)}`);


    },
    ArrayExpression: (node) => {


      console.log(`7${JSON.stringify(node.elements)}`);


    },
    ArrayPattern: (node) => {


      console.log(`8${JSON.stringify(node.elements)}`);


    },
    ArrowFunctionExpression: (node) => {


      for(const obj in node.params) {
        console.log(`9${JSON.stringify(obj)}`);
      }
      for(const obj in node.body) {
        console.log(`10${JSON.stringify(obj)}`);
      }


    },
    AwaitExpression: (node) => {


      console.log(`11${JSON.stringify(node.argument)}`);


    },
    BlockStatement: (node) => {


      for(const obj in node.body) {
        console.log(`12${JSON.stringify(obj)}`);
      }


    },
    BinaryExpression: (node) => {


      console.log(`13${JSON.stringify(node.left)}`);
      console.log(`14${JSON.stringify(node.right)}`);

    },
    BreakStatement: (node) => {


      console.log(`15${JSON.stringify(node.label)}`);


    },
    CallExpression: (node) => {


      for(const obj in node.callee) {
        console.log(`16${JSON.stringify(obj)}`);
      }
      console.log(`16node.callee.type: ${node.callee.type}`);
      console.log(`16node.callee.name: ${node.callee.name}`);

      console.log(`17${JSON.stringify(node.arguments)}`);

    },
    CatchClause: (node) => {


      console.log(`18${JSON.stringify(node.param)}`);
      for(const obj in node.body) {
        console.log(`19${JSON.stringify(obj)}`);
      }

    },
    ClassBody: (node) => {


      for(const obj in node.body) {
        console.log(`20${JSON.stringify(obj)}`);
      }


    },
    ClassDeclaration: (node) => {


      for(const obj in node.id) {
        console.log(`21${JSON.stringify(obj)}`);
      }
      console.log(`22${JSON.stringify(node.superClass)}`);
      for(const obj in node.body) {
        console.log(`23${JSON.stringify(obj)}`);
      }

    },
    ClassExpression: (node) => {


      for(const obj in node.id) {
        console.log(`24${JSON.stringify(obj)}`);
      }
      console.log(`25${JSON.stringify(node.superClass)}`);
      for(const obj in node.body) {
        console.log(`26${JSON.stringify(obj)}`);
      }


    },
    ConditionalExpression: (node) => {


      console.log(`27${JSON.stringify(node.test)}`);
      console.log(`28${JSON.stringify(node.consequent)}`);
      console.log(`29${JSON.stringify(node.alternate)}`);

    },
    ContinueStatement: (node) => {


      console.log(`30${JSON.stringify(node.label)}`);


    },
    DebuggerStatement: (node) => {


      for(const obj in node) {
        console.log(`31${JSON.stringify(obj)}`);
      }


    },
    DoWhileStatement: (node) => {


      for(const obj in node.body) {
        console.log(`32${JSON.stringify(obj)}`);
      }
      console.log(`33${JSON.stringify(node.test)}`);

    },
    EmptyStatement: (node) => {


      for(const obj in node) {
        console.log(`34${JSON.stringify(obj)}`);
      }


    },
    ExportAllDeclaration: (node) => {


      for(const obj in node.source) {
        console.log(`35${JSON.stringify(obj)}`);
      }

    },
    ExportDefaultDeclaration: (node) => {


      for(const obj in node.declaration) {
        console.log(`36${JSON.stringify(obj)}`);
      }


    },
    ExportNamedDeclaration: (node) => {


      for(const obj in node.declaration) {
        console.log(`37${JSON.stringify(obj)}`);
      }
      for(const obj in node.declaration.decorators[0].expression) {
        console.log(`37decorators: ${JSON.stringify(obj)}`);
      }
      console.log(`37decorators: ${node.declaration.decorators[0].expression.callee.name}`);
      for(const obj in node.specifiers) {
        console.log(`38${JSON.stringify(obj)}`);
      }
      for(const obj in node.source) {
        console.log(`39${JSON.stringify(obj)}`);
      }

    },
    ExportSpecifier: (node) => {


      console.log(`40${JSON.stringify(node.exported)}`);
      for(const obj in node.local) {
        console.log(`41${JSON.stringify(obj)}`);
      }


    },
    ExpressionStatement: (node) => {


      console.log(`42${JSON.stringify(node.expression)}`);


    },
    ExperimentalRestProperty: (node) => {


      console.log(`43${JSON.stringify(node.argument)}`);


    },
    ExperimentalSpreadProperty: (node) => {


      console.log(`44${JSON.stringify(node.argument)}`);


    },
    ForStatement: (node) => {


      console.log(`45${JSON.stringify(node.init)}`);
      console.log(`46${JSON.stringify(node.test)}`);
      console.log(`47${JSON.stringify(node.update)}`);
      for(const obj in node.body) {
        console.log(`48${JSON.stringify(obj)}`);
      }


    },
    ForInStatement: (node) => {


      console.log(`49${JSON.stringify(node.left)}`);
      console.log(`50${JSON.stringify(node.right)}`);
      for(const obj in node.body) {
        console.log(`51${JSON.stringify(obj)}`);
      }


    },
    ForOfStatement: (node) => {


      console.log(`52${JSON.stringify(node.left)}`);
      console.log(`53${JSON.stringify(node.right)}`);
      for(const obj in node.body) {
        console.log(`54${JSON.stringify(obj)}`);
      }


    },
    FunctionDeclaration: (node) => {


      for(const obj in node.id) {
        console.log(`55${JSON.stringify(obj)}`);
      }
      for(const obj in node.params) {
        console.log(`56${JSON.stringify(obj)}`);
      }
      for(const obj in node.body) {
        console.log(`57${JSON.stringify(obj)}`);
      }


    },
    FunctionExpression: (node) => {


      for(const obj in node.id) {
        console.log(`58${JSON.stringify(obj)}`);
      }
      for(const obj in node.params) {
        console.log(`59${JSON.stringify(obj)}`);
      }
      for(const obj in node.body) {
        console.log(`60${JSON.stringify(obj)}`);
      }


    },
    Identifier: (node) => {


      for(const obj in node) {
        console.log(`61${JSON.stringify(obj)}`);
      }
      console.log(`61node.type: ${node.type}`);
      console.log(`61node.name: ${node.name}`);
    },
    IfStatement: (node) => {


      console.log(`62${JSON.stringify(node.test)}`);
      console.log(`63${JSON.stringify(node.consequent)}`);
      console.log(`64${JSON.stringify(node.alternate)}`);


    },
    ImportDeclaration: (node) => {


      for(const obj in node.specifiers) {
        console.log(`65${JSON.stringify(obj)}`);
      }
      console.log(`65${node.specifiers[0]}`);
      for(const obj in node.source) {
        console.log(`66${JSON.stringify(obj)}`);
      }
      console.log(`66type: ${node.source.type}`);
      console.log(`66value: ${node.source.value}`);
    },
    ImportDefaultSpecifier: (node) => {


      for(const obj in node.local) {
        console.log(`67${JSON.stringify(obj)}`);
      }

    },
    ImportExpression: (node) => {

      for(const obj in node.source) {
        console.log(`68${JSON.stringify(obj)}`);
      }

    },
    ImportNamespaceSpecifier: (node) => {


      for(const obj in node.local) {
        console.log(`69${JSON.stringify(obj)}`);
      }


    },
    ImportSpecifier: (node) => {


      for(const obj in node.imported) {
        console.log(`70${JSON.stringify(obj)}`);
      }
      console.log(`70name: ${node.imported.name}`);
      console.log(`70type: ${node.imported.type}`);
      for(const obj in node.local) {
        console.log(`71${JSON.stringify(obj)}`);
      }
      console.log(`71name: ${node.local.name}`);
      console.log(`71type: ${node.local.type}`);
    },
    JSXAttribute: (node) => {


      console.log(`72${JSON.stringify(node.name)}`);
      for(const obj in node.value) {
        console.log(`73${JSON.stringify(obj)}`);
      }


    },
    JSXClosingElement: (node) => {


      console.log(`74${JSON.stringify(node.name)}`);


    },
    JSXElement: (node) => {


      console.log(`75${JSON.stringify(node.openingElement)}`);
      console.log(`76${JSON.stringify(node.children)}`);
      console.log(`77${JSON.stringify(node.closingElement)}`);


    },
    JSXEmptyExpression: (node) => {


      for(const obj in node) {
        console.log(`78${JSON.stringify(obj)}`);
      }

    },
    JSXExpressionContainer: (node) => {


      console.log(`79${JSON.stringify(node.expression)}`);


    },
    JSXIdentifier: (node) => {


      for(const obj in node) {
        console.log(`80${JSON.stringify(obj)}`);
      }


    },
    JSXMemberExpression: (node) => {


      console.log(`81${JSON.stringify(node.object)}`);
      console.log(`82${JSON.stringify(node.property)}`);


    },
    JSXNamespacedName: (node) => {


      console.log(`83${JSON.stringify(node.namespace)}`);
      console.log(`84${JSON.stringify(node.name)}`);


    },
    JSXOpeningElement: (node) => {


      console.log(`85${JSON.stringify(node.name)}`);
      console.log(`86${JSON.stringify(node.attributes)}`);


    },
    JSXSpreadAttribute: (node) => {


      console.log(`87${JSON.stringify(node.argument)}`);


    },
    JSXText: (node) => {


      for(const obj in node) {
        console.log(`88${JSON.stringify(obj)}`);
      }


    },
    JSXFragment: (node) => {


      console.log(`89${JSON.stringify(node.openingFragment)}`);
      console.log(`90${JSON.stringify(node.children)}`);
      console.log(`91${JSON.stringify(node.closingFragment)}`);


    },
    Literal: (node) => {


      for(const obj in node) {
        console.log(`92${JSON.stringify(obj)}`);
      }


    },
    LabeledStatement: (node) => {


      console.log(`93${JSON.stringify(node.label)}`);
      for(const obj in node.body) {
        console.log(`94${JSON.stringify(obj)}`);
      }


    },
    LogicalExpression: (node) => {


      console.log(`95${JSON.stringify(node.left)}`);
      console.log(`96${JSON.stringify(node.right)}`);


    },
    MemberExpression: (node) => {


      console.log(`97${JSON.stringify(node.object)}`);
      console.log(`98${JSON.stringify(node.property)}`);


    },
    MetaProperty: (node) => {


      console.log(`99${JSON.stringify(node.meta)}`);
      console.log(`100${JSON.stringify(node.property)}`);


    },
    MethodDefinition: (node) => {

      console.log(`101-0accessibility: ${node.accessibility}`);
      console.log(`101-0readonly: ${node.readonly}`);

      for(const obj in node.key) {
        console.log(`101${JSON.stringify(obj)}`);
      }
      console.log(`101node.key.type: ${node.key.type}`);
      console.log(`101node.key.name: ${node.key.name}`);
      console.log(`101node.key.loc: ${node.key.name}`);
      for(const obj in node.value) {
        console.log(`102${JSON.stringify(obj)}`);
      }
      console.log(`102node.key.type: ${node.key.type}`);
      console.log(`102node.key.generator: ${node.key.generator}`);
      console.log(`102node.key.expression: ${node.key.expression}`);
      console.log(`102node.key.async: ${node.key.async}`);
      console.log(`102node.key.params: ${node.key.params}`);
      console.log(`102node.key.loc: ${JSON.stringify(node.key.loc)}`);

    },
    NewExpression: (node) => {


      for(const obj in node.callee) {
        console.log(`103${JSON.stringify(obj)}`);
      }
      console.log(`104${JSON.stringify(node.arguments)}`);


    },
    ObjectExpression: (node) => {


      console.log(`105${JSON.stringify(node.properties)}`);


    },
    ObjectPattern: (node) => {


      console.log(`106${JSON.stringify(node.properties)}`);


    },
    Program: (node) => {


      for(const obj in node.body) {
        console.log(`107${JSON.stringify(obj)}`);
      }


    },
    Property: (node) => {


      for(const obj in node.key) {
        console.log(`108${JSON.stringify(obj)}`);
      }
      for(const obj in node.value) {
        console.log(`109${JSON.stringify(obj)}`);
      }


    },
    RestElement: (node) => {


      console.log(`110${JSON.stringify(node.argument)}`);


    },
    ReturnStatement: (node) => {


      console.log(`111${JSON.stringify(node.argument)}`);


    },
    SequenceExpression: (node) => {


      console.log(`112${JSON.stringify(node.expressions)}`);


    },
    SpreadElement: (node) => {


      console.log(`113${JSON.stringify(node.argument)}`);


    },
    Super: (node) => {


      for(const obj in node) {
        console.log(`114${JSON.stringify(obj)}`);
      }


    },
    SwitchStatement: (node) => {


      console.log(`115${JSON.stringify(node.discriminant)}`);
      console.log(`116${JSON.stringify(node.cases)}`);
      console.log(`116node.cases.name${node.cases.name}`);

    },
    SwitchCase: (node) => {


      console.log(`117${JSON.stringify(node.test)}`);
      console.log(`118${JSON.stringify(node.consequent)}`);


    },
    TaggedTemplateExpression: (node) => {


      console.log(`119${JSON.stringify(node.tag)}`);
      console.log(`120${JSON.stringify(node.quasi)}`);


    },
    TemplateElement: (node) => {


      for(const obj in node) {
        console.log(`121${JSON.stringify(obj)}`);
      }
      console.log(`121node.name${node.name}`);

    },
    TemplateLiteral: (node) => {


      console.log(`122${JSON.stringify(node.quasis)}`);
      console.log(`123${JSON.stringify(node.expressions)}`);


    },
    ThisExpression: (node) => {


      for(const obj in node) {
        console.log(`124${JSON.stringify(obj)}`);
      }


    },
    ThrowStatement: (node) => {


      console.log(`125${JSON.stringify(node.argument)}`);


    },
    TryStatement: (node) => {


      console.log(`126${JSON.stringify(node.block)}`);
      console.log(`127${JSON.stringify(node.handler)}`);
      console.log(`128${JSON.stringify(node.finalizer)}`);


    },
    UnaryExpression: (node) => {


      console.log(`129${JSON.stringify(node.argument)}`);


    },
    UpdateExpression: (node) => {


      console.log(`130${JSON.stringify(node.argument)}`);


    },
    VariableDeclaration: (node) => {


      for(const obj in node.declaration) {
        console.log(`131${JSON.stringify(obj)}`);
      }


    },
    VariableDeclarator: (node) => {


      for(const obj in node.id) {
        console.log(`132${JSON.stringify(obj)}`);
      }
      console.log(`133${JSON.stringify(node.init)}`);


    },
    WhileStatement: (node) => {


      console.log(`134${JSON.stringify(node.test)}`);
      for(const obj in node.body) {
        console.log(`135${JSON.stringify(obj)}`);
      }


    },
    WithStatement: (node) => {


      console.log(`136${JSON.stringify(node.object)}`);
      for(const obj in node.body) {
        console.log(`137${JSON.stringify(obj)}`);
      }


    },
    YieldExpression: (node) => {


      console.log(`138${JSON.stringify(node.argument)}`);


    },
    PropertyDefinition: (node) => {

      for(const obj in node) {
        console.log(`139${JSON.stringify(obj)}`);
      }
      console.log(`139accssibility: ${node.accessibility}`);
      console.log(`139readonly: ${node.readonly}`);


    },
    ClassDecorator: (node) => {

      for(const obj in node) {
        console.log(`140${JSON.stringify(obj)}`);
      }
      //console.log(`139${JSON.stringify(node)}`);


    }
  }
}

module.exports = { onTest2 };
