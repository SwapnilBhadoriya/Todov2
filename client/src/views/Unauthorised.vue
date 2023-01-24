
import { RouterLink } from 'vue-router';


import { RouterLink } from 'vue-router';

<template>
    <div class="container">
        <h3 class="text-center m-3 text-light">"Access Denied. You do not have the proper authorization to access this page.
            If you believe this to be an
            error, please contact the site administrator."</h3>
            <h2 class="text-center text-white">Head over to these links for proper access .</h2>
        <div class="d-flex justify-content-center">
            <RouterLink to="/register"><button class="btn btn-dark m-2">Sign Up</button></RouterLink>
            <RouterLink to="/login"><button class="btn btn-dark m-2">Login</button></RouterLink>
        </div>
    </div>
</template>