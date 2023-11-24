package com.hcc.services;

import com.hcc.entities.User;
import com.hcc.utils.CustomPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * User Detail Service Implementation Class
 */
@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    CustomPasswordEncoder passwordEncoder;

    /**
     * Loads the user by username.
     * @param username the username identifying the user whose data is required.
     * @return the user
     * @throws UsernameNotFoundException if user is not found
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.getPasswordEncoder().encode("asdfasdf"));
        return user;
    }
}
