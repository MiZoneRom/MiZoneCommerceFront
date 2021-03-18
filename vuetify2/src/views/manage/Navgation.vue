<template>
  <v-card>
    <v-card-title class="indigo white--text headline">
      User Directory
    </v-card-title>
    <v-row class="pa-4" justify="space-between">
      <v-col cols="5">
        <v-treeview
          :active.sync="active"
          :items="navs"
          :load-children="fetchUsers"
          :open.sync="open"
          activatable
          color="warning"
          open-on-click
          transition
        >
          <template v-slot:prepend="{ item }">
            <v-icon v-if="!item.children"> mdi-account </v-icon>
          </template>
        </v-treeview>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col class="d-flex text-center">
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!selectedNav"
            class="title grey--text text--lighten-1 font-weight-light"
            style="align-self: center"
          >
            Select a User
          </div>
          <v-card
            v-else
            :key="selectedNav.id"
            class="pt-6 mx-auto"
            flat
            max-width="400"
          >
            <v-card-text>
              <v-avatar v-if="avatar" size="88">
                <v-img
                  :src="`https://avataaars.io/${avatar}`"
                  class="mb-6"
                ></v-img>
              </v-avatar>
              <h3 class="headline mb-2">
                {{ selectedNav.name }}
              </h3>
              <div class="blue--text mb-2">
                {{ selectedNav.name }}
              </div>
              <div class="blue--text subheading font-weight-bold">
                {{ selectedNav.name }}
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-row class="text-left" tag="v-card-text">
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                Company:
              </v-col>
              <v-col>{{ selectedNav.name }}</v-col>
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                Website:
              </v-col>
              <v-col>
                <a :href="`//${selectedNav.name}`" target="_blank">{{
                  selectedNav.website
                }}</a>
              </v-col>
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                Phone:
              </v-col>
              <v-col>{{ selectedNav.phone }}</v-col>
            </v-row>
          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import Vue from "vue";
import apiPath from "@/service/apiPath";
const avatars = [
  "?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban",
  "?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun",
  "?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong",
  "?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair",
  "?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly",
];

export default {
  data: () => ({
    active: [],
    avatar: null,
    open: [],
    navs: [],
    selectedNav: undefined,
  }),
  async created() {
    var navData = await Vue.axios.get(apiPath.NAVIGATION_TREELIST);
    var navList = navData.data.data;
    this.filterTreeList(navList);
    this.navs = navList;
  },
  computed: {
    selected() {
      if (!this.active.length) return undefined;
      const id = this.active[0];
      return this.navs.find((nav) => nav.id === id);
    },
  },
  watch: {
    selected: "randomAvatar",
    active: {
      deep: true,
      async handler() {
        var navData = await this.getNavData(this.active[0]);
        console.info(navData);
        this.selectedNav = navData;
      },
    },
  },
  methods: {
    async fetchUsers(item) {
      this.$delete(item, "children");
      item.children.push(item);
    },
    //随机头像
    randomAvatar() {
      console.info("aaa");
    },
    //处理导航列表
    filterTreeList(item) {
      item.forEach((element) => {
        if (element.children.length <= 0) {
          this.$delete(element, "children");
        } else {
          this.filterTreeList(element.children);
        }
      });
    },
    async getNavData(id) {
      var navData = await Vue.axios.get(apiPath.NAVIGATION + "?id=" + id);
      return navData.data.data;
    },
  },
};
</script>