"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_button + TabBar)();
}
const TabBar = () => "../../components/TabBar.js";
const _sfc_main = {
  setup(__props) {
    const title = common_vendor.ref("Hello");
    const list = common_vendor.reactive([1, 2, 3, 4]);
    common_vendor.onLoad((opt) => console.log("opt", opt));
    common_vendor.onMounted(() => console.log("---mounted"));
    const store = common_vendor.useStore();
    console.log("---store", store);
    const num = common_vendor.computed$1(() => store.state.study.num);
    const add = () => {
      store.commit("study/add", 5);
    };
    common_vendor.onPullDownRefresh(() => {
      console.log("---\u89E6\u53D1\u4E0B\u62C9");
      setTimeout(() => {
        common_vendor.index.stopPullDownRefresh();
      }, 500);
    });
    common_vendor.onShareAppMessage((res) => {
      console.log("---\u5206\u4EAB", res.from);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(title.value),
        b: common_vendor.f(common_vendor.unref(list), (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item
          };
        }),
        c: common_vendor.t(common_vendor.unref(num)),
        d: common_vendor.o(add),
        e: common_vendor.p({
          type: "primary"
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-57280228"], ["__file", "D:/Code/GP9/app-uniapp/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
