<template>
  <div class="block" style="height: 650px; overflow: auto">
    <h3 style="text-align: center">《故事新编》</h3>
    <el-divider content-position="right">作者：裘沙 王伟君</el-divider>

    <el-carousel height="150px" style="width: 300px; ">
      <el-carousel-item>
        <el-image :src="url[0]" />
      </el-carousel-item>
      <el-carousel-item>
        <el-image :src="url[1]" />
      </el-carousel-item>
      <el-carousel-item>
        <el-image :src="url[2]" />
      </el-carousel-item>
    </el-carousel>
    <p>本书收入鲁迅先生1922年至1935年间创作的小说8篇及序言1篇。
      《故事新编》对神话、传说及历史“只取一点因由，随意点染”，“将古代和现代错综交融”、古为今用，针砭流俗，讽刺世事，批判社会。
      《故事新编》艺术特色鲜明――漫画化的勾勒和速写；夸张手段的巧妙运用；以极省俭的笔墨塑造人物。裘沙和王伟君两位艺术家以毕生精力用画笔“揭示鲁迅思想体系”，
      执著探索，苦心构思，大胆创造，以“理解的准确，表现的深刻，艺术的精湛”再现了鲁迅的世界。
    </p>
    <el-divider content-position="left">章节目录</el-divider>
    <el-tree
      :data="data"
      :props="defaultProps"
      node-key="id"
      :default-expanded-keys="[1, 2, 3]"
      @node-click="handleNodeClick"
    />

  </div>
</template>

<script>
export default {
  name: 'Chapter',
  data() {
    return {
      url: ['https://ywrbyimg.oss-cn-chengdu.aliyuncs.com/img/QQ%E6%88%AA%E5%9B%BE20210712180853.png',
        'https://ywrbyimg.oss-cn-chengdu.aliyuncs.com/img/67052833_p0.jpg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
      data: [{
        id: 1,
        label: '第一集 光明之子',
        children: [{
          label: '第一章 侍从骑士考核'
        }, {
          label: '第二章 神秘的新教官'
        }, {
          label: '第三章 来自地狱的老师？'
        }, {
          label: '第四章 准骑士考核'
        }, {
          label: '第五章 骑士圣山'
        }, {
          label: '第六章 神圣觉醒、光明之子'
        }, {
          label: '第七章 末日与杀戮之'
        }]
      }, {
        id: 2,
        label: '第二集 修罗之徒',
        children: [{
          label: '第八章 圣引灵炉'
        }, {
          label: '第九章 光耀之盾'
        }, {
          label: '第十章 夜修罗'
        }, {
          label: '第十一章 骑士圣山'
        }, {
          label: '第十二章 星耀独角兽'
        }, {
          label: '第十三章 龙皓晨的坐骑伙伴'
        }, {
          label: '第十四章 进化'
        }]
      }, {
        id: 3,
        label: '第三集 龙起扬帆',
        children: [{
          label: '第十五章 入场卷与装备'
        }, {
          label: '第十六章 龙起扬帆'
        }, {
          label: '第十七章 碧绿双刀魔'
        }, {
          label: '第十八章 猎魔团的秘密'
        }, {
          label: '第十九章 神秘的石球'
        }, {
          label: '第二十章 暴力牧师'
        }, {
          label: '第二十一章 初战'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
