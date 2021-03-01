<template>
  <v-app>
    <v-navigation-drawer app :expand-on-hover="!collapse">
      <v-list>
        <v-list-group
          v-for="item in route"
          :key="item.groupId"
          v-model="item.active"
          :prepend-icon="item.iconCls"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.children"
            :key="child.name"
            :to="child.path"
            link
          >
            <v-list-item-title v-text="child.name"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="child.iconCls"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="deep-purple accent-4" dark>
      <v-app-bar-nav-icon @click="collapse = !collapse"></v-app-bar-nav-icon>
      <v-toolbar-title>Collapsing Bar</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>MiZone</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      collapse: false,
      route: global.RouterList,
    };
  },
  created() {},
};
</script>
