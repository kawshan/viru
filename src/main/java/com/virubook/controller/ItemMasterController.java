package com.virubook.controller;

import com.virubook.dao.ItemMasterDao;
import com.virubook.dao.ItemMasterStatusDao;
import com.virubook.entity.ItemMaster;
import com.virubook.entity.ItemMasterStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/item-master")
public class ItemMasterController {

    @Autowired
    private ItemMasterDao itemMasterDao;

    @Autowired
    private ItemMasterStatusDao itemMasterStatusDao;


    @GetMapping(value = "/findall")
    public List<ItemMaster> findAllItems(){
        return itemMasterDao.findAll();
    }

    @GetMapping
    public ModelAndView ItemMasterView(){
        ModelAndView itemMasterUI = new ModelAndView();
        itemMasterUI.setViewName("itemMaster.html");
        return itemMasterUI;
    }

    @PostMapping
    public String saveItemMaster(@RequestBody ItemMaster itemMaster){
        try {
            ItemMaster existingItemMaster = itemMasterDao.findByItemName(itemMaster.getItem_name());
            if(existingItemMaster != null){
                return "Item Master Already Exist";
            }

            String maxItemMasterCode =itemMasterDao.findMaxItemMasterCode();
            if(maxItemMasterCode == null || maxItemMasterCode.equals(" ")){
                itemMaster.setItem_code("IM0001");
            }else {
                itemMaster.setItem_code(maxItemMasterCode);
            }


            itemMasterDao.save(itemMaster);
            return "ok";
        }catch (Exception e){
            return "save not complete"+e.getMessage();
        }
    }


    @PutMapping
    public String updateItemMaster(@RequestBody ItemMaster itemMaster){
        try {
            itemMasterDao.save(itemMaster);
            return "ok";
        }catch (Exception e){
            return "update not complete"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteItemMaster(@RequestBody ItemMaster itemMaster){
        try {
            ItemMasterStatus deleteStatus = itemMasterStatusDao.getReferenceById(3);
            itemMaster.setItem_master_status_id(deleteStatus);
            itemMasterDao.save(itemMaster);
            return "ok";
        }catch (Exception e){
            return "delete not complete"+e.getMessage();
        }
    }



}
