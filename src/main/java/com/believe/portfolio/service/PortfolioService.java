package com.believe.portfolio.service;

import com.believe.portfolio.entity.*;
import com.believe.portfolio.entity.Project;
import com.believe.portfolio.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class PortfolioService {
    
    @Autowired
    private ProfileRepository profileRepository;
    
    @Autowired
    private SkillRepository skillRepository;
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private HobbyRepository hobbyRepository;
    
    @Autowired
    private ExperienceRepository experienceRepository;
    
    @Autowired
    private ContactRepository contactRepository;
    
    // Profile methods
    @Nullable
    public Profile getProfile() {
        log.debug("PortfolioService: Fetching profile from database");
        Profile profile = profileRepository.findById(1L).orElse(null);
        log.debug("PortfolioService: Profile query result - {}", profile != null ? "Found" : "Not found");
        return profile;
    }
    
    @SuppressWarnings("null")
    public Profile saveProfile(Profile profile) {
        return profileRepository.save(profile);
    }
    
    // Skill methods
    public List<Skill> getAllSkills() {
        log.debug("PortfolioService: Fetching all skills from database");
        List<Skill> skills = skillRepository.findAll();
        log.debug("PortfolioService: Retrieved {} skills", skills.size());
        return skills;
    }

    public List<Skill> getSkillsByCategory(String category) {
        return skillRepository.findByCategory(category);
    }
    
    @SuppressWarnings("null")
    public Skill saveSkill(Skill skill) {
        return skillRepository.save(skill);
    }
    
    // Project methods
    public List<Project> getAllProjects() {
        log.debug("PortfolioService: Fetching all projects from database");
        List<Project> projects = projectRepository.findAll();
        log.debug("PortfolioService: Retrieved {} projects", projects.size());
        return projects;
    }

    public List<Project> getFeaturedProjects() {
        return projectRepository.findByFeaturedTrue();
    }
    
    @SuppressWarnings("null")
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }
    
    // Hobby methods
    public List<Hobby> getAllHobbies() {
        return hobbyRepository.findAll();
    }
    
    @SuppressWarnings("null")
    public Hobby saveHobby(Hobby hobby) {
        return hobbyRepository.save(hobby);
    }
    
    // Experience methods
    public List<Experience> getAllExperiences() {
        log.debug("PortfolioService: Fetching all experiences from database");
        List<Experience> experiences = experienceRepository.findAllOrderByStartDateDesc();
        log.debug("PortfolioService: Retrieved {} experiences", experiences.size());
        return experiences;
    }
    
    @SuppressWarnings("null")
    public Experience saveExperience(Experience experience) {
        return experienceRepository.save(experience);
    }
    
    // Contact methods
    public List<Contact> getAllContacts() {
        return contactRepository.findAllOrderByCreatedAtDesc();
    }
    
    @SuppressWarnings("null")
    public Contact saveContact(Contact contact) {
        return contactRepository.save(contact);
    }
}

