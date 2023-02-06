"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  emits: ["update:modelValue", "input", "change"],
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    modelValue: {
      type: [String, Number],
      default: 0
    },
    show: {
      type: Boolean,
      default: true
    },
    bgColor: {
      type: String,
      default: "#ffffff"
    },
    height: {
      type: [String, Number],
      default: "50px"
    },
    iconSize: {
      type: [String, Number],
      default: 40
    },
    midButtonSize: {
      type: [String, Number],
      default: 90
    },
    activeColor: {
      type: String,
      default: "#303133"
    },
    inactiveColor: {
      type: String,
      default: "#606266"
    },
    midButton: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    beforeSwitch: {
      type: Function,
      default: null
    },
    borderTop: {
      type: Boolean,
      default: true
    },
    hideTabBar: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      midButtonLeft: "50%",
      pageUrl: ""
    };
  },
  created() {
    if (this.hideTabBar)
      common_vendor.index.hideTabBar();
    let pages = getCurrentPages();
    this.pageUrl = pages[pages.length - 1].route;
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    elIconPath() {
      return (index) => {
        let pagePath = this.list[index].pagePath;
        if (pagePath) {
          if (pagePath == this.pageUrl || pagePath == "/" + this.pageUrl) {
            return this.list[index].selectedIconPath;
          } else {
            return this.list[index].iconPath;
          }
        } else {
          return index == this.valueCom ? this.list[index].selectedIconPath : this.list[index].iconPath;
        }
      };
    },
    elColor() {
      return (index) => {
        let pagePath = this.list[index].pagePath;
        if (pagePath) {
          if (pagePath == this.pageUrl || pagePath == "/" + this.pageUrl)
            return this.activeColor;
          else
            return this.inactiveColor;
        } else {
          return index == this.valueCom ? this.activeColor : this.inactiveColor;
        }
      };
    }
  },
  mounted() {
    this.midButton && this.getMidButtonLeft();
  },
  methods: {
    async clickHandler(index) {
      if (this.beforeSwitch && typeof this.beforeSwitch === "function") {
        let beforeSwitch = this.beforeSwitch.bind(this.$u.$parent.call(this))(index);
        if (!!beforeSwitch && typeof beforeSwitch.then === "function") {
          await beforeSwitch.then((res) => {
            this.switchTab(index);
          }).catch((err) => {
          });
        } else if (beforeSwitch === true) {
          this.switchTab(index);
        }
      } else {
        this.switchTab(index);
      }
    },
    switchTab(index) {
      this.$emit("change", index);
      if (this.list[index].pagePath) {
        common_vendor.index.switchTab({
          url: this.list[index].pagePath
        });
      } else {
        this.$emit("input", index);
        this.$emit("update:modelValue", index);
      }
    },
    getOffsetRight(count, isDot) {
      if (isDot) {
        return -20;
      } else if (count > 9) {
        return -40;
      } else {
        return -30;
      }
    },
    getMidButtonLeft() {
      let windowWidth = this.$u.sys().windowWidth;
      this.midButtonLeft = windowWidth / 2 + "px";
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_badge2 = common_vendor.resolveComponent("u-badge");
  (_easycom_u_icon2 + _easycom_u_badge2)();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
const _easycom_u_badge = () => "../u-badge/u-badge.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_badge)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.show
  }, $props.show ? common_vendor.e({
    b: common_vendor.f($props.list, (item, index, i0) => {
      return common_vendor.e({
        a: "5707acea-0-" + i0,
        b: common_vendor.p({
          size: $props.midButton && item.midButton ? $props.midButtonSize : $props.iconSize,
          name: $options.elIconPath(index),
          ["img-mode"]: "scaleToFill",
          color: $options.elColor(index),
          ["custom-prefix"]: item.customIcon ? "custom-icon" : "uicon"
        }),
        c: item.count
      }, item.count ? {
        d: "5707acea-1-" + i0,
        e: common_vendor.p({
          count: item.count,
          ["is-dot"]: item.isDot,
          offset: [-2, $options.getOffsetRight(item.count, item.isDot)]
        })
      } : {}, {
        f: common_vendor.n($props.midButton && item.midButton ? "u-tabbar__content__circle__button" : "u-tabbar__content__item__button"),
        g: common_vendor.t(item.text),
        h: $options.elColor(index),
        i: index,
        j: $props.midButton && item.midButton ? 1 : "",
        k: common_vendor.o(($event) => $options.clickHandler(index))
      });
    }),
    c: $props.bgColor,
    d: $props.midButton
  }, $props.midButton ? {
    e: $props.borderTop ? 1 : "",
    f: $props.bgColor,
    g: $data.midButtonLeft
  } : {}, {
    h: _ctx.$u.addUnit($props.height),
    i: $props.bgColor,
    j: $props.borderTop ? 1 : "",
    k: `calc(${_ctx.$u.addUnit($props.height)} + ${$props.midButton ? 48 : 0}rpx)`,
    l: common_vendor.o(() => {
    })
  }) : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5707acea"], ["__file", "D:/Code/GP9/app-uniapp/uni_modules/vk-uview-ui/components/u-tabbar/u-tabbar.vue"]]);
wx.createComponent(Component);
