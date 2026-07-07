package com.virubook.controller;

import com.virubook.dao.StockReportItemViseDao;
import com.virubook.dto.StockReportItemViseDto;
import com.virubook.service.StockReportItemViseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/stock-report-item-vise")
public class StockReportItemViseController {

    @Autowired
    private StockReportItemViseDao stockReportItemViseDao;

    @Autowired
    private StockReportItemViseService stockReportItemViseService;


    @GetMapping
    public ModelAndView stockReportItemViseView(){
        ModelAndView view = new ModelAndView();
        view.setViewName("stockReportItemVise.html");
        return view;
    }


    @GetMapping(value = "/get-previous-quantity")
    public String getPreviousQuantity(@RequestParam String locationId,@RequestParam String itemId,@RequestParam String fromDate) {
        return stockReportItemViseDao.getPreviousQuantity(locationId, itemId, fromDate);
    }




    @GetMapping(value = "/get-stock-report")
    public List<StockReportItemViseDto> getPreviousQuantity(@RequestParam String locationId, @RequestParam String itemId, @RequestParam String fromDate, @RequestParam String toDate) {
        return stockReportItemViseService.generateStockReport(locationId, itemId, fromDate,toDate);
    }


}
