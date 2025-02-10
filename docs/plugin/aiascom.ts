
import  MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import fs from 'fs'
import path from 'path'

export const aiascom = (md)=>{
    console.log(md)

    // 编写自定义模块
    // 第一个参数是容器
    md.use(mdContainer,'div',{
        validate:(params) => params.trim().match(/^demo\s*(.*)$/),  //匹配
        render(tokens,index){
            const sourceFile = tokens[index + 2]
            let source;
            if(sourceFile && sourceFile.type == 'inline'){
                // console.log(sourceFile.content)
                source = fs.readFileSync(path.resolve(__dirname,`../examples/${sourceFile.content}.vue`))
            }

            return source
        }
    })
}