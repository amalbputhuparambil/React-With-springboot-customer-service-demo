package com.React.Backend.Dao;


import com.React.Backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    @Query("select u from User u where u.username= :username")
    public User findByUsername(String username);


    @Query("select u from User u where u.deleted=false ")
    public List<User> findAllBy();


    User getUserById(long id);

    @Query("select u from  User u where  u.id=:id")
    User findbyid(Long id);
    @Query("SELECT u FROM User u WHERE u.username =:name")
    User findbyusername(String name);
}
