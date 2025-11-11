package com.virubook.controller;

import com.virubook.dao.StudentMasterDao;
import com.virubook.entity.StudentMaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/student")
public class StudentController {

    @Autowired
    private StudentMasterDao studentMasterDao;


    @GetMapping(value = "/findall")
    public List<StudentMaster> findAllStudentMaster(){
        return studentMasterDao.findAll();
    }



}
