package com.virubook.controller;

import com.virubook.dao.VpsHeaderDao;
import com.virubook.entity.VpsHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/vps")
public class VpsHeaderController {

    @Autowired
    private VpsHeaderDao vpsHeaderDao;

    @GetMapping(value = "/findall")
    public List<VpsHeader> getAllVpsHeaders() {
        return vpsHeaderDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }


    @GetMapping
    public ModelAndView vpsView(){
        ModelAndView vpsUI = new ModelAndView();
        vpsUI.setViewName("vps.html");
        return vpsUI;
    }

    @GetMapping(value = "/getIdFromHeaderKey/{headerKey}")
    public String getIdFromHeaderKey(@PathVariable("headerKey") String headerKey) {
        return vpsHeaderDao.getIdFromHeaderKey(headerKey);
    }

    @PostMapping
    public ResponseEntity<Object> saveVpsHeader(@RequestBody VpsHeader vpsHeader) {
        try {

            String nextHeaderKey = vpsHeaderDao.nextVpsHeaderKey();
            if (nextHeaderKey == null || nextHeaderKey.equals("")) {
                vpsHeader.setVps_header_key("VPS0001");
            }else {
                vpsHeader.setVps_header_key(nextHeaderKey);
            }


            Integer nextVpsNumber = vpsHeaderDao.nextVpsHeaderNumber();
            if (nextVpsNumber == null || nextVpsNumber.equals("")) {
                vpsHeader.setVps_header_number(1001);
            }else {
                vpsHeader.setVps_header_number(nextVpsNumber);
            }
            vpsHeader.setVps_header_saved_date(LocalDate.now());
            VpsHeader savedVpsHeader = vpsHeaderDao.save(vpsHeader);

            return ResponseEntity.ok(savedVpsHeader);


        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping
    public String updateVpsHeader(@RequestBody VpsHeader vpsHeader) {
        try {
            vpsHeaderDao.save(vpsHeader);
            return "ok";
        }catch (Exception e) {
            return "update VpsHeader failed"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteVpsHeader(@RequestBody VpsHeader vpsHeader) {
        try {
            vpsHeaderDao.deleteVpsDetails(vpsHeader.getVps_header_key());
            vpsHeaderDao.delete(vpsHeader);
            return "ok";
        }catch (Exception e) {
            return "delete VpsHeader failed"+e.getMessage();
        }
    }


}
