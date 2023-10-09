<template>
    <v-card class="elevation-13">
      <v-layout>
        <v-navigation-drawer
          class="navigation-drawer py-5"
          theme="dark"
          permanent
        >
          <div class="navigation-title-box">
            <h1>Unbound MNL</h1>
          </div>

          <v-list>

            <v-list-item to="/dashboard" link prepend-icon="mdi-home-account">Home</v-list-item>
            <v-list-item link prepend-icon="mdi-file-document-edit-outline">Create Loan</v-list-item>
            <v-list-item to="/officerProfiles" link prepend-icon="mdi-account-box">Officer Profiles</v-list-item>
            <v-list-item to="/memberProfiles" link prepend-icon="mdi-magnify">Member Profiles</v-list-item>

          </v-list>
  
          <template v-slot:append>
            <div class=" pa-2 ">
              <v-btn class="logout-btn" block> Logout </v-btn>
            </div>
          </template>
          
        </v-navigation-drawer>
        <v-main style="height: 97vh;"></v-main>
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
        background-color: var(--vt-c-white-off);
        color: var(--vt-c-black);;
    }
</style>