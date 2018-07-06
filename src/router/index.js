/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/views/layout/Layout";

/** note: 子菜单仅在children.length> = 1时出现
 *  详情请看 https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
* //hidden: true                    如果`hidden：true`不会显示在边栏中（默认为false）

* alwaysShow: true                  如果设置为true，将始终显示根菜单，无论其子路由长度如何；
*                                   如果没有设置alwaysShow，则只能有多个孩子下的路线；
*                                   它会变成嵌套模式，否则不会显示根菜单

* redirect: noredirect              如果`redirect：noredirect`不会在面包屑中重定向

* name:'router-name'                该名称由<keep-alive>使用（必须设置!!!）

* meta : {
    roles: ['admin','editor']     将控制页面角色（可以设置多个角色）
    title: 'title'               名称显示在子菜单和面包屑（推荐设置）
    icon: 'svg-name'             该图标显示在边栏中，
    noCache: true                该图标显示在边栏中，如果为true，则页面将不被缓存（默认为false）
  }
**/
export const constantRouterMap = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/authredirect",
    component: () => import("@/views/login/authredirect"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/errorPage/401"),
    hidden: true
  },
  {
    path: "",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "dashboard",
        meta: { title: "dashboard", icon: "dashboard", noCache: true }
      }
    ]
  },
  {
    path: "/user",//用户管理
    name: "user",
    meta: {
      title: "用户管理",
      icon: "user"
    },
    component: Layout,
    redirect: "/user/info",
    children: [
      {
        path: "info",
        component: () => import("@/views/user/info"),
        name: "userInfo",
        meta: {
          title: "用户信息",
          icon: "excel"
        }
      },
      {
        path: "update",
        component: () => import("@/views/user/edit"),
        name: "userUpdate",
        meta: {
          title: "编辑用户",
          icon: "edit"
        }
      }
    ]
  },
  {
    path: "/game_manage",//游戏管理的路径  对应url：http://localhost:9527/#/game_manage
    component: Layout,   //不知道啥意思，没影响
    redirect: "/game_manage/room_card_manage", //重定向到房卡商城管理，对应url：http://localhost:9527/#/game_manage/room_card_manage
    name: "gameManage",  //好像是个唯一的名字，设置一下就行，也不重要
    meta: {
      title: "游戏管理", //对应到左边导航条的名字
      icon: "table"     //左边导航条名字前面的图标，table是表格的意思，直接写个单词就能显示对应的图标
    },
    children: [  // 子菜单
      {
        path: "room_card_manage",//房卡商城管理  对应url：http://localhost:9527/#/game_manage/room_card_manage
        component: () => import("@/views/game-manage/room-card-shop-manage/list"), //这个很重要，对应的就是这个模块所在的页面，到对应的文件夹找就行了
        // redirect: "/game_manage/room_card_manage/good_list",
        name: "roomCardManage",//好像是个唯一的名字，设置一下就行，也不重要
        meta: { title: "roomCardManage" },//对应到左边导航条的名字
        // children: [
        //     {
        //         path: "goods_list",
        //         component: () => import("@/views/table/complexTable"),
        //         name: "goodsList",
        //         meta: { title: "goodsList" },
        //     }
        // ]
      },
      {
        path: "drag-table",//通知管理
        component: () => import("@/views/table/dragTable"),
        name: "informManage",
        meta: { title: "通知管理" }
      },
      {
        path: "inline-edit-table",//邮件
        component: () => import("@/views/table/inlineEditTable"),
        name: "email",
        meta: { title: "邮件" }
      },
      {
        path: "tree-table", //支付管理
        component: () => import("@/views/table/treeTable/treeTable"),
        name: "payManage",
        meta: { title: "支付管理" }
      }
    ]
  },
  {
    path: "/switch_card",//转卡
    component: Layout,
    alwaysShow: true,
    redirect: "/switch_card/list",
    name: "switchCard",
    meta: {
      title: "转卡",
      icon: "table"
    },
    children: [
      {
        path: "list",//转卡列表
        component: () => import("@/views/switch-card/list"),
        name: "roomCardManage",
        meta: { title: "转卡列表" }
      }
    ]
  },
  
  {
    path: "/system_manage",//系统管理
    component: Layout,
    redirect: "/system_manage/group_manage",
    name: "system_manage",
    meta: {
      title: "系统管理",
      icon: "table"
    },
    children: [
      {
        path: "group_manage",//栏目组管理
        component: () => import("@/views/system-manage/group-manage/list"),
        name: "group_manage",
        meta: { title: "栏目组管理" }
      },
      {
        path: "admin_role",//管理员角色
        component: () => import("@/views/table/complexTable"),
        name: "admin_role",
        meta: { title: "管理员角色" }
      },
      {
        path: "admin_role",//角色权限分配
        component: () => import("@/views/table/complexTable"),
        name: "admin_role",
        meta: { title: "角色权限分配" }
      },
      {
        path: "admin_role",//管理员用户管理
        component: () => import("@/views/table/complexTable"),
        name: "admin_role",
        meta: { title: "管理员用户管理" }
      },
      {
        path: "admin_role",//管理员用户角色分配
        component: () => import("@/views/table/complexTable"),
        name: "admin_role",
        meta: { title: "管理员用户角色分配" }
      },
      {
        path: "admin_role",//客户端管理
        component: () => import("@/views/table/complexTable"),
        name: "admin_role",
        meta: { title: "客户端管理" }
      },
    ]
  },
  {
    path: "/agent_manage",//代理人管理
    component: Layout,
    redirect: "/system_manage/group_manage",
    name: "agent_manage",//name必须唯一，如果有两个一样的话，会同时操作两个下拉框
    meta: {
      title: "代理人管理",
      icon: "table"
    },
    children: [
      {
        path: "group_manage",//区域管理
        component: () => import("@/views/table/complexTable"),
        name: "group_manage",
        meta: { title: "区域管理" }
      },
      {
        path: "admin_role",//代理人用户管理
        component: () => import("@/views/table/complexTable"),
        name: "admin_role",
        meta: { title: "代理人用户管理" }
      },
      {
        path: "admin_role",//代理人用户积分明细
        component: () => import("@/views/table/complexTable"),
        name: "admin_role",
        meta: { title: "代理人用户积分明细" }
      },
      {
        path: "admin_role",//代理人结算
        component: () => import("@/views/table/complexTable"),
        name: "admin_role",
        meta: { title: "代理人结算" }
      },
      {
        path: "admin_role",//冲值收益分层方案管理
        component: () => import("@/views/table/complexTable"),
        name: "admin_role",
        meta: { title: "冲值收益分层方案管理" }
      },
      {
        path: "admin_role",//代理人角色管理
        component: () => import("@/views/table/complexTable"),
        name: "admin_role",
        meta: { title: "代理人角色管理" }
      },
    ]
  },

  //------------------------------以上----------------------------------------------------
  {
    path: "/documentation",
    //hidden: true,
    component: Layout,
    redirect: "/documentation/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/documentation/index"),
        name: "documentation",
        meta: { title: "documentation", icon: "documentation", noCache: true }
      }
    ]
  },
  {
    path: "/guide",
    //hidden: true,
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/guide/index"),
        name: "guide",
        meta: { title: "guide", icon: "guide", noCache: true }
      }
    ]
  }
];

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: "/permission",
    //hidden: true,
    component: Layout,
    redirect: "/permission/index",
    alwaysShow: true, // will always show the root menu
    meta: {
      title: "permission",
      icon: "lock",
      roles: ["admin", "editor"] // you can set roles in root nav
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/page"),
        name: "pagePermission",
        meta: {
          title: "pagePermission",
          roles: ["admin"] // or you can only set roles in sub nav
        }
      },
      {
        path: "directive",
        component: () => import("@/views/permission/directive"),
        name: "directivePermission",
        meta: {
          title: "directivePermission"
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },

  {
    path: "/icon",
    //hidden: true,
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/svg-icons/index"),
        name: "icons",
        meta: { title: "icons", icon: "icon", noCache: true }
      }
    ]
  },

  {
    path: "/components",
    //hidden: true,
    component: Layout,
    redirect: "noredirect",
    name: "component-demo",
    meta: {
      title: "components",
      icon: "component"
    },
    children: [
      {
        path: "tinymce",
        component: () => import("@/views/components-demo/tinymce"),
        name: "tinymce-demo",
        meta: { title: "tinymce" }
      },
      {
        path: "markdown",
        component: () => import("@/views/components-demo/markdown"),
        name: "markdown-demo",
        meta: { title: "markdown" }
      },
      {
        path: "json-editor",
        component: () => import("@/views/components-demo/jsonEditor"),
        name: "jsonEditor-demo",
        meta: { title: "jsonEditor" }
      },
      {
        path: "splitpane",
        component: () => import("@/views/components-demo/splitpane"),
        name: "splitpane-demo",
        meta: { title: "splitPane" }
      },
      {
        path: "avatar-upload",
        component: () => import("@/views/components-demo/avatarUpload"),
        name: "avatarUpload-demo",
        meta: { title: "avatarUpload" }
      },
      {
        path: "dropzone",
        component: () => import("@/views/components-demo/dropzone"),
        name: "dropzone-demo",
        meta: { title: "dropzone" }
      },
      {
        path: "sticky",
        component: () => import("@/views/components-demo/sticky"),
        name: "sticky-demo",
        meta: { title: "sticky" }
      },
      {
        path: "count-to",
        component: () => import("@/views/components-demo/countTo"),
        name: "countTo-demo",
        meta: { title: "countTo" }
      },
      {
        path: "mixin",
        component: () => import("@/views/components-demo/mixin"),
        name: "componentMixin-demo",
        meta: { title: "componentMixin" }
      },
      {
        path: "back-to-top",
        component: () => import("@/views/components-demo/backToTop"),
        name: "backToTop-demo",
        meta: { title: "backToTop" }
      },
      {
        path: "drag-dialog",
        component: () => import("@/views/components-demo/dragDialog"),
        name: "dragDialog-demo",
        meta: { title: "dragDialog" }
      },
      {
        path: "dnd-list",
        component: () => import("@/views/components-demo/dndList"),
        name: "dndList-demo",
        meta: { title: "dndList" }
      },
      {
        path: "drag-kanban",
        component: () => import("@/views/components-demo/dragKanban"),
        name: "dragKanban-demo",
        meta: { title: "dragKanban" }
      }
    ]
  },

  {
    path: "/charts",
    //hidden: true,
    component: Layout,
    redirect: "noredirect",
    name: "charts",
    meta: {
      title: "charts",
      icon: "chart"
    },
    children: [
      {
        path: "keyboard",
        component: () => import("@/views/charts/keyboard"),
        name: "keyboardChart",
        meta: { title: "keyboardChart", noCache: true }
      },
      {
        path: "line",
        component: () => import("@/views/charts/line"),
        name: "lineChart",
        meta: { title: "lineChart", noCache: true }
      },
      {
        path: "mixchart",
        component: () => import("@/views/charts/mixChart"),
        name: "mixChart",
        meta: { title: "mixChart", noCache: true }
      }
    ]
  },

  {
    path: "/tab",
    //hidden: true,
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/tab/index"),
        name: "tab",
        meta: { title: "tab", icon: "tab" }
      }
    ]
  },

  {
    path: "/table",
    component: Layout,
    redirect: "/table/complex-table",
    name: "table",
    meta: {
      title: "Table",
      icon: "table"
    },
    children: [
      {
        path: "dynamic-table",
        component: () => import("@/views/table/dynamicTable/index"),
        name: "dynamicTable",
        meta: { title: "dynamicTable" }
      },
      {
        path: "drag-table",
        component: () => import("@/views/table/dragTable"),
        name: "dragTable",
        meta: { title: "dragTable" }
      },
      {
        path: "inline-edit-table",
        component: () => import("@/views/table/inlineEditTable"),
        name: "inlineEditTable",
        meta: { title: "inlineEditTable" }
      },
      {
        path: "tree-table",
        component: () => import("@/views/table/treeTable/treeTable"),
        name: "treeTableDemo",
        meta: { title: "treeTable" }
      },
      {
        path: "custom-tree-table",
        component: () => import("@/views/table/treeTable/customTreeTable"),
        name: "customTreeTableDemo",
        meta: { title: "customTreeTable" }
      },
      {
        path: "complex-table",
        component: () => import("@/views/table/complexTable"),
        name: "complexTable",
        meta: { title: "complexTable" }
      }
    ]
  },

  {
    path: "/example",
    component: Layout,
    redirect: "/example/list",
    name: "example",
    meta: {
      title: "example",
      icon: "example"
    },
    children: [
      {
        path: "create",
        component: () => import("@/views/example/create"),
        name: "createArticle",
        meta: { title: "createArticle", icon: "edit" }
      },
      {
        path: "edit/:id(\\d+)",
        component: () => import("@/views/example/edit"),
        name: "editArticle",
        meta: { title: "editArticle", noCache: true },
        //hidden: true
      },
      {
        path: "list",
        component: () => import("@/views/example/list"),
        name: "articleList",
        meta: { title: "articleList", icon: "list" }
      }
    ]
  },

  {
    path: "/error",
    //hidden: true,
    component: Layout,
    redirect: "noredirect",
    name: "errorPages",
    meta: {
      title: "errorPages",
      icon: "404"
    },
    children: [
      {
        path: "401",
        component: () => import("@/views/errorPage/401"),
        name: "page401",
        meta: { title: "page401", noCache: true }
      },
      {
        path: "404",
        component: () => import("@/views/errorPage/404"),
        name: "page404",
        meta: { title: "page404", noCache: true }
      }
    ]
  },

  {
    path: "/error-log",
    //hidden: true,
    component: Layout,
    redirect: "noredirect",
    children: [
      {
        path: "log",
        component: () => import("@/views/errorLog/index"),
        name: "errorLog",
        meta: { title: "errorLog", icon: "bug" }
      }
    ]
  },

  {
    path: "/excel",
    //hidden: true,
    component: Layout,
    redirect: "/excel/export-excel",
    name: "excel",
    meta: {
      title: "excel",
      icon: "excel"
    },
    children: [
      {
        path: "export-excel",
        component: () => import("@/views/excel/exportExcel"),
        name: "exportExcel",
        meta: { title: "exportExcel" }
      },
      {
        path: "export-selected-excel",
        component: () => import("@/views/excel/selectExcel"),
        name: "selectExcel",
        meta: { title: "selectExcel" }
      },
      {
        path: "upload-excel",
        component: () => import("@/views/excel/uploadExcel"),
        name: "uploadExcel",
        meta: { title: "uploadExcel" }
      }
    ]
  },

  {
    path: "/zip",
    //hidden: true,
    component: Layout,
    redirect: "/zip/download",
    alwaysShow: true,
    meta: { title: "zip", icon: "zip" },
    children: [
      {
        path: "download",
        component: () => import("@/views/zip/index"),
        name: "exportZip",
        meta: { title: "exportZip" }
      }
    ]
  },

  {
    path: "/theme",
    component: Layout,
    redirect: "noredirect",
    children: [
      {
        path: "index",
        component: () => import("@/views/theme/index"),
        name: "theme",
        meta: { title: "theme", icon: "theme" }
      }
    ]
  },

  {
    path: "/clipboard",
    //hidden: true,
    component: Layout,
    redirect: "noredirect",
    children: [
      {
        path: "index",
        component: () => import("@/views/clipboard/index"),
        name: "clipboardDemo",
        meta: { title: "clipboardDemo", icon: "clipboard" }
      }
    ]
  },

  {
    path: "/i18n",
    component: Layout,
    //hidden: true,
    children: [
      {
        path: "index",
        component: () => import("@/views/i18n-demo/index"),
        name: "i18n",
        meta: { title: "i18n", icon: "international" }
      }
    ]
  },

  { path: "*", redirect: "/404", 
  //hidden: true 
}
];
