<template>
    <div>
        <section class="bodyContent" >
            <div class="container  d-flex justify-content-center align-self-center" style="min-height: 100vh;">
                <form class="my-auto">
                    <h1 class="mb-5">Welcome to Lou Geh Supermarket</h1>
                <img class="mb-5" src="undraw_shopping_app_flsj.svg" alt="" width="400" height="200">
                <div class="form-group">
                    <label>Email address</label>
                    <input type="email" class="form-text" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" >
                </div>
               <NuxtLink class="btn-danger mt-3 px-3 py-2" to="/shop">Submit</NuxtLink>
                <div class="mt-5">Copyright &copy; 2021 Yong Pin L. Bong</div>
                </form>
                
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

    

</style>