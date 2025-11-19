package com.virubook.controller;

import com.virubook.dao.VpsDetailsDao;
import com.virubook.entity.VpsDetails;
import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/vpsDetails")
public class VpsDetailsController {

    @Autowired
    private VpsDetailsDao vpsDetailsDao;

    @GetMapping(value = "/findall")
    public List<VpsDetails> getAllVpsDetails() {
        return vpsDetailsDao.findAll();
    }


}
