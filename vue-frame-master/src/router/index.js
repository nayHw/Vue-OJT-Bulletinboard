import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/user/Login";
import UserList from "../pages/user/UserList";
import UserCreate from "../pages/user/UserCreate";
import UserDetail from "../pages/user/UserDetail";
import UserEdit from "../pages/user/UserEdit"
import PasswordReset from "../pages/user/PasswordReset"
//post
import PostList from "../pages/post/PostList";
import PostDetail from "../pages/post/PostDetail";
import PostCreate from "../pages/post/PostCreate";
import PostEdit from "../pages/post/PostEdit";
import VisitorView from "../pages/post/VisitorView"
import store from "../store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/user/:id/reset",
        name: "password-reset",
        component: PasswordReset,
        beforeEnter: (to, from, next) => {
            const loggedIn = store.getters.isLoggedIn;
            if(loggedIn){
                return next();
            }
            next('/login');
        }
    },
    {
        path:"/user/list",
        name: "user-list",
        component: UserList,
        beforeEnter: (to, from, next) => {
            const loggedIn = store.getters.isLoggedIn;
            const type = store.getters.userType
            if(loggedIn && type == 'Admin'){
                return next();
            }
            next('/login');
        }
    },
    {
        path:"/user/:id/edit",
        name: "user-edit",
        component: UserEdit,
        beforeEnter: (to, from, next) => {
            const loggedIn = store.getters.isLoggedIn;
            const userType = store.getters.userType;
            if(loggedIn && userType == 'Admin'){
                return next();
            }
            next('/login');
        }
    },
    {
        path:"/user/create",
        name: "user-create",
        component: UserCreate,
        beforeEnter: (to, from, next) => {
            const loggedIn = store.getters.isLoggedIn;
            const userType = store.getters.userType;
            if(loggedIn && userType == 'Admin'){
                return next();
            }
            next('/login');
        }
    }, 
    {  
      path:"/user/:id/detail",
        name: "user-detail",
        component: UserDetail,
        beforeEnter: (to, from, next) => {
            const loggedIn = store.getters.isLoggedIn;
            const userType = store.getters.userType;
            if(loggedIn && userType == 'Admin'){
                return next();
            }
            next('/login');
        }
    },
    {
        path: "/post/list",
        name: "post-list",
        component: PostList,
        beforeEnter: (to, from, next) => {
            const loggedIn = store.getters.isLoggedIn;
            if(loggedIn){
                return next();
            }
            next('/login');
        }
    },
    {
        path: "/post/:id/detail",
        name: "post-detail",
        component: PostDetail,
    },
    {   path: "/post/create",
        name: "post-create",
        component: PostCreate,
        beforeEnter: (to, from, next) => {  
            const loggedIn = store.getters.isLoggedIn;
            if(loggedIn){
                return next();
            }
            next('/login');
        }

    },
    {
        path: "/post/:id/edit",
        name: "post-edit",
        component: PostEdit,
        beforeEnter: (to, from, next) => {  
            const loggedIn = store.getters.isLoggedIn;
            if(loggedIn){
                return next();
            }
            next('/login');
        }

    },
    {
        path: "/",
        name: "visitor-view",
        component: VisitorView,
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
