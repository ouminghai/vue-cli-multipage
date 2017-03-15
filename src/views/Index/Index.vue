<template>
  <div class="app">
    {{message}}
    <br>
    <a href="#">首页</a>
    <a href="pages/user.html">用户中心a </a>


    <Slider :value="value1"></Slider>
    <Slider :value="value2" range></Slider>
    <Slider :value="value3" range disabled></Slider>


  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data() {
      return {
        message: 'Hello Vue!',
        value1: 25,
        value2: [20, 50],
        value3: [20, 50]
      };
    }
  };
</script>
<style lang="css">
  .body{
    width:auto
  }
</style>
