<template>
  <v-app>
    <v-navigation-drawer app :expand-on-hover="!collapse">
      <v-card class="mx-auto" tile>
        <v-img
          height="100%"
          src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
        >
          <v-row align="end" class="fill-height">
            <v-col class="pa-5" cols="4">
              <v-avatar class="profile" color="grey" :size="collapse?64:32">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                ></v-img>
              </v-avatar>
            </v-col>
            <v-col class="py-0" cols="8" v-if="collapse">
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title class="title">
                    Marcus Obrien
                  </v-list-item-title>
                  <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-img>
      </v-card>

      <v-list dense>
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
      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

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
