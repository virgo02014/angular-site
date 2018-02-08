// http://eslint.org/docs/rules/
module.exports = {
    "extends": ["eslint:recommended"],
    "env": {
        "browser": true,
        "commonjs": true,
        "node": true,
        "es6": true,
        "jquery": true
    },
    "parser": "esprima",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "script",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    // "ecmaFeatures": {
    //     "arrowFunctions": true, // lambda表达式
    //     "destructuring": true, // 解构赋值
    //     "classes": true, // class
    //     "defaultParams": true, // http://es6.ruanyifeng.com/#docs/function#函数参数的默认值
    //     "blockBindings": true, // 块级作用域，允许使用let const
    //     "modules": true, // 允许使用模块，模块内默认严格模式
    //     // 允许字面量定义对象时，用表达式做属性名
    //     // http://es6.ruanyifeng.com/#docs/object#属性名表达式
    //     "objectLiteralComputedProperties": true,
    //     // 允许对象字面量方法名简写
    //     /*var o = {
    //         method() {
    //           return "Hello!";
    //         }
    //      };

    //      等同于

    //      var o = {
    //        method: function() {
    //          return "Hello!";
    //        }
    //      };
    //     */
    //     "objectLiteralShorthandMethods": true,
    //     /*
    //       对象字面量属性名简写
    //       var foo = 'bar';
    //       var baz = {foo};
    //       baz // {foo: "bar"}

    //       // 等同于
    //       var baz = {foo: foo};
    //     */
    //     "objectLiteralShorthandProperties": true,
    //     "restParams": true, // http://es6.ruanyifeng.com/#docs/function#rest参数
    //     "spread": true, // http://es6.ruanyifeng.com/#docs/function#扩展运算符
    //     "forOf": true, // http://es6.ruanyifeng.com/#docs/iterator#for---of循环
    //     "generators": true, // http://es6.ruanyifeng.com/#docs/generator
    //     "templateStrings": true, // http://es6.ruanyifeng.com/#docs/string#模板字符串
    //     "superInFunctions": true,

    //     "experimentalObjectRestSpread": true // http://es6.ruanyifeng.com/#docs/object#对象的扩展运算符
    // },
    "installedESLint": true,
    "plugins": [],
    "globals": {
        "$": true,
        "jQuery": true,
        "angular": true,
        "Qiniu": true,
        "laypage": true,
        "createjs": true,
        "WEBSITE_FORM_VALIDATION_RULES": true,
        "App": true,
        "wx": true,
        "Page": true,
        "Vue": true,
        "QRCode": true,
        "echarts": true
    },
    "rules": {
        "semi": "warn",
        "space-infix-ops": "warn",
        "no-console": ["error", { allow: ["warn", "error", "log"] }]
    },
};
