package com.virubook.dao;

import com.virubook.entity.VpsHeader;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VpsHeaderDao extends JpaRepository<VpsHeader, Integer> {
}
