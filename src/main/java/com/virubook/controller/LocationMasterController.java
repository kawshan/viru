package com.virubook.controller;

import com.virubook.dao.LocationMasterDao;
import com.virubook.entity.LocationMaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/location-master")
public class LocationMasterController {

    @Autowired
    private LocationMasterDao locationMasterDao;


    @GetMapping
    public ModelAndView locationMasterUI (){
        ModelAndView locationMasterView = new ModelAndView();
        locationMasterView.setViewName("locationMaster.html");
        return locationMasterView;
    }


    @GetMapping(value = "/findall")
    public List<LocationMaster> findAll() {
        return locationMasterDao.findAll();
    }



    @PostMapping
    public String saveLocationMaster(@RequestBody LocationMaster locationMaster) {
        try {

            String maxLocationKey = locationMasterDao.getMaxLocationKey();
            if (maxLocationKey == null || maxLocationKey.equals("")) {
                locationMaster.setLocation_master_key("L0001");
            }else {
                locationMaster.setLocation_master_key(maxLocationKey);
            }




            locationMasterDao.save(locationMaster);
            return "ok";
        }catch (Exception e) {
            return "save location master failed" + e.getMessage();
        }
    }


    @PutMapping
    public String updateLocationMaster(@RequestBody LocationMaster locationMaster) {
        try {
            locationMasterDao.save(locationMaster);
            return "ok";
        }catch (Exception e) {
            return "update location master failed" + e.getMessage();
        }
    }



    @DeleteMapping
    public String deleteLocationMaster(@RequestBody LocationMaster locationMaster) {
        try {
            locationMaster.setLocation_master_status(false);
            locationMasterDao.save(locationMaster);
            return "ok";
        }catch (Exception e) {
            return "delete location master failed" + e.getMessage();
        }
    }





}
