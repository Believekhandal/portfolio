package com.believe.portfolio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "project")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(length = 500)
    private String imageUrl;
    
    @Column(length = 500)
    private String githubUrl;
    
    @Column(length = 500)
    private String liveUrl;
    
    @Column(length = 500)
    private String technologies; // Comma-separated or JSON
    
    @Column(name = "created_at")
    private LocalDate createdAt;
    
    @Column(name = "featured")
    private Boolean featured = false;
}