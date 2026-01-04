package com.believe.portfolio.repository;

import com.believe.portfolio.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    @Query("SELECT e FROM Experience e ORDER BY e.startDate DESC")
    List<Experience> findAllOrderByStartDateDesc();
}

