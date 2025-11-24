package com.virubook.controller;

import com.virubook.dao.VpsDetailsDao;
import com.virubook.entity.VpsDetails;
import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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


    @GetMapping(value = "/getByHeaderKey/{headerKey}")
    public List<VpsDetails> getVpsDetailsByHeaderKey(@PathVariable("headerKey") String headerKey) {
        return vpsDetailsDao.findVpsDetailsByHeaderKey(headerKey);
    }


    @PostMapping
    public String addVpsDetails(@RequestBody VpsDetails vpsDetails) {
        try {
            vpsDetailsDao.save(vpsDetails);
            return "ok";
        }catch (Exception e) {
            return "Save VpsDetails failed"+e.getMessage();
        }
    }


    @PutMapping
    public String updateVpsDetails(@RequestBody VpsDetails vpsDetails) {
        try {
            vpsDetailsDao.save(vpsDetails);
            return "ok";
        }catch (Exception e) {
            return "Update VpsDetails failed"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteVpsDetails(@RequestBody VpsDetails vpsDetails) {
        try {
            vpsDetailsDao.delete(vpsDetails);
            return "ok";
        }catch (Exception e) {
            return "Delete VpsDetails failed"+e.getMessage();
        }
    }
}
