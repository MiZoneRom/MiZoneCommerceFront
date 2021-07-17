<template>
  <router-view />
</template>

<style>
body {
  margin: 0;
}
.pull-right {
  float: right !important;
}
</style>

<script>
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    success: { type: String },
    callback: {

    }
  },
  components: {
  },
  data() {
    return {
    };
  },
  computed: {

  },
});
</script>
