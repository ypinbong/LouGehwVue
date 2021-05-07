export default function({ route, redirect }) {
  if(localStorage.token=undefined){
    redirect("/")
  }else{
    redirect("/")
  }
  // let modules;

  // if (localStorage.modules) {
  //   let flag = false;
  //   modules = JSON.parse(localStorage.modules);

  //   for (let i = 0; i < modules.length; i++) {
  //     for (let i2 = 0; i2 < modules[i].actions.length; i2++) {
  //       if (
  //         modules[i].modulestatus === "active" &&
  //         modules[i].actions[i2].actionname === route.meta[0].access.right &&
  //         modules[i].actions[i2].actionstatus === "active"
  //       ) {
  //         flag = true;
  //       }
  //     }
  //   }

  //   if (!flag) {
  //     redirect("/default");
  //   }
  // } else {
  //   redirect("/");
  // }
}
