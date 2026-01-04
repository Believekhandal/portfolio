package com.believe.portfolio.controller;

import com.believe.portfolio.entity.*;
import com.believe.portfolio.service.PortfolioService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST API Controller for Portfolio Management
 *
 * Provides endpoints for managing portfolio data including:
 * - Profile information
 * - Skills and technologies
 * - Projects and experience
 * - Hobbies and contact messages
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@Slf4j
public class PortfolioApiController {

    private final PortfolioService portfolioService;

    @Autowired
    public PortfolioApiController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    // ===============================
    // PROFILE ENDPOINTS
    // ===============================

    /**
     * Get portfolio profile information
     * @return Profile data or 404 if not found
     */
    @GetMapping("/profile")
    public ResponseEntity<Profile> getProfile() {
        log.debug("GET /api/profile - Fetching profile data");
        Profile profile = portfolioService.getProfile();
        log.debug("Profile data retrieved: {}", profile != null ? "Found" : "Not Found");
        return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
    }

    /**
     * Create or update portfolio profile
     * @param profile Profile data to save
     * @return Saved profile data
     */
    @PostMapping("/profile")
    public ResponseEntity<Profile> saveProfile(@RequestBody Profile profile) {
        log.debug("POST /api/profile - Saving profile: {}", profile.getFullName());
        Profile savedProfile = portfolioService.saveProfile(profile);
        log.debug("Profile saved successfully with ID: {}", savedProfile.getId());
        return ResponseEntity.ok(savedProfile);
    }

    // ===============================
    // SKILLS ENDPOINTS
    // ===============================

    /**
     * Get all skills
     * @return List of all skills
     */
    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getAllSkills() {
        log.debug("GET /api/skills - Fetching all skills");
        List<Skill> skills = portfolioService.getAllSkills();
        log.debug("Skills retrieved: {} items", skills.size());
        return ResponseEntity.ok(skills);
    }

    /**
     * Get skills by category
     * @param category Skill category (e.g., "Frontend", "Backend", "Database")
     * @return List of skills in the specified category
     */
    @GetMapping("/skills/category/{category}")
    public ResponseEntity<List<Skill>> getSkillsByCategory(@PathVariable String category) {
        log.debug("GET /api/skills/category/{} - Fetching skills by category", category);
        List<Skill> skills = portfolioService.getSkillsByCategory(category);
        log.debug("Skills retrieved for category '{}': {} items", category, skills.size());
        return ResponseEntity.ok(skills);
    }

    /**
     * Create or update a skill
     * @param skill Skill data to save
     * @return Saved skill data
     */
    @PostMapping("/skills")
    public ResponseEntity<Skill> saveSkill(@RequestBody Skill skill) {
        log.debug("POST /api/skills - Saving skill: {}", skill.getName());
        Skill savedSkill = portfolioService.saveSkill(skill);
        log.debug("Skill saved successfully with ID: {}", savedSkill.getId());
        return ResponseEntity.ok(savedSkill);
    }

    // ===============================
    // PROJECT ENDPOINTS
    // ===============================

    /**
     * Get all projects
     * @return List of all projects ordered by creation date
     */
    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        log.debug("GET /api/projects - Fetching all projects");
        List<Project> projects = portfolioService.getAllProjects();
        log.debug("Projects retrieved: {} items", projects.size());
        return ResponseEntity.ok(projects);
    }

    /**
     * Get featured projects only
     * @return List of featured projects
     */
    @GetMapping("/projects/featured")
    public ResponseEntity<List<Project>> getFeaturedProjects() {
        log.debug("GET /api/projects/featured - Fetching featured projects");
        List<Project> projects = portfolioService.getFeaturedProjects();
        log.debug("Featured projects retrieved: {} items", projects.size());
        return ResponseEntity.ok(projects);
    }

    /**
     * Create or update a project
     * @param project Project data to save
     * @return Saved project data
     */
    @PostMapping("/projects")
    public ResponseEntity<Project> saveProject(@RequestBody Project project) {
        log.debug("POST /api/projects - Saving project: {}", project.getName());
        Project savedProject = portfolioService.saveProject(project);
        log.debug("Project saved successfully with ID: {}", savedProject.getId());
        return ResponseEntity.ok(savedProject);
    }

    // ===============================
    // HOBBY ENDPOINTS
    // ===============================

    /**
     * Get all hobbies
     * @return List of all hobbies
     */
    @GetMapping("/hobbies")
    public ResponseEntity<List<Hobby>> getAllHobbies() {
        log.debug("GET /api/hobbies - Fetching all hobbies");
        List<Hobby> hobbies = portfolioService.getAllHobbies();
        log.debug("Hobbies retrieved: {} items", hobbies.size());
        return ResponseEntity.ok(hobbies);
    }

    /**
     * Create or update a hobby
     * @param hobby Hobby data to save
     * @return Saved hobby data
     */
    @PostMapping("/hobbies")
    public ResponseEntity<Hobby> saveHobby(@RequestBody Hobby hobby) {
        log.debug("POST /api/hobbies - Saving hobby: {}", hobby.getName());
        Hobby savedHobby = portfolioService.saveHobby(hobby);
        log.debug("Hobby saved successfully with ID: {}", savedHobby.getId());
        return ResponseEntity.ok(savedHobby);
    }

    // ===============================
    // EXPERIENCE ENDPOINTS
    // ===============================

    /**
     * Get all work experiences
     * @return List of experiences ordered by start date (newest first)
     */
    @GetMapping("/experiences")
    public ResponseEntity<List<Experience>> getAllExperiences() {
        log.debug("GET /api/experiences - Fetching all experiences");
        List<Experience> experiences = portfolioService.getAllExperiences();
        log.debug("Experiences retrieved: {} items", experiences.size());
        return ResponseEntity.ok(experiences);
    }

    /**
     * Create or update work experience
     * @param experience Experience data to save
     * @return Saved experience data
     */
    @PostMapping("/experiences")
    public ResponseEntity<Experience> saveExperience(@RequestBody Experience experience) {
        log.debug("POST /api/experiences - Saving experience: {} at {}", experience.getTitle(), experience.getCompany());
        Experience savedExperience = portfolioService.saveExperience(experience);
        log.debug("Experience saved successfully with ID: {}", savedExperience.getId());
        return ResponseEntity.ok(savedExperience);
    }

    // ===============================
    // CONTACT ENDPOINTS
    // ===============================

    /**
     * Get all contact messages
     * @return List of all contact messages ordered by creation date
     */
    @GetMapping("/contacts")
    public ResponseEntity<List<Contact>> getAllContacts() {
        log.debug("GET /api/contacts - Fetching all contacts");
        List<Contact> contacts = portfolioService.getAllContacts();
        log.debug("Contacts retrieved: {} items", contacts.size());
        return ResponseEntity.ok(contacts);
    }

    /**
     * Submit a new contact message
     * @param contact Contact message data
     * @return Saved contact data with HTTP 201 status
     */
    @PostMapping("/contacts")
    public ResponseEntity<Contact> saveContact(@RequestBody Contact contact) {
        log.debug("POST /api/contacts - Saving contact from: {}", contact.getEmail());
        if (contact.getCreatedAt() == null) {
            contact.setCreatedAt(java.time.LocalDateTime.now());
        }
        Contact savedContact = portfolioService.saveContact(contact);
        log.debug("Contact saved successfully with ID: {}", savedContact.getId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedContact);
    }
}