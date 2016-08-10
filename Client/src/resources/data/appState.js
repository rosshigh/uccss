export class AppState{
    user = new Object();
    userRole = -1;
    
    setUser(userObj){
        this.user = userObj;
        this.setRole();
    }

    /***********************************************************
     * The user's role in the system: user, facco, tech, bus, admin
     ***********************************************************/
    // setRole(role){
    //     this.userRole = role;
    // }

    /*****************************************************************************
     * Determine users role for authorizations
     ****************************************************************************/
    setRole(){
        var roles = this.user.roles;
        if(!roles) this.userRole = 0;
        if(roles.indexOf('UCSA') > -1) {
            this.userRole = 10;
        } else if(roles.indexOf('UCCT') > -1){
            this.userRole = 8;
        } else if(roles.indexOf('UCCA') > -1){
            this.userRole = 6;
        } else if(roles.indexOf('PRIM') > -1){
            this.userRole = 4;
        } else if(roles.indexOf('USER') > -1){
            this.userRole = 2;
        }  else {
            this.userRole = 1;
        }
    }

    logout(){
        this.userRole = -1;
        this.user = null;
    }
}