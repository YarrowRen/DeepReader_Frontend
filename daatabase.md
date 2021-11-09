# 深度阅读理解系统数据库设计

## 主要实体类

### 班级数据表: sys_cls
数据类型|数据大小|数据名称|描述|是否主键|外键
---|---|---|---|---|---
int|-|clsId|每个班级唯一标识符，用于确定具体班级|y|n
varchar|50|clsName|班级具体名称，例如：19级计算机科学与技术3班|n|n

### 文章信息表: sys_article
数据类型|数据大小|数据名称|描述|是否主键|外键
---|---|---|---|---|---
int|-|articleId|文章唯一标识符，用于确定具体文章|y|n
varchar|50|articleName|文章或论文名称，例如：《故事新编》，书名号可省略|n|n
varchar|50|author|文章或论文的作者，例如：鲁迅|n|n
varchar|200|articleFilePath|文章的文件保存路径，用于获取原文内容|n|n
varchar|1000|describe|文章简介，文章内容简单描述|n|n
int|-|readingPhase|阅读阶段，0表示课前阅读，1表示课后阅读|n|n
date|-|startDate|阅读任务开始日期|n|n
date|-|endDate|阅读任务结束日期|n|n
int|-|clsId|文章所归属的课程|n|sys_cls.clsId


### 学生信息表: sys_stu
数据类型|数据大小|数据名称|描述|是否主键|外键
---|---|---|---|---|---
int|-|stuId|学生ID，学生的唯一标识符|y|n
varchar|20|stuName|学生姓名|n|n

### 学生班级中间表: sys_stu_cls
数据类型|数据大小|数据名称|描述|是否主键|外键
---|---|---|---|---|---
int|-|clsId|学生所属班级的班级ID|n|sys_cls.clsId
int|-|stuId|学生ID|n|sys_stu.stuId

### KWL策略表格信息表: sys_kwl
数据类型|数据大小|数据名称|描述|是否主键|外键
---|---|---|---|---|---
int|-|stuId|学生ID|n|sys_stu.stuId
int|-|articleId|文章ID|n|sys_article.articleId
JSON|-|preKnown|前期已知信息，类型为JSON格式数组，实例见下方|n|n
JSON|-|question|根据文章简要内容做出的提问，类型为JSON格式数组|n|n
JSON|-|answer|根据文章内容对之前提问做出的回答，类型为JSON格式数组|n|n
int|-|rate|学生对该文章的评分，范围在（1-5）|n|n
varchar|1000|summary|学生阅读后对文章内容进行的总结|n|n




```json
// preKnown
{
"preKnown":[ 
    "这本书是由鲁迅所写", 
    "这本书描述了那个时代发生的特定的事", 
    "这本书的内容很多都贴近我们现在的生活" ]
}

// question
{
    "question":[
        "为什么作者要写这本书",
        "这本书造成了怎样的国际影响"
    ]
}

// answer
{
    "answer":[
        "因为当时的时代背景",
        "对当时的国际环境造成了巨大的影响"
    ]
}

//questionAndAnswer
{
    "questionAndAnswer":[
        ["为什么作者要写这本书","因为当时的时代背景"],
        ["这本书造成了怎样的国际影响","对当时的国际环境造成了巨大的影响"]
    ]
}
```


### 学生深度提问信息表: sys_question
数据类型|数据大小|数据名称|描述|是否主键|外键
---|---|---|---|---|---
int|-|stuId|学生ID|n|sys_stu.stuId
int|-|articleId|文章ID|n|sys_article.articleId
int|-|typeId|问题类型ID|n|sys_question_type.typeId
varchar|100|question|学生所提出的问题|n|n
varchar|100|robotQuestion|机器人所提出的问题|n|n
varchar|200|questionClues|问题的线索|n|n
varchar|100|answer|问题的答案|n|n
int|-|robotRate|学生根据机器人提出的问题给出评价|n|n


### 学生提问类型表: sys_question_type
数据类型|数据大小|数据名称|描述|是否主键|外键
---|---|---|---|---|---
int|-|typeId|问题类型的唯一标识符|y|n
varchar|20|type|问题类型的描述|n|n

![](https://ywrbyimg.oss-cn-chengdu.aliyuncs.com/img/QQ%E6%88%AA%E5%9B%BE20211027203009.png)


1. 查看答案
2. 主页设计
3. BBS论坛界面
4. 评价界面