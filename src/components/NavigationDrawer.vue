<template>
    <v-card class="hover-scale-sm elevation-13">
      <v-layout>
        <v-navigation-drawer
          class="navigation-drawer py-5"
          theme="dark"
          permanent
        >
          <div class="navigation-title-box">
            <h1>Unbound MNL</h1>
          </div>
          <v-list color="transparent">
            <v-list-item link prepend-icon="mdi-home-account" title="Home"></v-list-item>
            <v-list-item link prepend-icon="mdi-account-box" title="Register Officer"></v-list-item>
            <v-list-item link prepend-icon="mdi-file-document-edit-outline" title="Create Loan"></v-list-item>
            <v-list-item link prepend-icon="mdi-magnify" title="Search Profile"></v-list-item>
    
          </v-list>
  
          <template v-slot:append>
            <div class=" pa-2 ">
              <v-btn class="logout-btn" block>
                Logout
              </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
        <v-main style="height: 100vh"></v-main>
      </v-layout>
    </v-card>
</template>

<style scoped>
    
    .navigation-drawer {
        background: var(--vt-c-blue-med-dark);
    }

    .navigation-title-box {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .logout-btn {
        background-color: var(--vt-c-white);
        color: var(--vt-c-blue-very-dark);
    }

    .logout-btn:hover {
       transform: scale(1, 1.13);
    }
</style>