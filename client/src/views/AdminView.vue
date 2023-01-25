<template>
    <div class="container-sm p-4">
        <button class="btn btn-dark" @click="logout">Logout</button>

        <h1>Admin Panel</h1>
        <div class="m-2">
            <button @click="getAllUsers" class="btn btn-dark m-1">All Users</button>
            <button @click="getAllTasks" class="btn btn-dark m-1">All Tasks</button>
        </div>
        <div v-if="status" class="text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <table v-if="!Tasks" class="table table-dark">
            <thead>
                <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">UserName</th>
                    <th scope="col">Email</th>
                    <th scope="col">UserId</th>
                    <th scope="col">Role</th>
                    <th scope="col"></th>
                    

                </tr>
            </thead>
            <tbody>
                <tr v-for="user, index in users">
                    <th scope="row">{{ index+ 1}}</th>
                    <td>{{ user.user_name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.user_id }}</td>
                    <td>{{ user.is_admin ? 'Admin' : 'User' }}</td>
                    <td>
                        <div class="d-flex justify-content-end align-items-center">
                            <button class="btn btn-secondary m-1"><i class="bi bi-pencil-square"></i></button>
                            <button @click="deleteUser" class="btn btn-danger m-0"><i class="bi bi-trash"></i></button>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>
        <table v-if="Tasks" class="table table-dark">
            <thead>
                <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Username</th>
                    <th scope="col">Task</th>
                    <th scope="col">Task_Id</th>
                    <th scope="col">User_Id</th>
                    <th scope="col"></th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="task, index in tasks">
                    <th scope="row">{{ index+ 1}}</th>
                    <td>{{ task.user_name }}</td>
                    <td>{{ task.task }}</td>
                    <td>{{ task.task_id }}</td>
                    <td>{{ task.user_id }}</td>
                    <td>
                        <div class="d-flex justify-content-end align-items-center">
                            <button class="btn btn-secondary m-1"><i class="bi bi-pencil-square"></i></button>
                            <button @click="deleteTask(task)" class="btn btn-danger m-0"><i
                                    class="bi bi-trash"></i></button>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>

    </div>
</template>
<script>
import axios from 'axios';

export default {
    created: function () {
        this.getAllUsers();
    },
    data: function () {
        return {
            users: [],
            tasks: [],
            toUpdateId: -1,
            status: false,
            Tasks: false
        }
    },
    methods: {
        logout: function () {
            localStorage.removeItem('token');
            this.$router.push('/');
        },
        getAllTasks: function () {
            this.Tasks = true;
            this.status = true;
            axios.get('http://localhost:3000/admin/tasks', { headers: { Authorization: localStorage.getItem('token') } }).then((res) => {
                this.tasks = res.data.tasks;
                this.status = false;
            }).catch((err) => {
                this.status = false;
            })

        },
        getAllUsers: function () {
            this.Tasks = false;
            this.status = true;
            axios.get('http://localhost:3000/admin/users', { headers: { Authorization: localStorage.getItem('token') } }).then((res) => {
                console.log(res.data);
                this.users = res.data.users;
                this.status = false;
            }).catch(err => this.status = false)

        },
        deleteUser: function () { },
        deleteTask: function (task) {
            axios.delete('http://localhost:3000/admin/tasks/' + task.user_id + '/' + task.task_id, { headers: { Authorization: localStorage.getItem('token') } }).then((res) => {
                console.log(res.data);

            })
        }
    }
}
</script>
