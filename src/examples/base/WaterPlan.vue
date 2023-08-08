<template>
  <div class="main-container">
    <div id="cesiumContainer">
    </div>
    <div class="operationBtn">
      <el-form label-width="120px" label-position="left" size="mini">
        <el-form-item label="基础颜色">
          <el-color-picker v-model="data.baseWaterColor" show-alpha @change="changeMaterial" />
        </el-form-item>
        <el-form-item label="边缘颜色">
          <el-color-picker v-model="data.blendColor" show-alpha @change="changeMaterial" />
        </el-form-item>
        <el-form-item label="波数">
          <el-slider v-model="data.frequency" :step="0.01" :min="0" :max="1000" @change="changeMaterial" />
        </el-form-item>
        <el-form-item label="动画速度">
          <el-slider v-model="data.animationSpeed" :step="0.01" :min="0" :max="10" @change="changeMaterial" />
        </el-form-item>
        <el-form-item label="振幅">
          <el-slider v-model="data.amplitude" :step="0.01" :min="0" :max="10" @change="changeMaterial" />
        </el-form-item>
        <el-form-item label="反射强度">
          <el-slider v-model="data.specularIntensity" :step="0.01" :min="0" :max="100" @change="changeMaterial" />
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script setup lang="ts">
import { Cartesian3, Color, EllipsoidSurfaceAppearance, GeometryInstance, Material, Primitive, Rectangle, RectangleGeometry, Viewer } from 'cesium';
import { onMounted, reactive, ref } from 'vue';
let viewer: Viewer
let primitive: Primitive
onMounted(() => {
  viewer = new Viewer("cesiumContainer", {
    baseLayerPicker: false, // 如果设置为false，将不会创建右上角图层按钮。
    fullscreenButton: false, // 如果设置为false，将不会创建右下角全屏按钮。
    vrButton: false, // 如果设置为false，将不会创建VR应用场景
    geocoder: true, // 如果设置为false，将不会创建右上角查询(放大镜)按钮。
    homeButton: true, // 如果设置为false，将不会创建右上角主页(房子)按钮。
    infoBox: false, // 是否显示点击要素之后显示的信息,cesium中的沙盒开关
    sceneModePicker: false, // 如果设置为false，将不会创建右上角投影方式控件(显示二三维切换按钮)。
    selectionIndicator: true, // 获取当选定实体更改时引发的事件。
    navigationHelpButton: false, // 如果设置为false，则不会创建右上角帮助(问号)按钮。
    navigationInstructionsInitiallyVisible: true, // 如果帮助说明最初应该是可见的，则为true；如果直到用户明确单击该按钮，则不显示该说明，否则为false。
    timeline: false, // 如果设置为false，则不会创建正下方时间轴小部件。
    scene3DOnly: true, // 为 true 时，每个几何实例将仅以3D渲染以节省GPU内存。
    animation: false, // 如果设置为false，将不会创建左下角动画小部件。
    shouldAnimate: false, // 默认true ，否则为 false 。此选项优先于设置 Viewer＃clockViewModel 。
    // ps. Viewer＃clockViewModel 是用于控制当前时间的时钟视图模型。我们这里用不到时钟，就把shouldAnimate设为false
    sceneMode: 3, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
    requestRenderMode: false, // 启用请求渲染模式，不需要渲染，节约资源吧
    fullscreenElement: document.body, // 全屏时渲染的HTML元素 暂时没发现用处，虽然我关闭了全屏按钮，但是键盘按F11 浏览器也还是会进入全屏
  });
  // 流动水面效果
  primitive = new Primitive({
    geometryInstances: new GeometryInstance({
      geometry: new RectangleGeometry({
        rectangle: Rectangle.fromDegrees(
          113.95, 22.48,
          113.99, 22.52,
        ),
        vertexFormat: EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        height: 100,
      }),
    }),
    appearance: new EllipsoidSurfaceAppearance({
      material: new Material({
        fabric: {
          type: "Water",
          uniforms: {
            baseWaterColor: new Color(64 / 255.0, 157 / 255.0, 253 / 255.0, 0.5),
            blendColor: new Color(64 / 255.0, 157 / 255.0, 253 / 255.0, 0.1),//从水区混合到非水域时使用的RGBA颜色对象。
            normalMap: '/assets/img/waterNormals.jpg', //水法线扰动的法线贴图。
            frequency: 500.0, //控制波数的数字。
            animationSpeed: 0.05, //控制水的动画速度的数字
            amplitude: 10, //控制水波振幅的数字。
            specularIntensity: 10 //控制镜面反射强度的数字。
          }
        }
      })
    }),
  })
  viewer.scene.primitives.add(
    primitive
  );
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(113.97, 22.50, 1500.0)
  });
})
const data = reactive({
  baseWaterColor: 'rgba(64,157,253,0.5)',
  blendColor: 'rgba(64,157,253,0.5)',
  frequency: 1000,
  animationSpeed: 0.05,
  amplitude: 10,
  specularIntensity: 10,
})
const changeMaterial = () => {
  primitive.appearance.material.uniforms.baseWaterColor = Color.fromCssColorString(data.baseWaterColor)
  primitive.appearance.material.uniforms.blendColor = Color.fromCssColorString(data.blendColor)
  primitive.appearance.material.uniforms.frequency = data.frequency
  primitive.appearance.material.uniforms.animationSpeed = data.animationSpeed
  primitive.appearance.material.uniforms.amplitude = data.amplitude
  primitive.appearance.material.uniforms.specularIntensity = data.specularIntensity
}
</script>

<style lang="scss" scoped>
.operationBtn {
  // position: absolute;
  // top: 0%;
  // left: 0%;
  width: 350px;
  min-height: 50px;
  background-color: #ffffff;
  z-index: 1;
  border: 1px solid #aaaaaa;
  padding: 20px;
  box-sizing: border-box;
}
</style>