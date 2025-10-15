<template>
    <div>
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
        src: 'https://chatlink.wchatlink.com/widget/standalone.html?eid=835d4a57937344f744818a5b519fcdcc&language=en', // 替换为你想要嵌入的外部网址
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