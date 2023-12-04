<template>
  <div class="flex">
    <!-- Side bar -->
    <div class="w-[300px] h-screen bg-gray-200 text-white" v-show="showSide">
      <div class="h-[50px] bg-gray-900 flex justify-start  items-center ">
        <div class="px-[20px]">
          <h3 class="font-bold text-xl">Admin Dashboard</h3>
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-800 py-[20px]">
        <div class="flex flex-col justify-between h-ful px-[20px] space-y-[10px]">
          <div class=" flex flex-col item-center justify-between space-y-[10px]">
            <router-link to="/profile"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300  hover:text-gray-800 transition duration-400 ease-in-out">
              <i class="fa-solid fa-user mr-2 w-[25px] h-[25px] fill-current mt-3 "></i>
              Profile
            </router-link>
            <router-link to="/home"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
              <i class="fa-solid fa-house mr-2 w-[25px] h-[25px] fill-current mt-3"></i>
              Dashboard
            </router-link>
            <router-link to="/UnitSelection"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300  hover:text-gray-800 transition duration-400 ease-in-out">
              <i class="fa-solid fa-building mr-2 w-[25px] h-[25px] fill-current mt-3"></i>
              Unit Selection
            </router-link>
            <router-link to="/AquiringUnit"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md rounded-b-lg hover:bg-gray-300  hover:text-gray-800 transition duration-400 ease-in-out">
              <i class="fa-solid fa-cart-shopping mr-2 w-[25px] h-[25px] fill-current mt-3"></i>
              Aquiring Units
            </router-link>

          </div>
          <div class="h-[50px]">
            <div>
              <router-link to="/" @click="logoutDashboard"
                class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray-800  transition duration-400 ease-in-out">
                <i class="fa-solid fa-right-from-bracket mr-2 w-[25px] h-[25px] fill-current mt-3"></i>
                Logout
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 flex flex-col">
      <div class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b">
        <!-- Hambuger menu -->
        <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class=" w-[25px] h-[25px]">
            <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </div>

        <div class="w-[calc(100%-30px)] flex">
          <!-- User login -->
          <div class="w-[200px] ">
            <div class="flex items-center justify-start space-x-4" @click="toggleDrop">

              <div class="font-semibold dark:text-white text-left">
                <div class="text-xs text-gray-500 dark:text-gray-400 ">Setting</div>
              </div>
            </div>
            <!-- Drop down -->
            <div v-show="showDropDown"
              class=" absolute right-[10px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
              <div class="py-1 text-left" role="none">
                <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1"
                  id="menu-item-0">Account settings</a>
                <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1"
                  id="menu-item-1">Support</a>
                <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1"
                  id="menu-item-2">License</a>
                <form method="POST" action="#" role="none">
                  <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-center text-sm" role="menuitem"
                    tabindex="-1" id="menu-item-3">Sign out</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 bg-gray-400 p-[20px]">
        <div class="border border-gray-300 rounded-md p-[20px] h-full">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!-- Main  -->
  </div>
</template>
<script>
import { checkIfUserIsAuthenticated, simulateLogout } from '../router/auth.js'

export default {
  name: 'DashboardComponent',
  data() {
    return {
      showDropDown: false,
      showSide: true
    }
  },
  methods: {
    // hide show side bar
    toggleSideBar() {
      this.showSide = !this.showSide
      return
    },
    // toggle user
    toggleDrop() {
      this.showDropDown = !this.showDropDown
      return
    },

    logoutDashboard() {
      simulateLogout();
      console.log('logout');
      this.$router.push('/')
    }
  },

  beforeRouteEnter(to, from, next) {
    if (checkIfUserIsAuthenticated()) {
      next();
    } else {
      next('/');
    }
  },

}
</script>

<style>
@import url('../assets/tailwind.css');
</style>
