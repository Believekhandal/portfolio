package com.believe.portfolio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "skill")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(length = 50)
    private String category; // e.g., "Frontend", "Backend", "Database", "Tools"
    
    @Column(length = 200)
    private String iconUrl;
    
    @Column(nullable = false)
    private Integer proficiency; // 1-100
    
    @Column(columnDefinition = "TEXT")
    private String description;
}

