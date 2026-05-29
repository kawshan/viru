package com.virubook.controller;

import com.virubook.dao.PdcStatusDao;
import com.virubook.entity.PdcStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/pdc_status")
public class PdcStatusController {

    @Autowired
    private PdcStatusDao pdcStatusDao;

    @GetMapping(value = "/findall")
    private List<PdcStatus> findAllPdcStatuses(){
        return pdcStatusDao.findAll();
    }

}
