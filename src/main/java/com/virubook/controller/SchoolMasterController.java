package com.virubook.controller;

import com.virubook.dao.SchoolMasterDao;
import com.virubook.entity.SchoolMaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/school-master")
public class SchoolMasterController {

    @Autowired
    private SchoolMasterDao schoolMasterDao;

    @GetMapping(value = "/findAll")
    public List<SchoolMaster> getAllSchoolMaster() {
        return schoolMasterDao.findAll();
    }


}
