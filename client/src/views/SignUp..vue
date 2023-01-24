<template>

    <div class=" container container-md " style="max-width: 500px;">
        <h1 class="h1 text-center m-3 p-3">Sign Up </h1>
        <Message v-if="showMessage" :message="msg" ></Message>
        <div v-if="status" class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <form>

            <label for="user_name">Name : </label>
            <input v-model="user_name" type="text" id="user_name" class="form-control m-1" placeholder="Your name here"
                required>
            <label for="email">Email :</label>
            <input v-model="email" type="email" id="email" class="form-control m-1" placeholder="Your email here"
                required>
            <label for="password">Password :</label>
            <input v-model="password" type="password" id="password" class="form-control m-1"
                placeholder="Type a strong pasword" required>
            <button @click.prevent="submitSignUpForm" type="button" class="d-block mt-3 m-auto btn btn-success">Sign Me
                Up.</button>

            <div class="text-center mt-3 mb-1">Already a User </div>
            <RouterLink to="/login"><button class="btn btn-primary d-block m-auto">Log In
                </button></RouterLink>
        </form>

    </div>
</template>
<script>
import router from '@/router';
import axios from 'axios';
import Message from '../components/Message.vue';
export default {
    components: { Message },
    data: function () {
        return {
            email: '',
            password: '',
            user_name: '',
            showMessage: false,
            msg: '',
            status:false

        }
    },
    computed: {
        formData: function () {
            return { email: this.email, password: this.password, user_name: this.user_name }
        }
    },
    methods: {

        submitSignUpForm() {
            this.status = true;
            axios.post('http://localhost:3000/register', this.formData).then((res) => {
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                router.push({ path: '/user/' + res.data.id + '/todos' })
                this.status = false;

            }).catch((error) => {
                if (error.response.status !== 201) {
                    this.msg = error.response.data.msg;
                    this.showMessage = !this.showMessage;
                    setTimeout(() => { this.showMessage = false }, 5000)

                }
                this.status = false;
            });
            
        }

    }
}

</script>

<style scoped>
.container {
    /* text-align: center; */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    padding: 15px;
    color: whitesmoke;
    width: 70vw;
    min-height: 60vh;
    background-color: #212121;
    /* box-shadow: 15px 15px 30px #191919,
        -15px -15px 30px #292929; */
    transition: border-radius cubic-bezier(0.075, 0.82, 0.165, 1) 1s,
        transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
}

.container:hover {
    border: #f2295bf0 0.2em solid;
    border-radius: 2.5rem 0 2.5rem 0;

    transform: scale(1.05);
}
</style>