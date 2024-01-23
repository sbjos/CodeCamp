package com.hcc.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ValidateSession {

    /**
     * Mapping for token validation to prevent a user to access a page without proper authentication.
     */
    @PostMapping("/api/auth/validate")
    public void validate() {}
}
