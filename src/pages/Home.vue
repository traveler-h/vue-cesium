<template>
  <div class="body-contener">
    <el-card>
      <div class="left-collapse">
        <el-collapse v-model="data.activeNames" @change="handleChange">
          <el-collapse-item title="base" name="1" class="example-list">
            <el-card class="example-item" v-for="base in data.baseList" :key="base.name"
              @click="changeExample(base.name)">
              <h5>{{ base.name }}</h5>
              <img :src="base.img" :alt="base.name">
            </el-card>
          </el-collapse-item>
          <el-collapse-item title="Feedback" name="2"></el-collapse-item>
          <el-collapse-item title="Efficiency" name="3"></el-collapse-item>
          <el-collapse-item title="Controllability" name="4"></el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
    <component :is="exampleName"></component>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import HelloWorld from '@/examples/base/HelloWorld.vue'
import WaterPlan from '@/examples/base/WaterPlan.vue'
export default {
  components: {
    HelloWorld,
    WaterPlan
  },
  setup() {
    const data = reactive({
      activeNames: ['1'],
      baseList: [
        {
          name: 'HelloWorld',
          img: ''
        },
        {
          name: 'WaterPlan',
          img: ''
        }
      ]
    })
    const exampleName = ref('HelloWorld')
    const handleChange = (val: string[]) => {
      console.log(val)
    }
    const changeExample = (val: string) => {
      exampleName.value = val
    }
    return {
      data,
      exampleName,
      handleChange,
      changeExample
    }
  }
}
</script>

<style lang="scss" scoped>
.body-contener {
  display: flex;
  width: 100%;

  .left-collapse {
    min-width: 300px;
  }

  .example-list {

    ::v-deep .el-collapse-item__content {
      display: flex;
      justify-content: start;
      align-items: center;
      width: 100%;
      flex-wrap: wrap;
    }

    .example-item {
      width: 80px;
      height: 80px;
      margin: 4px;
      cursor: pointer;

      ::v-deep .el-card__body {
        padding: 4px;
      }
    }
  }


}
</style>