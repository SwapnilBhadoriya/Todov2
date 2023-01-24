<template>
    <div class="container-sm p-4">
        <h1>Admin Panel</h1>

        <table class="table table-dark">
            <thead>
                <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">UserName</th>
                    <th scope="col">Email</th>
                    <th scope="col">UserId</th>
                    <th scope="col">Role</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="user, index in users">
                    <th scope="row">{{ index+ 1}}</th>
                    <td>{{ user.user_name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.user_id }}</td>
                    <td>{{ user.is_admin ? 'Admin' : 'User' }}</td>
                </tr>

            </tbody>
        </table>

    </div>
</template>
<script>
import axios from 'axios';

export default {
    created: function () {
        axios.get('http://localhost:3000/admin/users', { headers: { Authorization: localStorage.getItem('token') } }).then((res) => {
            console.log(res.data);
            this.users = res.data.users;
        })
    },
    data: function () {
        return { users: [] }
    }
}
</script>
