<template>
    <div class="table-responsive" style="width: 70%; margin: auto;">
        <form @submit.prevent="search()" style="width: 50%; margin: auto ;">
            <input type="text" v-model="key" class="form-control" id="key" name="key" placeholder="Username 또는 Adress 입력"><br>
            <button type="submit" class="btn btn-primary">검색</button>
            <!-- <br>
            <br>
            <div class="alert alert-danger" role="alert" v-bind:style="{ display }">
                {{ message }}
            </div> -->
        </form>
        <h4 class="display h-5" text-align="center">사용자 목록</h4>
        <a :href="'/admin/insert/'" class="btn btn-primary" style="width: 150px; margin-bottom: 10px;">Add</a>
        <div class="alert alert-success" role="alert" v-bind:style="{ display }">
            {{ message }}
        </div>
        <div v-if="this.Users.length == 0" class="alert alert-secondary" role="alert">
            사용자 목록이 없습니다.
        </div>
        <table class="table table-striped table-hover table-borderless table-primary align-middle">
            <thead class="table-light">
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Address</th>
                    <th>Role</th>
                    <th>Active</th>
                    <th></th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr class="table-primary" v-for="user in Users" v-bind:key="user.id">
                    <td scope="row" style="font-weight: bold;">{{ user.id }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.address }}</td>
                    <td>{{ user.role }}</td>
                    <td>{{ user.active }}</td>
                    <td>
                        <a :href="'/admin/update/' + user.id">Update</a>
                        |
                        <a href="" @click.prevent="deleteUser(user.id)">Delete</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
    import UserService from '../service/UserService.js'

    export default {
        name :'HomeAdmin',
        data(){
            return {
                Users: [],
                display: 'none',
                message: '',
                key:''
            }
        },
        methods: {
            getUsers(){
                UserService.getUsers().then((res => {
                    console.log(res)
                    console.log(res.data.data.listUser);
                    this.Users = res.data.data.listUser;
                }))
            },
            deleteUser(id){
                if (confirm("Are you sure you want to delete?")) {
                    UserService.delete(id).then(() => {
                        alert("Deleted.");
                        this.getUsers();
                    })
                    .catch((err) => {alert("삭제 실패. Error: " + err + ".");});
                }
            },
            search(){
                if (UserService.checkSpecialChar(this.key)) {
                    alert("잘못된 검색 정보!");
                } else {
                    UserService.search(this.key).then((res => {
                        this.Users = res.data.data.listUser;
                    }))
                }
            }
        },
        created() {
            //UserService.checkLogin(this.$router);
            //this.$router.go(this.$router.currentRoute)
            //console.log(sessionStorage.getItem("jwtToken"));
            if (sessionStorage.getItem('change') != null && sessionStorage.getItem('change')){
                this.display = 'block';
                this.message = sessionStorage.getItem('msg');
                sessionStorage.removeItem('change');
            } 
            this.getUsers();
        }
    }
</script>

  