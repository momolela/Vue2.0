module.exports = {
  /**
   * avoid - 格式化结果为 : x => x
   * always - 格式化结果为 : (x) => x
   */
  arrowParens: 'always',
  // 花括号前后空格
  bracketSpacing: true,
  /**
   * auto
   * \n
   * \r\n
   * \r
   */
  endOfLine: 'auto',
  // 解决 > 跑到下一行的问题
  htmlWhitespaceSensitivity: 'ignore',
  // 不插入 @format
  insertPragma: false,
  jsxBracketSameLine: true,
  jsxSingleQuote: true,
  // 超过 1000 换行
  printWidth: 1000,
  /**
   * markdown 文本超过 printWidth 的值时
   * always
   * never
   * preserve
   */
  proseWrap: 'never',
  /**
   * 对象的 key 是否用引号括起来，有三种选项
   * as-needed
   * consistent
   * preserve
   */
  quoteProps: 'preserve',
  // 若为true，文件顶部加了 /*** @prettier */或/*** @format */的文件才会被格式化
  requirePragma: false,
  // 句尾添加分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 缩进字节数
  tabWidth: 2,
  /**
   * 在对象或数组最后一个元素后面是否加逗号
   * none
   * es5
   * all
   */
  trailingComma: 'none',
  // 缩进不使用tab，使用空格
  useTabs: false,
  // 是否给vue中的 <script> and <style>标签加缩进
  vueIndentScriptAndStyle: true,
  /**
   * 是否格式化嵌入到JS中的html标记的代码段或者Markdown语法
   * auto-格式化
   * off-不格式化
   */
  embeddedLanguageFormatting: 'auto'
};
