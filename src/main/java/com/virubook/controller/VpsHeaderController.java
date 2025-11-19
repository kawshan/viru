package com.virubook.controller;

import com.virubook.dao.VpsHeaderDao;
import com.virubook.entity.VpsHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/vps")
public class VpsHeaderController {

    @Autowired
    private VpsHeaderDao vpsHeaderDao;

    @GetMapping(value = "/findall")
    public List<VpsHeader> getAllVpsHeaders() {
        return vpsHeaderDao.findAll();
    }


    @GetMapping
    public ModelAndView vpsView(){
        ModelAndView vpsUI = new ModelAndView();
        vpsUI.setViewName("vps.html");
        return vpsUI;
    }


    //need to write post put delete mappings


}
