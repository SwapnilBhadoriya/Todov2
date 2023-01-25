<template>
    <div class="container">
        <h3 class="text-center m-3 text-light">""Whoops! Looks like you stumbled upon a dead end. The resource you're
            trying to access doesn't exist or has been misplaced. Don't worry though you can head over to below links ..</h3>
        <h2 class="text-center text-white">Head over to these links for proper access .</h2>
        <div class="d-flex justify-content-center">
            <RouterLink to="/register"><button class="btn btn-dark m-2">Sign Up</button></RouterLink>
            <RouterLink to="/login"><button class="btn btn-dark m-2">Login</button></RouterLink>
        </div>
    </div>
</template>