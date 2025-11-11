package com.virubook.dao;

import com.virubook.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeDao extends JpaRepository<Grade,Integer> {
}
