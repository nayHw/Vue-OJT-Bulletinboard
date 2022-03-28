import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/user/Login";
//post
import PostList from "../pages/post/PostList";
import PostDetail from "../pages/post/PostDetail";
import PostEdit from "../pages/post/PostEdit";

import store from "../store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/post/list",
        name: "post-list",
        component: PostList,
    },
    {
        path: "/post/:id/detail",
        name: "post-detail",
        component: PostDetail
    },
    {
        path: "/post/:id/edit",
        name: "post-edit",
        component: PostEdit
    },
    {
        path: "/*",
        redirect: "/post/list",
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

/**
 * This is to handle and check authentication for routing.
 */
router.beforeEach((to, from, next) => {
    const loggedIn = store.getters.isLoggedIn;
    if (!loggedIn && to.name != "login") {
        return next("/login");
    }
    next();
});

export default router;
