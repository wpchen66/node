
<template>
  <div>
    <editor :id='id' @input="setContent"  v-model="tinymceHtml" :init="editorInit"></editor>  
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
import "tinymce/plugins/image";
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/media'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/importcss'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/print'
import 'tinymce/plugins/code'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/searchreplace'
import Editor from "@tinymce/tinymce-vue";

export default {
  props: {
    setting: {
      type: Object
    },
    getContent: {
      type: Function
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
        height: 300
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
  methods:{
    setContent: function () {
     let a = tinymce.activeEditor.getContent()
     this.getContent(a)
    }
  },
  components: {
    Editor
  }
};
</script>
<style>
</style>

