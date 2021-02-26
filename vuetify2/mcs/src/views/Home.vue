<template>
  <v-app>
    <v-navigation-drawer app>
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

          <v-list-item v-for="child in item.children" :key="child.name" @click="$router.push(child.path)" link>
            <v-list-item-title v-text="child.name"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="child.iconCls"></v-icon>
            </v-list-item-icon>
          </v-list-item>

        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app> </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      route: global.RouterList,
    };
  },
  created() {},
};
</script>
