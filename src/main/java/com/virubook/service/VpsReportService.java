package com.virubook.service;

import com.virubook.dao.VpsReportDao;
import com.virubook.dto.VpsReportDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VpsReportService {

    @Autowired
    private VpsReportDao vpsReportDao;


    public List<VpsReportDto> generateVpsReport(String fromDate, String toDate) {
        List<Object[]> result = vpsReportDao.getVpsReport(fromDate, toDate);
        return result.stream().map(obj->
                new VpsReportDto(
                        (String) obj[0],
                        (String) obj[1],
                        (Integer) obj[2],
                        (Date) obj[3],
                        (Date) obj[4],
                        (BigDecimal) obj[5],
                        (String) obj[6]
                )
                ).collect(Collectors.toList());

    }




}
