//package com.hcc.services;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.runner.RunWith;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//public class UserDetailServiceImplTest {
//
//    private UserDetailServiceImpl userDetailServiceImpl;
//
//    @BeforeEach
//    void setup() {
//        userDetailServiceImpl = new UserDetailServiceImpl();
//    }
//
//    @Test
//    void loadUserByUsername_withValidUsername_ReturnsUser() {
//        // GIVEN
//        String existingUsername = "Does_Exist";
//
//        // WHEN
//        UserDetails result = userDetailServiceImpl.loadUserByUsername(existingUsername);
//
//        // THEN
//        System.out.println("result: "+result);
//        assertNotNull(result);
//    }
//
//    @Test
//    void loadUserByUsername_usernameDoesNotExist_Throws_UsernameNotFoundException() {
//        // GIVEN
//        String nonExistingUsername = "Does_Not_Exist";
//
//        // WHEN - THEN
//        assertThrows(UsernameNotFoundException.class, () ->
//                userDetailServiceImpl.loadUserByUsername(nonExistingUsername));
//    }
//}
