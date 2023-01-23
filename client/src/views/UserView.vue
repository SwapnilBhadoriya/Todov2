<template>

    <div class="container">
        <h1><strong>My Tasks</strong></h1>
        <input v-model="newTodo" type="text" name="text" class="input" placeholder="Add a New Todo ." />
        <button @click="addTodo" class="addbtn">Add Task
        </button>
        <div v-for="todo in todos" class="card" :key="todo.task_id">
            <p class="list-item m-2"><strong>{{ todo.task }}</strong></p>


            <div class="utils">
                <button class="btn btn-secondary">Edit</button>
                <button @click="deleteTodo(todo.task_id)" class="btn btn-danger m-3">Delete</button>
            </div>
        </div>
        <button @click="logout" class="btn btn-dark">Logout</button>
    </div>
</template>
  
<script>
import axios from 'axios';



export default {
    created() {

        this.getTodos();

    },
    data: function () {
        return { todos: [], user: { name: 'swap', email: 's@s.com' }, newTodo: '', updated: '', showEdit: false }
    },
    methods: {
        getTodos() {
            axios.get(`http://localhost:3000${this.$route.path}`, { headers: { Authorization: localStorage.getItem('token') } }).then((res) => {
                this.todos = res.data.data;

            })
        },
        addTodo() {
            axios.post(`http://localhost:3000${this.$route.path}`, {
                task: this.newTodo,
            }, {
                headers: { Authorization: localStorage.getItem('token') }
            }).then((res) => {
                this.getTodos();
                this.newTodo = '';
            })

        },
        deleteTodo(task_id) {
            axios.delete(`http://localhost:3000${this.$route.path + '/' + task_id}`, { headers: { Authorization: localStorage.getItem('token') } }).then((res) => {
                this.getTodos();
                console.log(res.data);
            })

        },
        updateTodo() {

        },
        logout() {
            localStorage.removeItem('token');
            this.$router.push('/');
        }
    }
}
</script>  
<style scoped>
.card {
    padding: 10px;
    margin: 5px;
    width: 60%;
    height: fit-content;
    color: white;
    background-color: black;
    border-radius: 1rem;
    border: #212121 0.2rem solid;
    transition: all 0.4s ease-in;
    box-shadow: 0.4rem 0.4rem 0.6rem #00000040;
}

.card:hover {
    /* transform: translateY(-1.5rem); */
    border: #f2295bf0 0.2em solid;
    border-radius: 2.5rem 0 2.5rem 0;
}

h1 {
    color: whitesmoke;
    padding: 10px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;

    width: 70vw;
    min-height: 60vh;
    background-color: #212121;
    /* box-shadow: 15px 15px 30px #191919,
        -15px -15px 30px #292929; */
    transition: border-radius cubic-bezier(0.075, 0.82, 0.165, 1) 1s,
        transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
}

.container:hover {
    border-bottom-right-radius: 50px;
    border-top-left-radius: 50px;
    transform: scale(1.05);
}


.input {
    color: #f2295bf0;
    border: 2px solid #f2295bf0;
    border-radius: 10px;
    padding: 10px 25px;
    background: transparent;
    max-width: 190px;
}

.input:active {
    box-shadow: 2px 2px 15px #f2295bf0 inset;
}

.addbtn {
    width: 6.5em;
    height: 2.3em;
    margin: 0.5em;
    background: black;
    color: white;
    border: none;
    border-radius: 0.625em;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    position: relative;
    z-index: 1;
    overflow: hidden;
}

.addbtn:hover {
    color: black;
}

.addbtn:after {
    content: "";
    background: white;
    position: absolute;
    z-index: -1;
    left: -20%;
    right: -20%;
    top: 0;
    bottom: 0;
    transform: skewX(-45deg) scale(0, 1);
    transition: all 0.5s;
}

button:hover:after {
    transform: skewX(-45deg) scale(1, 1);
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
}
</style>