package com.virubook.controller;

import com.virubook.dao.StudentMasterDao;
import com.virubook.entity.StudentMaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/student")
public class StudentController {

    @Autowired
    private StudentMasterDao studentMasterDao;


    @GetMapping(value = "/findall")
    public List<StudentMaster> findAllStudentMaster(){
        return studentMasterDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @GetMapping(value = "/view")
    public ModelAndView studentView(){
        ModelAndView studentUI = new ModelAndView();
        studentUI.setViewName("StudentMaster.html");
        return studentUI;
    }



    @PostMapping
    public String saveStudentMaster(@RequestBody StudentMaster studentMaster){
        try {
            studentMasterDao.save(studentMaster);
            return "ok";
        }catch (Exception e){
            return "Student save failed"+e.getMessage();
        }
    }



    @PutMapping
    public String updateStudentMaster(@RequestBody StudentMaster studentMaster){
        try {
            studentMasterDao.save(studentMaster);
            return "ok";
        }catch (Exception e){
            return "Student update failed"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteStudentMaster(@RequestBody StudentMaster studentMaster){
        try {
            studentMaster.setStudent_master_status(false);
            studentMasterDao.save(studentMaster);
            return "ok";
        }catch (Exception e){
            return "Student delete failed"+e.getMessage();
        }
    }





}
