package com.virubook.dao;

import com.virubook.entity.PdcStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PdcStatusDao extends JpaRepository<PdcStatus,Integer> {
}
