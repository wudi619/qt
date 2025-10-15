<template>
    <div>
        <HeaderBar currentName="wikifx" />
      <iframe
        :src="src"
        :width="width"
        :height="height"
        @load="resizeIframe"
      ></iframe>
    </div>
  </template>
   
  <script>
  export default {
    data() {
      return {
        src: 'https://www.wikifx.com/en/dealer/2339498551.html', // 替换为你想要嵌入的外部网址
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    methods: {
      resizeIframe() {
        this.width = this.$el.querySelector('iframe').contentWindow.document.documentElement.scrollWidth;
        this.height = this.$el.querySelector('iframe').contentWindow.document.documentElement.scrollHeight;
      }
    },
    mounted() {
      window.addEventListener('resize', this.resizeIframe);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resizeIframe);
    }
  };
  </script>