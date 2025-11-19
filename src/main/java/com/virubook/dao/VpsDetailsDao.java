package com.virubook.dao;

import com.virubook.entity.VpsDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VpsDetailsDao extends JpaRepository<VpsDetails,Integer> {
}
