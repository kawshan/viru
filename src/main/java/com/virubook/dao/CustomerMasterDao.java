package com.virubook.dao;

import com.virubook.entity.CustomerMaster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerMasterDao extends JpaRepository<CustomerMaster,Integer> {
}
