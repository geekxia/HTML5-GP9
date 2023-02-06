"use strict";
var common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_u_tabbar2 = common_vendor.resolveComponent("u-tabbar");
  _easycom_u_tabbar2();
}
const _easycom_u_tabbar = () => "../uni_modules/vk-uview-ui/components/u-tabbar/u-tabbar.js";
if (!Math) {
  _easycom_u_tabbar();
}
const _sfc_main = {
  setup(__props) {
    const current = common_vendor.ref(0);
    const list = common_vendor.reactive([
      {
        iconPath: "home",
        selectedIconPath: "home-fill",
        text: "\u9996\u9875",
        customIcon: false
      },
      {
        iconPath: "photo",
        selectedIconPath: "photo-fill",
        text: "\u653E\u6620\u5385",
        customIcon: false
      },
      {
        iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
        selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
        text: "\u53D1\u5E03",
        midButton: true,
        customIcon: false
      },
      {
        iconPath: "play-right",
        selectedIconPath: "play-right-fill",
        text: "\u76F4\u64AD",
        customIcon: false
      },
      {
        iconPath: "account",
        selectedIconPath: "account-fill",
        text: "\u6211\u7684",
        customIcon: false
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => current.value = $event),
        b: common_vendor.p({
          list: common_vendor.unref(list),
          ["mid-button"]: true,
          modelValue: current.value
        })
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/GP9/app-uniapp/components/TabBar.vue"]]);
wx.createComponent(Component);
