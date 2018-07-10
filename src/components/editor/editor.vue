
<template>
  <div>
    <editor :id='id' v-model="tinymceHtml" :init="editorInit"></editor>  
  </div>
</template>
<script>
// Import TinyMCE
// import tinymce from 'tinymce/tinymce';
// import '/public/tinymce4.7.5/';
// import 'tinymce/plugins/paste';
// import 'tinymce/plugins/link';
// import tinymce from '../../../public/tinymce4.7.5/tinymce.min.js'
// Import TinyMCE
import tinymce from "tinymce/tinymce";
import "tinymce/themes/modern/theme";
import "tinymce/plugins/paste";
import "tinymce/plugins/link";
import Editor from "@tinymce/tinymce-vue";

export default {
  props: {
    setting: {
      type: Object
    }
  },
  data() {
    return {
      id: "tinymce",
      tinymceHtml: "请输入内容",
      editorInit: {
        selector: "#tinymce",
        language_url: "/static/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/static/skins/lightgray",
        theme: "modern",
        width: 600,
        height: 300,
        tools: "image",
        plugins: "image"
      }
    };
  },
  created: function() {
    const _this = this;
    Object.keys(this.setting).forEach((item, index) => {
      _this.editorInit[item] = _this.setting[item];
    });
  },
  mounted: function() {
    tinymce.init({});
  },
  components: {
    Editor
  }
};
</script>
<style>
</style>

