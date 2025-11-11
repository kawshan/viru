package com.virubook.dao;

import com.virubook.entity.StudentMaster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentMasterDao extends JpaRepository<StudentMaster, Integer> {
}
