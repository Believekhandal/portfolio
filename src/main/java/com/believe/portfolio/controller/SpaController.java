package com.believe.portfolio.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Single Page Application Controller
 *
 * Handles client-side routing for React Router by forwarding all non-API
 * requests to index.html. This enables proper routing for the portfolio
 * frontend application.
 */
@Controller
@Slf4j
public class SpaController {

    /**
     * Forward all non-API routes to index.html for React Router
     * This ensures client-side routing works correctly
     */
    @GetMapping(value = {
        "/",
        "/about",
        "/skills",
        "/projects",
        "/experience",
        "/hobbies",
        "/contact",
        "/{path:[^\\.]*}"  // Match any path that doesn't contain a dot (file extension)
    })
    public String index() {
        log.debug("SPA Controller: Forwarding request to index.html for client-side routing");
        return "forward:/index.html";
    }
}

