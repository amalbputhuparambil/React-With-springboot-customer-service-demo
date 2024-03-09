package com.React.Backend.Controller;



import com.React.Backend.Entity.User;
import com.React.Backend.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin("*")
public class AdminController {

    private UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }
     @PostMapping("/dashboard")
     public ResponseEntity<?> dashboard(){


        return  ResponseEntity.ok("amal");

     }
    @GetMapping("/getAll")
    public List<User> getAllUsers(){
        List<User>user=userService.getAllUsers();
        System.out.println(user.size());
        return userService.getAllUsers();
    }

    @GetMapping("/getUser/{userName}")
    public User getUser(@PathVariable("userName")String userName){
        System.out.println(userName);

        return userService.getUser(userName);
    }

    @PutMapping("/updateUser")
    public User updateUser(@RequestBody User user, Principal principal){


       String UserName=principal.getName();

        return userService.updateUser(user,UserName);
    }


    @DeleteMapping("/deleteUser/{userName}")
    public void deleteUser(@PathVariable("userName")String userName){
        userService.deleteUser(userName);


    }

}

