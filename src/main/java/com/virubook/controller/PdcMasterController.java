package com.virubook.controller;

import com.virubook.dao.PdcMasterDao;
import com.virubook.dao.PdcStatusDao;
import com.virubook.entity.PdcMaster;
import com.virubook.entity.PdcStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/pdc_master")
public class PdcMasterController {

    @Autowired
    private PdcMasterDao pdcMasterDao;

    @Autowired
    private PdcStatusDao pdcStatusDao;


    @GetMapping
    public ModelAndView PdcMasterView(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("pdcmaster.html");
        return modelAndView;
    }


    @GetMapping(value = "/findall")
    public List<PdcMaster> getAllPdcMaster() {
        return pdcMasterDao.findAll();
    }


    @PostMapping
    public String savePdcMaster(@RequestBody PdcMaster pdcMaster) {
        try {

            PdcMaster existingPdc = pdcMasterDao.getByChequeNo(pdcMaster.getPdc_master_cheque_no());
            if (existingPdc != null){
                return "PDC Cheque no "+existingPdc.getPdc_master_cheque_no()+" already exists";
            }


            pdcMasterDao.save(pdcMaster);
            return "ok";
        }catch (Exception e) {
            return "save pdc master failed"+e.getMessage();
        }
    }


    @PutMapping
    public String updatePdcMaster(@RequestBody PdcMaster pdcMaster) {
        try {
            pdcMasterDao.save(pdcMaster);
            return "ok";
        }catch (Exception e) {
            return "update pdc master failed"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deletePdcMaster(@RequestBody PdcMaster pdcMaster) {
        try {
            PdcStatus deletedStatus = pdcStatusDao.getReferenceById(2);
            pdcMaster.setPdc_status_id(deletedStatus);
            pdcMasterDao.save(pdcMaster);
            return "ok";
        }catch (Exception e){
            return "delete pdc master failed"+e.getMessage();
        }
    }


}
